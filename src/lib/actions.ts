"use server";
import connectToDatabase from "./db";
import { Content } from "@/models/Content";
import { Enquiry } from "@/models/Enquiry";
import { revalidatePath } from "next/cache";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import crypto from "crypto";
import { sendPasswordResetEmail, sendEnquiryNotificationEmail } from "./mail";

// ... existing code ...

// ... existing code ...

/**
 * Request Password Reset Token
 */
export async function requestPasswordReset(email: string) {
  const normalizedEmail = email.toLowerCase().trim();
  try {
    await connectToDatabase();
    const user = await User.findOne({ email: normalizedEmail });
    
    if (!user) {
      return { success: true, message: "If an account exists, a reset link has been generated." };
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send Real Email via Resend
    const mailResponse = await sendPasswordResetEmail(normalizedEmail, token);
    
    // Fallback console logging for development/trace
    console.log("-----------------------------------------");
    console.log("PASSWORD RESET TRANSMITTED");
    console.log("EMAIL:", normalizedEmail);
    console.log("URL:", `http://localhost:3000/reset-password?token=${token}`);
    console.log("MAIL ID:", mailResponse.id || "N/A");
    console.log("-----------------------------------------");

    if (!mailResponse.success) {
      // Still return success to user for UI consistency, but log the error
      console.warn("[MAIL SEND FAILURE]:", mailResponse.error);
    }

    return { success: true, message: "Security key reset instructions have been dispatched to your identity." };
  } catch (error: any) {
    console.error('[RESET REQUEST ERROR]:', error);
    
    // --- EMERGENCY ADMIN FALLBACK ---
    if (normalizedEmail === "admin@sbkheights.com") {
      console.log("-----------------------------------------");
      console.log("EMERGENCY ADMIN RESET TRIGGERED (DB DOWN)");
      console.log("EMAIL:", normalizedEmail);
      console.log("NOTE: Use the hardcoded reset flow if needed.");
      console.log("-----------------------------------------");
      return { success: true, message: "Administrative emergency reset triggered. Please contact system owner." };
    }
    // --------------------------------

    return { success: false, error: "System busy. Please try again later." };
  }
}

/**
 * Reset Password with Token
 */
export async function resetPasswordWithToken(token: string, newPassword: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return { success: false, error: "Invalid or expired reset token." };
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { success: true };
  } catch (error: any) {
    console.error('[RESET EXECUTION ERROR]:', error);
    return { success: false, error: "Failed to reset security key. Database connection error." };
  }
}

/**
 * Universal Content Syncing for CMS Modules
 */
export async function updateCMSContent(page: string, section: string, data: any) {
  try {
    await connectToDatabase();
    await Content.findOneAndUpdate(
      { page, section },
      { content: data },
      { upsert: true, new: true }
    );
    
    // Revalidate relevant routes
    revalidatePath(`/admin/cms/${page}`);
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/mission-vision");
    revalidatePath("/gallery");
    revalidatePath("/project");
    revalidatePath("/contact");
    
    return { success: true };
  } catch (error: any) {
    console.error(`[CMS ERROR] ${page}/${section}:`, error);
    return { success: false, error: error.message || "Failed to persist content." };
  }
}

/**
 * Fetch CMS Content from MongoDB
 */
export async function getCMSContent(page: string, section: string) {
  try {
    await connectToDatabase();
    const item = await Content.findOne({ page, section });
    return item ? JSON.parse(JSON.stringify(item.content)) : null;
  } catch (error) {
    return null;
  }
}

/**
 * Lead Management / Enquiry Submission
 */
export async function submitEnquiry(formData: { name: string; phone: string; email?: string; message?: string }) {
  try {
    await connectToDatabase();
    await Enquiry.create(formData);
    
    // Fetch Governance Email for notification
    const legalData = await getCMSContent("legal", "all");
    const adminEmail = legalData?.governance?.email || "shreebk.infratech@gmail.com";
    
    // Send Notification Email
    await sendEnquiryNotificationEmail(adminEmail, {
      name: formData.name,
      email: formData.email || "",
      phone: formData.phone,
      message: formData.message || ""
    });

    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error: any) {
    console.error('[ENQUIRY ERROR]:', error);
    return { success: false, error: error.message || "Failed to submit enquiry." };
  }
}

export async function deleteEnquiry(id: string) {
  try {
    await connectToDatabase();
    await Enquiry.findByIdAndDelete(id);
    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateEnquiry(id: string, data: any) {
  try {
    await connectToDatabase();
    await Enquiry.findByIdAndUpdate(id, data);
    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function addEnquiry(data: any) {
  try {
    await connectToDatabase();
    await Enquiry.create(data);
    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getEnquiries() {
  try {
    await connectToDatabase();
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(enquiries));
  } catch (error) {
    return [];
  }
}

/**
 * Administrative Account Security
 */
export async function updateAdminPassword(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { success: false, error: "All fields are required." };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: "New passwords do not match." };
    }

    await connectToDatabase();
    
    // Find absolute user 
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return { success: false, error: "User record not found in database." };
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return { success: false, error: "Incorrect current password." };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return { success: true };
  } catch (error: any) {
    console.error('[AUTH ERROR]:', error);
    
    // Provide a more helpful error if it's a DNS/SRV issue
    if (error.message.includes("querySrv") || error.message.includes("ECONNREFUSED")) {
      return { 
        success: false, 
        error: "Database Connectivity Error. Your network might be blocking MongoDB SRV lookups. Try using a Standard Connection String in .env.local or check your DNS settings." 
      };
    }

    return { success: false, error: error.message || "Failed to update password." };
  }
}
