import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  try {
    const mailOptions = {
      from: `"SBK Heights Administrative" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Security: Access Consolidation Key',
      html: `
        <div style="font-family: 'Inter', sans-serif; background-color: #f8f9fa; padding: 40px; color: #1a1a1a;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e9ecef; padding: 60px;">
            <div style="margin-bottom: 40px; text-align: center;">
              <h1 style="font-size: 32px; font-weight: 800; letter-spacing: -0.05em; margin: 0; color: #000000;">SBK <span style="font-weight: 300; color: #666;">HEIGHTS</span></h1>
              <p style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5em; margin: 10px 0 0; color: #999;">System Administration</p>
            </div>
            
            <div style="border-left: 3px solid #000000; padding-left: 20px; margin-bottom: 40px;">
              <h2 style="font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0;">Access Recovery Request</h2>
              <p style="font-size: 14px; color: #666; margin-top: 10px;">A security key reset has been initiated for your account.</p>
            </div>

            <p style="font-size: 15px; line-height: 1.6; margin-bottom: 40px;">
              To redefine your administrative credentials, please follow the secure link below. This key will expire in 60 minutes.
            </p>

            <div style="text-align: center; margin-bottom: 40px;">
              <a href="${resetLink}" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 18px 36px; text-decoration: none; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em;">
                Redefine Security Key
              </a>
            </div>

            <div style="padding-top: 40px; border-top: 1px solid #eeeeee;">
              <p style="font-size: 11px; color: #999; line-height: 1.6;">
                If you did not initiate this request, please disregard this transmission. Unauthorized access attempts are monitored and logged.
              </p>
              <p style="font-size: 10px; font-weight: 700; color: #ccc; margin-top: 20px; text-transform: uppercase; letter-spacing: 0.1em;">
                SBK Heights • Virtual Console v2.0
              </p>
            </div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, id: info.messageId };
  } catch (err: any) {
    console.error("[MAIL EXCEPTION]:", err);
    return { success: false, error: err.message };
  }
}

export async function sendEnquiryNotificationEmail(adminEmail: string, enquiry: { name: string; email: string; phone: string; message: string }) {
  try {
    const mailOptions = {
      from: `"SBK Heights Lead Alert" <${process.env.GMAIL_USER}>`,
      to: adminEmail,
      subject: `New Lead: ${enquiry.name}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; background-color: #f8f9fa; padding: 40px; color: #1a1a1a;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e9ecef; padding: 60px;">
            <div style="margin-bottom: 40px; text-align: center;">
              <h1 style="font-size: 32px; font-weight: 800; letter-spacing: -0.05em; margin: 0; color: #000000;">SBK <span style="font-weight: 300; color: #666;">HEIGHTS</span></h1>
              <p style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5em; margin: 10px 0 0; color: #999;">Lead Notification System</p>
            </div>
            
            <div style="border-left: 3px solid #000000; padding-left: 20px; margin-bottom: 40px;">
              <h2 style="font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0;">New Communication Logged</h2>
              <p style="font-size: 14px; color: #666; margin-top: 10px;">A new enquiry has been gathered from the platform.</p>
            </div>

            <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 40px;">
               <div style="margin-bottom: 20px;">
                  <p style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #999; margin: 0 0 5px 0;">Prospect Name</p>
                  <p style="font-size: 16px; font-weight: 700; color: #000; margin: 0;">${enquiry.name}</p>
               </div>
               <div style="margin-bottom: 20px;">
                  <p style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #999; margin: 0 0 5px 0;">Digital Identity</p>
                  <p style="font-size: 14px; color: #000; margin: 0;">${enquiry.email || 'NOT PROVIDED'}</p>
               </div>
               <div style="margin-bottom: 20px;">
                  <p style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #999; margin: 0 0 5px 0;">Communication Channel</p>
                  <p style="font-size: 14px; font-weight: 700; color: #000; margin: 0;">${enquiry.phone}</p>
               </div>
               <div>
                  <p style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #999; margin: 0 0 5px 0;">Message Context</p>
                  <p style="font-size: 14px; color: #444; line-height: 1.6; font-style: italic; margin: 0;">"${enquiry.message || 'No message provided.'}"</p>
               </div>
            </div>

            <div style="text-align: center; margin-bottom: 40px;">
              <a href="${process.env.NEXTAUTH_URL}/admin/enquiries" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 18px 36px; text-decoration: none; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em;">
                Manage in Console
              </a>
            </div>

            <div style="padding-top: 40px; border-top: 1px solid #eeeeee;">
              <p style="font-size: 11px; color: #999; line-height: 1.6;">
                This is an automated synchronization alert. Please do not reply directly to this transmission.
              </p>
            </div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, id: info.messageId };
  } catch (err: any) {
    console.error("[ENQUIRY MAIL EXCEPTION]:", err);
    return { success: false, error: err.message };
  }
}

