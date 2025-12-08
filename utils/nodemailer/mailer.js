const transporter = require("./transporter");
const supportmail = process.env.SERVER_SUPPORT_MAIL;
const clientDomain = process.env.CLIENT_DOMAIN;
// const dotenv = require("dotenv");
// dotenv.config()

const sendWaitlistMail = async (user, userName) => {
  const displayName = userName || "there";
  const mailOptions = {
    from: `Flow Unit Team <${supportmail}>`,
    to: user.email,
    subject: "You’re on the Flow Unit Waitlist — Thank you!",
    replyTo: supportmail,
    html: `
      <!doctype html>
      <html>
      <body style="margin:0;padding:0;min-width:100%;background-color:#0B1221;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#E6EEF8;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0B1221;">
          <tr>
            <td align="center" style="padding:40px 20px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#081428;border-radius:10px;overflow:hidden;box-shadow:0 6px 28px rgba(2,18,44,0.6);">
                
                <!-- Gradient Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #003366 0%, #0057b8 100%); padding:48px 40px; text-align:center;">
                    <img src="https://placehold.co/200x60/ffffff/003366?text=Flow+Unit" alt="Flow Unit Logo" style="max-width:200px;height:auto;display:block;border:0;margin:0 auto 8px auto;" />
                  </td>
                </tr>

                <!-- Hero / Banner -->
                <tr>
                  <td style="padding:0;">
                    <img src="https://placehold.co/600x220/01203a/ffffff?text=You%27re+on+the+Waitlist" alt="Waitlist Banner" style="width:100%;height:auto;display:block;border:0;" />
                  </td>
                </tr>

                <!-- Main content -->
                <tr>
                  <td style="padding:40px 50px 30px 50px;background-color:#071125;">
                    <h1 style="font-size:24px;font-weight:700;color:#ffffff;margin:0 0 14px 0;line-height:1.2;">Welcome, ${displayName} — You’re on the Flow Unit Waitlist 🔒</h1>
                    <p style="font-size:15px;color:#c9d6e8;margin:0 0 20px 0;line-height:1.6;">
                      Thank you for joining our exclusive early access list. We’ve saved your spot and will notify you with next steps and early access details when we’re ready to onboard new users.
                    </p>

                    <!-- What to expect -->
                    <h2 style="font-size:18px;color:#dbeefc;margin:28px 0 12px 0;font-weight:700;">What to Expect Next</h2>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                      <tr>
                        <td style="font-size:14px;color:#b9cfeb;line-height:1.6;padding-right:12px;vertical-align:top;width:30px;">1.</td>
                        <td style="font-size:14px;color:#b9cfeb;line-height:1.6;">We’ll send a heads-up email when early access opens — you'll get an invite link and instructions.</td>
                      </tr>
                      <tr>
                        <td style="font-size:14px;color:#b9cfeb;line-height:1.6;padding-top:12px;vertical-align:top;width:30px;">2.</td>
                        <td style="font-size:14px;color:#b9cfeb;line-height:1.6;padding-top:12px;">Occasional updates about features, previews, and early-user perks.</td>
                      </tr>
                      <tr>
                        <td style="font-size:14px;color:#b9cfeb;line-height:1.6;padding-top:12px;vertical-align:top;width:30px;">3.</td>
                        <td style="font-size:14px;color:#b9cfeb;line-height:1.6;padding-top:12px;">If invited early, you may receive a short onboarding request or feedback form.</td>
                      </tr>
                    </table>

                    <!-- Optional short note -->
                    <p style="font-size:14px;color:#98b8d6;margin:0 0 22px 0;line-height:1.6;">
                      If you have questions, reply to this email or contact our support at <a href="mailto:${supportmail}" style="color:#ffffff;text-decoration:underline;">${supportmail}</a>.
                    </p>

                    <!-- Small CTA-like (subtle) - optional, we keep it inactive per your request -->
                    <div style="text-align:center;margin:0 0 18px 0;">
                      <span style="display:inline-block;padding:10px 18px;border-radius:6px;background:transparent;border:1px solid rgba(255,255,255,0.06);color:#cfe9ff;font-weight:600;font-size:14px;">You’re on the list — we’ll be in touch</span>
                    </div>

                    <p style="font-size:15px;color:#c9d6e8;margin:0 0 6px 0;">
                      Warm regards,
                    </p>
                    <p style="font-size:15px;color:#c9d6e8;margin:0 0 0 0;font-weight:700;">
                      The Flow Unit Team
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:0 50px;">
                    <div style="height:1px;background:rgba(255,255,255,0.04);margin:0;"></div>
                  </td>
                </tr>

                <!-- Footer with socials -->
                <tr>
                  <td align="center" style="padding:28px 50px 36px 50px;background-color:#071125;">
                    <p style="margin:0 0 12px 0;font-size:13px;color:#9fb9de;font-weight:600;">Flow Unit Co.</p>
                    <p style="margin:0 0 14px 0;font-size:12px;color:#7f9fc6;">Task management made simple and effective</p>

                    <p style="margin:0 0 14px 0;">
                      <a href="https://instagram.com/zenithdevtech" style="text-decoration:none;margin:0 6px;font-size:13px;color:#cfe9ff;">Instagram</a> |
                      <a href="https://x.com/zenithdevtech" style="text-decoration:none;margin:0 6px;font-size:13px;color:#cfe9ff;">X</a> |
                      <a href="https://linkedin.com/in/bamitale-abdulazeem-i-214026333/" style="text-decoration:none;margin:0 6px;font-size:13px;color:#cfe9ff;">LinkedIn</a>
                    </p>

                    <p style="margin:0;font-size:11px;color:#6e8fb3;">&copy; ${new Date().getFullYear()} Flow Unit. All rights reserved.</p>
                    <p style="margin:6px 0 0 0;font-size:11px;color:#6e8fb3;">
                      <a href="mailto:${supportmail}" style="color:#cfe9ff;text-decoration:none;">${supportmail}</a> |
                      <a href="${clientDomain}" style="color:#cfe9ff;text-decoration:none;">${clientDomain.replace(
      /^https?:\/\//,
      ""
    )}</a> |
                      <a href="${clientDomain}/privacy" style="color:#cfe9ff;text-decoration:none;">Privacy Policy</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Waitlist mail sent:", info.messageId);
  return info;
};
module.exports = {
  sendWaitlistMail,
};
