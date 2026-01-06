const transporter = require("./transporter");
const supportmail = process.env.SERVER_SUPPORT_MAIL;
const clientDomain = process.env.CLIENT_DOMAIN;
// const dotenv = require("dotenv");
// dotenv.config()

const sendWelcomeMail = async (user, userName, otp) => {
  const mailOptions = {
    from: `Flow Unit Team <${supportmail}>`,
    to: user.email,
    subject: "Welcome to Flow Unit - Let's Get Started!",
    replyTo: supportmail,
    html: `
        <body style="margin: 0; padding: 0; min-width: 100%; background-color: #f0f4f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f4f8; border-collapse: collapse;">
                <tr>
                    <td align="center" style="padding: 40px 20px;">
                        <table width="600" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 51, 102, 0.08); border-collapse: collapse; overflow: hidden;">
                            
                            <tr>
                                <td style="background: linear-gradient(135deg, #003366 0%, #004c99 100%); padding: 50px 40px;">
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                        <tr>
                                            <td align="center">
                                                <img src="https://placehold.co/200x60/ffffff/003366?text=Flow+Unit" alt="Flow Unit Logo" style="max-width: 200px; height: auto; display: block; border: 0;" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <tr>
                                <td style="padding: 0;">
                                    <img src="https://placehold.co/600x250/e6f3ff/003366?text=Welcome+Aboard" alt="Welcome Banner" style="width: 100%; height: auto; display: block; border: 0;" />
                                </td>
                            </tr>
                            
                            <!-- Main Content -->
                            <tr>
                                <td style="padding: 45px 50px 40px 50px;">
                                    <h1 style="font-size: 28px; font-weight: 700; color: #003366; margin: 0 0 15px 0; line-height: 1.3;">Welcome to Flow Unit, ${
                                      userName || "there"
                                    }! 🎉</h1>
                                    
                                    <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin: 0 0 25px 0;">
                                        We're thrilled to have you join our community of productive professionals. Flow Unit is designed to help you manage tasks effortlessly and stay organized with powerful to-do lists that adapt to your workflow.
                                    </p>
                                    
                                    <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin: 0 0 35px 0;">
                                        Your account is now active and ready to transform the way you work. Let's get you started!
                                    </p>
                                    
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 40px 0;">
                                        <tr>
                                            <td align="center">
                                                <a href="${
                                                  clientDomain ||
                                                  "https://www.flowunit.vercel.app/"
                                                }dashboard" style="display: inline-block; background-color: #003366; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 6px; font-weight: 600; font-size: 16px; letter-spacing: 0.3px;">Get Started Now</a>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <h2 style="font-size: 20px; font-weight: 600; color: #003366; margin: 0 0 25px 0; text-align: center;">What You Can Do with Flow Unit</h2>
                                    
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
                                        <tr>
                                            <td width="80" valign="top" style="padding-right: 20px;">
                                                <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #87CEEB 0%, #4a90e2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                                    <img src="https://placehold.co/40x40/ffffff/ffffff?text=📋" alt="Task Management" style="width: 40px; height: 40px; display: block; border: 0;" />
                                                </div>
                                            </td>
                                            <td valign="top">
                                                <h3 style="font-size: 17px; font-weight: 600; color: #003366; margin: 0 0 8px 0;">Smart Task Management</h3>
                                                <p style="font-size: 14px; line-height: 1.6; color: #718096; margin: 0;">Create, organize, and prioritize tasks with ease. Set deadlines, add notes, and track progress all in one place.</p>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
                                        <tr>
                                            <td width="80" valign="top" style="padding-right: 20px;">
                                                <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #87CEEB 0%, #4a90e2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                                    <img src="https://placehold.co/40x40/ffffff/ffffff?text=✓" alt="To-Do Lists" style="width: 40px; height: 40px; display: block; border: 0;" />
                                                </div>
                                            </td>
                                            <td valign="top">
                                                <h3 style="font-size: 17px; font-weight: 600; color: #003366; margin: 0 0 8px 0;">Flexible To-Do Lists</h3>
                                                <p style="font-size: 14px; line-height: 1.6; color: #718096; margin: 0;">Build custom lists for projects, daily routines, or team goals. Check off items and celebrate your wins.</p>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 35px 0;">
                                        <tr>
                                            <td width="80" valign="top" style="padding-right: 20px;">
                                                <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #87CEEB 0%, #4a90e2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                                    <img src="https://placehold.co/40x40/ffffff/ffffff?text=👥" alt="Team Collaboration" style="width: 40px; height: 40px; display: block; border: 0;" />
                                                </div>
                                            </td>
                                            <td valign="top">
                                                <h3 style="font-size: 17px; font-weight: 600; color: #003366; margin: 0 0 8px 0;">Team Collaboration</h3>
                                                <p style="font-size: 14px; line-height: 1.6; color: #718096; margin: 0;">Share tasks, assign responsibilities, and collaborate seamlessly with your team members.</p>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fbfd; border: 1px solid #e6f3ff; border-radius: 6px; padding: 25px; margin: 0 0 35px 0;">
                                        <tr>
                                            <td>
                                                <h3 style="font-size: 18px; font-weight: 600; color: #003366; margin: 0 0 15px 0;">Quick Start Guide</h3>
                                                <ol style="font-size: 14px; line-height: 1.8; color: #4a5568; margin: 0; padding-left: 20px;">
                                                    <li style="margin-bottom: 8px;">Verify your account with the OTP sent to you</li>
                                                    <li style="margin-bottom: 8px;">Log in to your dashboard using your credentials</li>
                                                    <li style="margin-bottom: 8px;">Create your first project</li>
                                                    <li style="margin-bottom: 8px;">Add tasks and set priorities</li>
                                                    <li style="margin-bottom: 0;">Create your team, invite team members to collaborate</li>
                                                </ol>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #e6f3ff; border-left: 4px solid #87CEEB; padding: 20px 25px; border-radius: 4px; margin: 0 0 30px 0;">
                                        <tr>
                                            <td>
                                                <p style="font-size: 14px; line-height: 1.6; color: #003366; margin: 0;">
                                                    <strong style="display: block; margin-bottom: 6px;">Need Help?</strong>
                                                    Our support team is here to assist you 24/7. Check out our <a href="${
                                                      clientDomain ||
                                                      "https://www.flowunit.vercel.app"
                                                    }/help" style="color: #003366; text-decoration: underline; font-weight: 600;">Help Center</a> or reach out to us anytime at <a href="mailto:${
      supportmail || "youngbeeh08@gmail.com"
    }" style="color: #003366; text-decoration: underline;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 10px 0;">
                                        Here's to a more productive you!
                                    </p>
                                    <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0;">
                                        <strong style="color: #003366;">The Flow Unit Team</strong>
                                    </p>
                                </td>
                            </tr>
                            
                            <tr>
                                <td style="padding: 0 50px;">
                                    <div style="height: 1px; background-color: #e2e8f0;"></div>
                                </td>
                            </tr>
                            
                            <tr>
                                <td align="center" style="padding: 30px 50px;">
                                    <p style="font-size: 13px; line-height: 1.6; color: #003366; margin: 0 0 8px 0; font-weight: 600;">
                                        Flow Unit Co.
                                    </p>
                                    <p style="font-size: 12px; line-height: 1.6; color: #718096; margin: 0 0 15px 0;">
                                        Task management made simple and effective
                                    </p>
                                    <p style="font-size: 11px; line-height: 1.5; color: #a0aec0; margin: 0;">
                                        &copy; 2025 Flow Unit. All rights reserved.<br>
                                        <a href="mailto:${
                                          supportmail || "youngbeeh08@gmail.com"
                                        }" style="color: #003366; text-decoration: none;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a> | 
                                        <a href="${
                                          clientDomain ||
                                          "https://www.flowunit.vercel.app"
                                        }" style="color: #003366; text-decoration: none;">www.flowunit.vercel.app</a> | 
                                        <a href="${
                                          clientDomain ||
                                          "https://www.flowunit.vercel.app"
                                        }/privacy" style="color: #003366; text-decoration: none;">Privacy Policy</a>
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
  const mail = await transporter.sendMail(mailOptions);
  console.log("Welcome mail sent successfully:", mail.messageId);
};

const sendOtpMail = async (user, userName, otp) => {
  const mailOptions = {
    from: `FlowUnit Team <${supportmail}>`,
    to: user.email,
    subject: "Flow Unit OTP",
    replyTo: supportmail,
    html: `
        <body style="margin: 0; padding: 0; min-width: 100%; background-color: #f0f4f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f4f8; border-collapse: collapse; min-height: 100vh;">
                <tr>
                    <td align="center" style="padding: 50px 20px;">
                        <table width="600" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 51, 102, 0.08); border-collapse: collapse; overflow: hidden;">
                            
                            <tr>
                                <td style="background: linear-gradient(135deg, #003366 0%, #004c99 100%); padding: 50px 40px;">
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                        <tr>
                                            <td align="center">
                                                <!-- Logo placeholder - Replace src with your actual logo -->
                                                <img src="https://placehold.co/200x60/ffffff/003366?text=Your+Logo" alt="Company Logo" style="max-width: 200px; height: auto; display: block; border: 0;" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <tr>
                                <td style="padding: 45px 50px;">
                                    <h1 style="font-size: 24px; font-weight: 600; color: #003366; margin: 0 0 10px 0; line-height: 1.3;">Account Verification Required</h1>
                                    
                                    <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 30px 0;">
                                        Dear ${userName || "User"},<br><br>
                                        To ensure the verification of your account, please use the verification code below. This code is valid for 5 minutes.
                                    </p>
                                    
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                                        <tr>
                                            <td align="center">
                                                <table cellspacing="0" cellpadding="0" border="0" style="border: 2px solid #003366; border-radius: 6px; background-color: #f8fbfd;">
                                                    <tr>
                                                        <td style="padding: 25px 40px;">
                                                            <p style="font-size: 12px; color: #003366; margin: 0 0 12px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Verification Code</p>
                                                            <div style="font-size: 38px; font-weight: 700; color: #003366; letter-spacing: 10px; font-family: 'Courier New', monospace; line-height: 1;">${otp}</div>
                                                            <p style="font-size: 12px; color: #5a6c7d; margin: 12px 0 0 0;">Valid for 5 minutes</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                                        <tr>
                                            <td style="background-color: #e6f3ff; border-left: 4px solid #87CEEB; padding: 20px 25px; border-radius: 4px;">
                                                <p style="font-size: 14px; line-height: 1.6; color: #003366; margin: 0;">
                                                    <strong style="display: block; margin-bottom: 6px;">Important Security Notice</strong>
                                                    This code is confidential and should never be shared with anyone. If you did not initiate this request, please contact our security team immediately at <a href="mailto:${
                                                      supportmail ||
                                                      "youngbeeh08@gmail.com"
                                                    }" style="color: #003366; text-decoration: underline;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <tr>
                                <td style="padding: 0 50px;">
                                    <div style="height: 1px; background-color: #e2e8f0;"></div>
                                </td>
                            </tr>
                            
                             <tr>
                                <td align="center" style="padding: 30px 50px;">
                                    <p style="font-size: 13px; line-height: 1.6; color: #003366; margin: 0 0 8px 0; font-weight: 600;">
                                        Flow Unit Co.
                                    </p>
                                    <p style="font-size: 12px; line-height: 1.6; color: #718096; margin: 0 0 15px 0;">
                                        Task management made simple and effective
                                    </p>
                                    <p style="font-size: 11px; line-height: 1.5; color: #a0aec0; margin: 0;">
                                        &copy; 2025 Flow Unit. All rights reserved.<br>
                                        <a href="mailto:${
                                          supportmail || "youngbeeh08@gmail.com"
                                        }" style="color: #003366; text-decoration: none;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a> | 
                                        <a href="${
                                          clientDomain ||
                                          "https://www.flowunit.vercel.app"
                                        }" style="color: #003366; text-decoration: none;">www.flowunit.vercel.app</a> | 
                                        <a href="${
                                          clientDomain ||
                                          "https://www.flowunit.vercel.app"
                                        }/privacy" style="color: #003366; text-decoration: none;">Privacy Policy</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    `,
  };
  const mail = await transporter.sendMail(mailOptions);
  console.log("OTP Verification mail sent successfully:", mail.messageId);
};

const sendPasswordResetMail = async (user, userName, otp) => {
  const mailOptions = {
    from: `FlowUnit Team <${supportmail}>`,
    to: user.email,
    subject: "Password Reset Request",
    replyTo: supportmail,
    html: `
    <body style="margin: 0; padding: 0; min-width: 100%; background-color: #f0f4f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f4f8; border-collapse: collapse; min-height: 100vh;">
        <tr>
        <td align="center" style="padding: 50px 20px;">
            <table width="600" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 51, 102, 0.08); border-collapse: collapse; overflow: hidden;">
            
            <!-- HEADER -->
            <tr>
                <td style="background: linear-gradient(135deg, #003366 0%, #004c99 100%); padding: 50px 40px;">
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                    <td align="center">
                        <img src="https://placehold.co/200x60/ffffff/003366?text=Flow+Unit" alt="Flow Unit Logo" style="max-width: 200px; height: auto; display: block; border: 0;" />
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            
            <!-- BODY -->
            <tr>
                <td style="padding: 45px 50px;">
                <h1 style="font-size: 24px; font-weight: 600; color: #003366; margin: 0 0 10px 0; line-height: 1.3;">Password Reset Request</h1>
                
                <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 30px 0;">
                    Dear ${userName || "User"},<br><br>
                    We received a request to reset your password. Please use the reset code below to create a new password. 
                    This code is valid for <strong>5 minutes</strong>.
                </p>
                
                <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                    <tr>
                    <td align="center">
                        <table cellspacing="0" cellpadding="0" border="0" style="border: 2px solid #003366; border-radius: 6px; background-color: #f8fbfd;">
                        <tr>
                            <td style="padding: 25px 40px;">
                            <p style="font-size: 12px; color: #003366; margin: 0 0 12px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Reset Code</p>
                            <div style="font-size: 38px; font-weight: 700; color: #003366; letter-spacing: 10px; font-family: 'Courier New', monospace; line-height: 1;">${otp}</div>
                            <p style="font-size: 12px; color: #5a6c7d; margin: 12px 0 0 0;">Valid for 5 minutes</p>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>

                <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 30px 0;">
                    If you didn’t request a password reset, please ignore this email or contact our support team immediately.
                </p>

                <!-- SECURITY NOTICE -->
                <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                    <tr>
                    <td style="background-color: #e6f3ff; border-left: 4px solid #87CEEB; padding: 20px 25px; border-radius: 4px;">
                        <p style="font-size: 14px; line-height: 1.6; color: #003366; margin: 0;">
                        <strong style="display: block; margin-bottom: 6px;">Important Security Notice</strong>
                        Do not share this code with anyone. Our support will never ask for it. If you did not initiate this request, please contact us at 
                        <a href="mailto:${
                          supportmail || "youngbeeh08@gmail.com"
                        }" style="color: #003366; text-decoration: underline;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a>.
                        </p>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>

            <!-- FOOTER -->
            <tr>
                <td style="padding: 0 50px;">
                <div style="height: 1px; background-color: #e2e8f0;"></div>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding: 30px 50px;">
                <p style="font-size: 13px; line-height: 1.6; color: #003366; margin: 0 0 8px 0; font-weight: 600;">
                    Flow Unit Co.
                </p>
                <p style="font-size: 12px; line-height: 1.6; color: #718096; margin: 0 0 15px 0;">
                    Task management made simple and effective
                </p>
                <p style="font-size: 11px; line-height: 1.5; color: #a0aec0; margin: 0;">
                    &copy; 2025 Flow Unit. All rights reserved.<br>
                    <a href="mailto:${
                      supportmail || "youngbeeh08@gmail.com"
                    }" style="color: #003366; text-decoration: none;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a> |
                    <a href="${
                      clientDomain || "https://flowunit.vercel.app"
                    }" style="color: #003366; text-decoration: none;">flowunit.vercel.app</a> |
                    <a href="${
                      clientDomain || "https://flowunit.vercel.app"
                    }/privacy" style="color: #003366; text-decoration: none;">Privacy Policy</a>
                </p>
                </td>
            </tr>

            </table>
        </td>
        </tr>
    </table>
    </body>
  `,
  };
  const mail = await transporter.sendMail(mailOptions);
  console.log("Password reset request mail sent successfully:", mail.messageId);
};

const sendPasswordResetSecurityMail = async (user, userName) => {
  const mailOptions = {
    from: `FlowUnit Team <${supportmail}>`,
    to: user.email,
    subject: "Password Reset Successful",
    replyTo: supportmail,
    html: `
        <body style="margin: 0; padding: 0; min-width: 100%; background-color: #f0f4f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f4f8; border-collapse: collapse; min-height: 100vh;">
            <tr>
            <td align="center" style="padding: 50px 20px;">
                <table width="600" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 51, 102, 0.08); border-collapse: collapse; overflow: hidden;">

                <!-- Header -->
                <tr>
                    <td style="background: linear-gradient(135deg, #003366 0%, #004c99 100%); padding: 50px 40px;">
                    <table width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                        <td align="center">
                            <img src="https://placehold.co/200x60/ffffff/003366?text=Flow+Unit" alt="Flow Unit Logo" style="max-width: 200px; height: auto; display: block; border: 0;" />
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="padding: 45px 50px;">
                    <h1 style="font-size: 24px; font-weight: 600; color: #003366; margin: 0 0 10px 0;">Password Reset Successful</h1>
                    
                    <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 30px 0;">
                        Hello ${userName || "User"},<br><br>
                        This is to notify you that your password for your Flow Unit account was successfully reset.
                    </p>

                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                        <tr>
                        <td style="background-color: #e6f3ff; border-left: 4px solid #87CEEB; padding: 20px 25px; border-radius: 4px;">
                            <p style="font-size: 14px; line-height: 1.6; color: #003366; margin: 0;">
                            <strong style="display: block; margin-bottom: 6px;">Didn’t make this change?</strong>
                            If you didn’t initiate this password reset, please <a href="mailto:${
                              supportmail || "youngbeeh08@gmail.com"
                            }" style="color: #004c99; text-decoration: underline;">contact our support team</a> immediately so we can secure your account.
                            </p>
                        </td>
                        </tr>
                    </table>

                    <p style="font-size: 14px; line-height: 1.6; color: #4a5568; margin: 0 0 10px 0;">
                        You can now log in with your new password and continue managing your projects seamlessly.
                    </p>
                    </td>
                </tr>

                <!-- Divider -->
                <tr>
                    <td style="padding: 0 50px;">
                    <div style="height: 1px; background-color: #e2e8f0;"></div>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center" style="padding: 30px 50px;">
                    <p style="font-size: 13px; line-height: 1.6; color: #003366; margin: 0 0 8px 0; font-weight: 600;">
                        Flow Unit Co.
                    </p>
                    <p style="font-size: 12px; line-height: 1.6; color: #718096; margin: 0 0 15px 0;">
                        Task management made simple and effective
                    </p>
                    <p style="font-size: 11px; line-height: 1.5; color: #a0aec0; margin: 0;">
                        &copy; 2025 Flow Unit. All rights reserved.<br>
                        <a href="mailto:${
                          supportmail || "youngbeeh08@gmail.com"
                        }" style="color: #003366; text-decoration: none;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a> |
                        <a href="${
                          clientDomain || "https://www.flowunit.vercel.app"
                        }" style="color: #003366; text-decoration: none;">www.flowunit.vercel.app</a>
                    </p>
                    </td>
                </tr>

                </table>
            </td>
            </tr>
        </table>
        </body>
    `,
  };
  const mail = await transporter.sendMail(mailOptions);
  console.log(
    "Password reset security mail sent successfully:",
    mail.messageId
  );
};

const sendProjectCreatedMail = async (project, user) => {
  const { name, _id } = project;
  const { userName, email } = user;
  const mailOptions = {
    from: `FlowUnit Team <${supportmail}>`,
    to: email,
    subject: "Project Created Successful",
    replyTo: supportmail,
    html: `
    <body style="margin:0;padding:0;min-width:100%;background-color:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f0f4f8;border-collapse:collapse;min-height:100vh;">
    <tr>
    <td align="center" style="padding:50px 20px;">
    <table width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:8px;box-shadow:0 4px 20px rgba(0,51,102,0.08);border-collapse:collapse;overflow:hidden;">

    <!-- HEADER -->
    <tr>
    <td style="background:linear-gradient(135deg,#003366 0%,#004c99 100%);padding:50px 40px;">
    <table width="100%">
    <tr><td align="center">
    <img src="https://placehold.co/200x60/ffffff/003366?text=Flow+Unit" alt="Flow Unit Logo" style="max-width:200px;height:auto;display:block;border:0;" />
    </td></tr>
    </table>
    </td>
    </tr>

    <!-- BODY -->
    <tr>
    <td style="padding:45px 50px;">
    <h1 style="font-size:24px;font-weight:600;color:#003366;margin:0 0 10px;">New Project Created</h1>
    <p style="font-size:15px;line-height:1.6;color:#4a5568;margin:0 0 30px;">
    Dear ${userName || "User"},<br><br>
    Your new project <strong>${
      name || "Untitled Project"
    }</strong> has been successfully created.<br>
    You can start adding tasks and tracking progress immediately.
    </p>

    <table width="100%" style="margin:0 0 30px;">
    <tr><td align="center">
    <a href="${
      clientDomain || "https://flowunit.vercel.app"
    }/dashboard/projects/${
      _id || ""
    }" style="background-color:#003366;color:#ffffff;text-decoration:none;padding:12px 25px;border-radius:6px;font-size:15px;font-weight:500;">View Project</a>
    </td></tr>
    </table>

    <p style="font-size:14px;color:#4a5568;line-height:1.6;margin:0;">
    Stay productive, stay focused. Flow Unit keeps your tasks organized and your goals in sight.
    </p>
    </td>
    </tr>

    <!-- FOOTER -->
    <tr><td style="padding:0 50px;"><div style="height:1px;background-color:#e2e8f0;"></div></td></tr>
    <tr><td align="center" style="padding:30px 50px;">
    <p style="font-size:13px;font-weight:600;color:#003366;margin:0 0 8px;">Flow Unit Co.</p>
    <p style="font-size:12px;color:#718096;margin:0 0 15px;">Task management made simple and effective</p>
    <p style="font-size:11px;color:#a0aec0;margin:0;">
    &copy; 2025 Flow Unit. All rights reserved.<br>
    <a href="mailto:${
      supportmail || "youngbeeh08@gmail.com"
    }" style="color:#003366;text-decoration:none;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a> |
    <a href="${
      clientDomain || "https://flowunit.vercel.app"
    }" style="color:#003366;text-decoration:none;">flowunit.vercel.app</a>
    </p>
    </td></tr>
    </table>
    </td></tr></table>
    </body>
    `,
  };
  const mail = await transporter.sendMail(mailOptions);
  console.log("Project create mail sent successfully:", mail.messageId);
};

const sendProjectupdatedMail = async (project, user, changes) => {
  const { name } = project;
  const { userName, email } = user;
  const mailOptions = {
    from: `FlowUnit Team <${supportmail}>`,
    to: email,
    subject: "Project Updated Successful",
    replyTo: supportmail,
    html: `
    <body style="margin: 0; padding: 0; min-width: 100%; background-color: #f0f4f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f4f8; border-collapse: collapse; min-height: 100vh;">
        <tr>
        <td align="center" style="padding: 50px 20px;">
            <table width="600" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 51, 102, 0.08); border-collapse: collapse; overflow: hidden;">
            
            <!-- HEADER -->
            <tr>
                <td style="background: linear-gradient(135deg, #003366 0%, #004c99 100%); padding: 50px 40px;">
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                    <td align="center">
                        <img src="https://placehold.co/200x60/ffffff/003366?text=Flow+Unit" alt="Flow Unit Logo" style="max-width: 200px; height: auto; display: block; border: 0;" />
                    </td>
                    </tr>
                </table>
                </td>
            </tr>

            <!-- BODY -->
            <tr>
                <td style="padding: 45px 50px;">
                <h1 style="font-size: 24px; font-weight: 600; color: #003366; margin: 0 0 10px 0; line-height: 1.3;">
                    Project Updated Successfully
                </h1>

                <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 30px 0;">
                    Dear ${userName || "User"},<br><br>
                    Your project <strong>"${name}"</strong> has been successfully updated. Below is a quick summary of the recent changes made:
                </p>

                <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                    <tr>
                    <td align="left" style="background-color: #f8fbfd; border: 2px solid #003366; border-radius: 6px; padding: 25px 30px;">
                        <p style="font-size: 14px; color: #003366; margin: 0 0 8px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Change Summary</p>
                        <p style="font-size: 15px; line-height: 1.6; color: #2d3748; margin: 0;">
                        ${
                          changes ||
                          "Minor updates were made to your project details."
                        }
                        </p>
                    </td>
                    </tr>
                </table>

                <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 30px 0;">
                    You can log in to your Flow Unit dashboard anytime to view the latest project updates and manage your tasks.
                </p>

                <!-- BUTTON -->
                <table cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 0 40px 0;">
                    <tr>
                    <td align="center" bgcolor="#003366" style="border-radius: 6px;">
                        <a href="${
                          clientDomain || "https://flowunit.vercel.app"
                        }/dashboard/projects/${project._id}" style="font-size: 15px; color: #ffffff; text-decoration: none; padding: 14px 40px; display: inline-block; font-weight: 600; letter-spacing: 0.5px;">
                        View Project
                        </a>
                    </td>
                    </tr>
                </table>

                <!-- SECURITY NOTICE -->
                <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                    <tr>
                    <td style="background-color: #e6f3ff; border-left: 4px solid #87CEEB; padding: 20px 25px; border-radius: 4px;">
                        <p style="font-size: 14px; line-height: 1.6; color: #003366; margin: 0;">
                        <strong style="display: block; margin-bottom: 6px;">Friendly Reminder</strong>
                        If you didn’t make this change or notice any unexpected updates, please contact our support team immediately at 
                        <a href="mailto:${
                          supportmail || "youngbeeh08@gmail.com"
                        }" style="color: #003366; text-decoration: underline;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a>.
                        </p>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>

            <!-- FOOTER -->
            <tr>
                <td style="padding: 0 50px;">
                <div style="height: 1px; background-color: #e2e8f0;"></div>
                </td>
            </tr>

            <tr>
                <td align="center" style="padding: 30px 50px;">
                <p style="font-size: 13px; line-height: 1.6; color: #003366; margin: 0 0 8px 0; font-weight: 600;">
                    Flow Unit Co.
                </p>
                <p style="font-size: 12px; line-height: 1.6; color: #718096; margin: 0 0 15px 0;">
                    Task management made simple and effective
                </p>
                <p style="font-size: 11px; line-height: 1.5; color: #a0aec0; margin: 0;">
                    &copy; 2025 Flow Unit. All rights reserved.<br>
                    <a href="mailto:${
                      supportmail || "youngbeeh08@gmail.com"
                    }" style="color: #003366; text-decoration: none;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a> |
                    <a href="${
                      clientDomain || "https://flowunit.vercel.app"
                    }" style="color: #003366; text-decoration: none;">flowunit.vercel.app</a> |
                    <a href="${
                      clientDomain || "https://flowunit.vercel.app"
                    }/privacy" style="color: #003366; text-decoration: none;">Privacy Policy</a>
                </p>
                </td>
            </tr>

            </table>
        </td>
        </tr>
    </table>
    </body>

    `,
  };
  const mail = await transporter.sendMail(mailOptions);
  console.log("Project update mail sent successfully:", mail.messageId);
};

const sendTaskCreatedMail = async (task, project, user) => {
  const { name, progress, _id } = project;
  const { userName, email } = user;
  const mailOptions = {
    from: `FlowUnit Team <${supportmail}>`,
    to: email,
    subject: "New Task Added",
    replyTo: supportmail,
    html: `
    <body style="margin:0;padding:0;min-width:100%;background-color:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f0f4f8;border-collapse:collapse;min-height:100vh;">
    <tr><td align="center" style="padding:50px 20px;">
    <table width="600" style="max-width:600px;background-color:#ffffff;border-radius:8px;box-shadow:0 4px 20px rgba(0,51,102,0.08);overflow:hidden;">

    <!-- HEADER -->
    <tr><td style="background:linear-gradient(135deg,#003366 0%,#004c99 100%);padding:50px 40px;" align="center">
    <img src="https://placehold.co/200x60/ffffff/003366?text=Flow+Unit" alt="Flow Unit Logo" style="max-width:200px;height:auto;" />
    </td></tr>

    <!-- BODY -->
    <tr><td style="padding:45px 50px;">
    <h1 style="font-size:24px;font-weight:600;color:#003366;margin:0 0 10px;">New Task Added</h1>
    <p style="font-size:15px;line-height:1.6;color:#4a5568;margin:0 0 30px;">
    Dear ${userName || "User"},<br><br>
    A new task titled <strong>${
      task.name || "Unnamed Task"
    }</strong> has been created in your project <strong>${
      name || "Unnamed Project"
    }</strong>.<br>
    Current project progress: <strong>${Math.round(+progress) || 0}%</strong>.
    </p>

    <table width="100%" style="margin:0 0 30px;">
    <tr><td align="center">
    <a href="${
      clientDomain || "https://flowunit.vercel.app"
    }/dashboard/projects/${
      _id || ""
    }" style="background-color:#003366;color:#ffffff;text-decoration:none;padding:12px 25px;border-radius:6px;font-size:15px;">View Task</a>
    </td></tr>
    </table>

    <p style="font-size:14px;color:#4a5568;line-height:1.6;margin:0;">
    Keep moving — every new task brings your project closer to completion.
    </p>
    </td></tr>

    <!-- FOOTER -->
    <tr><td style="padding:0 50px;"><div style="height:1px;background-color:#e2e8f0;"></div></td></tr>
    <tr><td align="center" style="padding:30px 50px;">
    <p style="font-size:13px;font-weight:600;color:#003366;margin:0 0 8px;">Flow Unit Co.</p>
    <p style="font-size:12px;color:#718096;margin:0 0 15px;">Task management made simple and effective</p>
    <p style="font-size:11px;color:#a0aec0;margin:0;">
    &copy; 2025 Flow Unit. All rights reserved.<br>
    <a href="mailto:${
      supportmail || "youngbeeh08@gmail.com"
    }" style="color:#003366;text-decoration:none;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a> |
    <a href="${
      clientDomain || "https://flowunit.vercel.app"
    }" style="color:#003366;text-decoration:none;">flowunit.vercel.app</a>
    </p>
    </td></tr>
    </table>
    </td></tr></table>
    </body>
    `,
  };
  const mail = await transporter.sendMail(mailOptions);
  console.log("Task create mail sent successfully:", mail.messageId);
};

const sendTaskUpdatedMail = async (task, project, user) => {
  const { name, progress, createdBy } = project;
  const { userName } = user;
  const mailOptions = {
    from: `FlowUnit Team <${supportmail}>`,
    to: createdBy.email,
    subject: "Task Updated",
    replyTo: supportmail,
    html: `
    <body style="margin:0;padding:0;min-width:100%;background-color:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
    <table width="100%" style="background-color:#f0f4f8;min-height:100vh;">
    <tr><td align="center" style="padding:50px 20px;">
    <table width="600" style="max-width:600px;background-color:#ffffff;border-radius:8px;box-shadow:0 4px 20px rgba(0,51,102,0.08);overflow:hidden;">
    <tr><td style="background:linear-gradient(135deg,#003366 0%,#004c99 100%);padding:50px 40px;" align="center">
    <img src="https://placehold.co/200x60/ffffff/003366?text=Flow+Unit" alt="Flow Unit Logo" />
    </td></tr>

    <tr><td style="padding:45px 50px;">
    <h1 style="font-size:24px;font-weight:600;color:#003366;margin:0 0 10px;">Task Updated</h1>
    <p style="font-size:15px;line-height:1.6;color:#4a5568;margin:0 0 30px;">
    Dear ${userName || "user"}, ${
      userName || "A team member"
    } updated the task <strong>${
      task.name || "Unnamed Task"
    }</strong> in project <strong>${name || "Unnamed Project"}</strong>.<br>
    Current project progress: <strong>${progress || 0}%</strong>.
    </p>

    <p style="font-size:14px;color:#4a5568;line-height:1.6;margin:0;">
    Stay up to date with your team’s progress — collaboration drives results.
    </p>
    </td></tr>

   <tr><td style="padding:0 50px;"><div style="height:1px;background-color:#e2e8f0;"></div></td></tr>
    <tr><td align="center" style="padding:30px 50px;">
    <p style="font-size:13px;font-weight:600;color:#003366;margin:0 0 8px;">Flow Unit Co.</p>
    <p style="font-size:12px;color:#718096;margin:0 0 15px;">Task management made simple and effective</p>
    <p style="font-size:11px;color:#a0aec0;margin:0;">
    &copy; 2025 Flow Unit. All rights reserved.<br>
    <a href="mailto:${
      supportmail || "youngbeeh08@gmail.com"
    }" style="color:#003366;text-decoration:none;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a> |
    <a href="${
      clientDomain || "https://flowunit.vercel.app"
    }" style="color:#003366;text-decoration:none;">flowunit.vercel.app</a>
    </p>
    </td></tr>
    </table>
    </td></tr></table>
    </body>
    `,
  };
  const mail = await transporter.sendMail(mailOptions);
  console.log("Task update mail sent successfully:", mail.messageId);
};

const sendTaskCompletedMail = async (task, project, user) => {
  const { name, progress, createdBy } = project;
  const mailOptions = {
    from: `FlowUnit Team <${supportmail}>`,
    to: [createdBy.email, user.email],
    subject: "Task Completed",
    replyTo: supportmail,
    html: `
    <body
    style="
      margin: 0;
      padding: 0;
      min-width: 100%;
      background-color: #f0f4f8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, sans-serif;
    "
    >
        <table width="100%" style="background-color: #f0f4f8; min-height: 100vh">
        <tr>
            <td align="center" style="padding: 50px 20px">
            <table
                width="600"
                style="
                max-width: 600px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 51, 102, 0.08);
                overflow: hidden;
                "
            >
                <tr>
                <td
                    style="
                    background: linear-gradient(135deg, #003366 0%, #004c99 100%);
                    padding: 50px 40px;
                    "
                    align="center"
                >
                    <img
                    src="https://placehold.co/200x60/ffffff/003366?text=Flow+Unit"
                    alt="Flow Unit Logo"
                    />
                </td>
                </tr>

                <tr>
                <td style="padding: 45px 50px">
                    <h1
                    style="
                        font-size: 24px;
                        font-weight: 600;
                        color: #003366;
                        margin: 0 0 10px;
                    "
                    >
                    Task Completed
                    </h1>
                    <p
                    style="
                        font-size: 15px;
                        line-height: 1.6;
                        color: #4a5568;
                        margin: 0 0 30px;
                    "
                    >
                    Congratulations! The task
                    <strong>${task.name || "Unnamed Task"}</strong> in project
                    <strong>${name || "Unnamed Project"}</strong> has been
                    marked as completed.<br />
                    Your project progress is now
                    <strong>${progress || 0}%</strong>.
                    </p>

                    ${
                      progress === 100
                        ? `
                    <p
                    style="
                        font-size: 13px;
                        color: #003366;
                        font-weight: 600;
                        margin-bottom: 30px;
                    "
                    >
                    🎉 Project Completed — Great job to you and your team members for contributing & finishing strong!
                    </p>
                    `
                        : ""
                    }

                    <p
                    style="
                        font-size: 14px;
                        color: #4a5568;
                        line-height: 1.6;
                        margin: 0;
                    "
                    >
                    Keep up the momentum — every completed task moves you closer
                    to your goals.
                    </p>
                </td>
                </tr>

                <tr><td style="padding:0 50px;"><div style="height:1px;background-color:#e2e8f0;"></div></td></tr>
                <tr><td align="center" style="padding:30px 50px;">
                <p style="font-size:13px;font-weight:600;color:#003366;margin:0 0 8px;">Flow Unit Co.</p>
                <p style="font-size:12px;color:#718096;margin:0 0 15px;">Task management made simple and effective</p>
                <p style="font-size:11px;color:#a0aec0;margin:0;">
                &copy; 2025 Flow Unit. All rights reserved.<br>
                <a href="mailto:${
                  supportmail || "youngbeeh08@gmail.com"
                }" style="color:#003366;text-decoration:none;">${
      supportmail || "youngbeeh08@gmail.com"
    }</a> |
                <a href="${
                  clientDomain || "https://flowunit.vercel.app"
                }" style="color:#003366;text-decoration:none;">flowunit.vercel.app</a>
                </p>
                </td></tr>
                </table>
                </td></tr>
            </table>
            </td>
        </tr>
        </table>
    </body>
    `,
  };
  const mail = await transporter.sendMail(mailOptions);
  console.log("Task completed mail sent successfully:", mail.messageId);
};

const sendInvitationMail = async (token, team, user) => {
  const mailOptions = {
    from: `FlowUnit Team <${supportmail}>`,
    to: user.email,
    subject: `You are invited to join ${team.name || "a"} team!`,
    replyTo: supportmail,
    html: `
<body style="margin: 0; padding: 0; min-width: 100%; background-color: #f0f4f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f4f8; border-collapse: collapse; min-height: 100vh;">
        <tr>
            <td align="center" style="padding: 50px 20px;">
                <table width="600" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 51, 102, 0.08); border-collapse: collapse; overflow: hidden;">

                    <tr>
                        <td style="background: linear-gradient(135deg, #003366 0%, #004c99 100%); padding: 50px 40px;">
                            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center">
                                        <img src="https://placehold.co/200x60/ffffff/003366?text=Your+Logo" alt="Company Logo" style="max-width: 200px; height: auto; display: block; border: 0;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="padding: 45px 50px;">
                            <h1 style="font-size: 24px; font-weight: 600; color: #003366; margin: 0 0 10px 0; line-height: 1.3;">🎉 You've Been Invited to Join a Team!</h1>
                            
                            <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 30px 0;">
                                Dear ${user.userName || "Team Member"},<br><br>
                                We are excited to invite you to join the **${
                                  team.name || ""
                                }** team on **Flow Unit Co.**! We believe your skills and experience would be a great asset to our work, This invitation will expire within 24Hrs.
                            </p>
                            
                            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                                <tr>
                                    <td align="center">
                                        <table cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td align="center" style="border-radius: 6px; background-color: #004c99;">
                                                    <a href="${
                                                      process.env.CLIENT_DOMAIN
                                                    }/invitation/${
      team._id
    }?token=${token}" target="_blank" style="font-size: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 6px; padding: 12px 25px; border: 1px solid #004c99; display: inline-block; font-weight: 600;">
                                                        View Invitation
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="font-size: 12px; color: #718096; margin: 15px 0 0 0;">This invitation link contains a unique token for your access.</p>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 30px 0;">
                                If the button above doesn't work, you can copy and paste the following link into your web browser:
                                <br>
                                <a href="${
                                  process.env.CLIENT_DOMAIN
                                }/invitation/${
      team._id
    }?token=${token}" style="word-break: break-all; font-size: 14px; color: #004c99; text-decoration: underline;">${
      process.env.CLIENT_DOMAIN
    }/invitation?token=${token}</a>
                            </p>
                            
                            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                                <tr>
                                    <td style="background-color: #e6f3ff; border-left: 4px solid #87CEEB; padding: 20px 25px; border-radius: 4px;">
                                        <p style="font-size: 14px; line-height: 1.6; color: #003366; margin: 0;">
                                            <strong style="display: block; margin-bottom: 6px;">Action Required</strong>
                                            Please click the button to view the full invitation details and accept or decline. If you did not expect this invitation, please contact us immediately at <a href="mailto:${
                                              supportmail ||
                                              "flowunitapp@gmail.com"
                                            }" style="color: #003366; text-decoration: underline;">${
      supportmail || "flowunitapp@gmail.com"
    }</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="padding: 0 50px;">
                            <div style="height: 1px; background-color: #e2e8f0;"></div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center" style="padding: 30px 50px;">
                            <p style="font-size: 13px; line-height: 1.6; color: #003366; margin: 0 0 8px 0; font-weight: 600;">
                                Flow Unit Co.
                            </p>
                            <p style="font-size: 12px; line-height: 1.6; color: #718096; margin: 0 0 15px 0;">
                                Task management made simple and effective
                            </p>
                            <p style="font-size: 11px; line-height: 1.5; color: #a0aec0; margin: 0;">
                                &copy; 2025 Flow Unit. All rights reserved.<br>
                                <a href="mailto:${
                                  supportmail || "flowunitapp@gmail.com"
                                }" style="color: #003366; text-decoration: none;">${
      supportmail || "flowunitapp@gmail.com"
    }</a> | 
                                <a href="${
                                  clientDomain ||
                                  "https://www.flowunitapp.vercel.app"
                                }" style="color: #003366; text-decoration: none;">www.flowunitapp.vercel.app</a> | 
                                <a href="${
                                  clientDomain ||
                                  "https://www.flowunitapp.vercel.app"
                                }/privacy" style="color: #003366; text-decoration: none;">Privacy Policy</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
    `,
  };
  const mail = await transporter.sendMail(mailOptions);
  console.log("Team invitation mail sent successfully:", mail.messageId);
};

const sendTaskAssignmentMail = async (taskTitle, assignerName, user) => {
  const dashboardLink = `${clientDomain}/dashboard`;
  const mailOptions = {
    from: `FlowUnit Team <${supportmail}>`,
    to: user.email,
    subject: `Task Assigned: ${taskTitle}`,
    replyTo: supportmail,
    html: `
<body style="margin: 0; padding: 0; min-width: 100%; background-color: #f0f4f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f4f8; border-collapse: collapse; min-height: 100vh;">
        <tr>
            <td align="center" style="padding: 50px 20px;">
                <table width="600" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 51, 102, 0.08); border-collapse: collapse; overflow: hidden;">

                    <tr>
                        <td style="background: linear-gradient(135deg, #003366 0%, #004c99 100%); padding: 50px 40px;">
                            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center">
                                        <img src="https://placehold.co/200x60/ffffff/003366?text=Your+Logo" alt="Company Logo" style="max-width: 200px; height: auto; display: block; border: 0;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="padding: 45px 50px;">
                            <h1 style="font-size: 24px; font-weight: 600; color: #003366; margin: 0 0 10px 0; line-height: 1.3;">✅ New Task Assigned to You!</h1>
                            
                            <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 20px 0;">
                                Dear **${user.userName || "Team Member"}**,
                            </p>
                            
                            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0; border: 1px solid #e2e8f0; border-radius: 6px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 10px 0;">
                                            You have been assigned a new task by **${
      assignerName || "a team member"
    }**.
                                        </p>
                                        <p style="font-size: 16px; font-weight: 700; color: #003366; margin: 0;">
                                            Task: ${taskTitle}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 30px 0;">
                                Please click the button below to go to your dashboard and view the full details of this task, including its description, deadline, and priority.
                            </p>
                            
                            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                                <tr>
                                    <td align="center">
                                        <table cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td align="center" style="border-radius: 6px; background-color: #004c99;">
                                                    <a href="${dashboardLink}" target="_blank" style="font-size: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 6px; padding: 12px 25px; border: 1px solid #004c99; display: inline-block; font-weight: 600;">
                                                        View Task on Dashboard
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="font-size: 12px; color: #718096; margin: 15px 0 0 0;">Click the button to manage your new assignment.</p>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 30px 0;">
                                If the button above doesn't work, you can copy and paste the following link into your web browser:
                                <br>
                                <a href="${dashboardLink}" style="word-break: break-all; font-size: 14px; color: #004c99; text-decoration: underline;">${dashboardLink}</a>
                            </p>
                            
                            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                                <tr>
                                    <td style="background-color: #e6f3ff; border-left: 4px solid #87CEEB; padding: 20px 25px; border-radius: 4px;">
                                        <p style="font-size: 14px; line-height: 1.6; color: #003366; margin: 0;">
                                            <strong style="display: block; margin-bottom: 6px;">Stay Organized</strong>
                                            We recommend checking your dashboard regularly for any new assignments or updates to existing tasks. If you have any questions, please reply to this email or contact support at <a href="mailto:${
      supportmail || "flowunitapp@gmail.com"
    }" style="color: #003366; text-decoration: underline;">${
      supportmail || "flowunitapp@gmail.com"
    }</a>.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="padding: 0 50px;">
                            <div style="height: 1px; background-color: #e2e8f0;"></div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center" style="padding: 30px 50px;">
                            <p style="font-size: 13px; line-height: 1.6; color: #003366; margin: 0 0 8px 0; font-weight: 600;">
                                Flow Unit Co.
                            </p>
                            <p style="font-size: 12px; line-height: 1.6; color: #718096; margin: 0 0 15px 0;">
                                Task management made simple and effective
                            </p>
                            <p style="font-size: 11px; line-height: 1.5; color: #a0aec0; margin: 0;">
                                &copy; 2025 Flow Unit. All rights reserved.<br>
                                <a href="mailto:${
      supportmail || "flowunitapp@gmail.com"
    }" style="color: #003366; text-decoration: none;">${
      supportmail || "flowunitapp@gmail.com"
    }</a> | 
                                <a href="${dashboardLink
      .split("/")
      .slice(0, 3)
      .join(
        "/"
      )}" style="color: #003366; text-decoration: none;">www.flowunitapp.vercel.app</a> | 
                                <a href="${dashboardLink
      .split("/")
      .slice(0, 3)
      .join(
        "/"
      )}/privacy" style="color: #003366; text-decoration: none;">Privacy Policy</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
    `,
  };
  const mail = await transporter.sendMail(mailOptions);
  console.log("Task assignment mail sent successfully:", mail.messageId);
};

module.exports = {
  sendWelcomeMail,
  sendOtpMail,
  sendPasswordResetMail,
  sendPasswordResetSecurityMail,
  sendProjectCreatedMail,
  sendProjectupdatedMail,
  sendTaskCreatedMail,
  sendTaskUpdatedMail,
  sendTaskCompletedMail,
  sendInvitationMail,
  sendTaskAssignmentMail,
};
