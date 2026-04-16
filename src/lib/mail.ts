import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'SBK Heights <onboarding@resend.dev>', // Update this after domain verification
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
              <a href="${resetLink}" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 18px 36px; text-decoration: none; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; transition: background-color 0.3s ease;">
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
    });

    if (error) {
      console.error("[MAIL ERROR]:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error("[MAIL EXCEPTION]:", err);
    return { success: false, error: err.message };
  }
}
