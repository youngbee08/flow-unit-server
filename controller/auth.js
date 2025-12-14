const userModel = require("../models/user");
const { hashPassword, verifyPassword } = require("../services/bcrypt");
const { gnerateToken } = require("../services/jwt");
const { generateOtp } = require("../services/otpGenerator");
const {
  sendOtpMail,
  sendWelcomeMail,
  sendPasswordResetMail,
  sendPasswordResetSecurityMail,
} = require("../utils/nodemailer/mailer");

const signUp = async (req, res, next) => {
  const { body } = req;
  const { password, userName } = body;
  const hashedPassword = await hashPassword(password);
  const otp = generateOtp(6);
  const otpExp = Date.now() + 5 * 60 * 1000;
  const defAvatar = `https://api.dicebear.com/8.x/avataaars/svg?seed=${encodeURIComponent(
    userName
  )}`;
  try {
    const user = await userModel.create({
      ...body,
      password: hashedPassword,
      otp: otp,
      otpExp: otpExp,
      profile: defAvatar,
    });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Unable to create account",
      });
    }
    await sendWelcomeMail(user, userName, otp);
    await sendOtpMail(user, userName, otp);
    res.status(200).json({
      status: "success",
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    console.log("Sign up error", error);
    next(error);
  }
};

const checkUsernameExist = async (req, res, next) => {
  if (!req.params.username) {
    return res.status(400).json({
      status: "error",
      message: "Please provide username parameter",
    });
  }
  try {
    const { username } = req.params;
    const findUser = await userModel.findOne({ userName: username });
    if (findUser) {
      return res.status(400).json({
        status: "error",
        message: "An account with this username already exists",
      });
    }
    res.status(200).json({
      status: "success",
      message: `Username: ${username} is available for you to use`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const verifyAccount = async (req, res, next) => {
  if (!req?.body?.code) {
    return res.status(400).json({
      status: "error",
      message: "Field code is required!",
    });
  }
  if (!req?.body?.email) {
    return res.status(400).json({
      status: "error",
      message: "Field email is required!",
    });
  }
  const { code, email } = req?.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(422).json({
        status: "error",
        message: `Invalid email, try using a valid email to verify your account.`,
      });
    }
    if (user?.isVerified) {
      return res.status(403).json({
        status: "error",
        message: `Your account has been verified already, try logging in to your account`,
      });
    }
    const validateCode = user.otp && user.otp.toString() === code.toString();
    if (!validateCode) {
      return res.status(422).json({
        status: "error",
        message:
          "Invalid code, please check your the code in your email and try again",
      });
    }
    const validateCodeExp = Date.now() > user.otpExp;
    if (validateCodeExp) {
      return res.status(410).json({
        status: "error",
        message:
          "The code you entered has expired, please request a new one to verify your account",
      });
    }
    await userModel.findByIdAndUpdate(user._id, {
      otp: null,
      otpExp: null,
      isVerified: true,
    });
    res.status(202).json({
      status: "success",
      message: "Account verified successfully.",
    });
  } catch (error) {
    console.log("Account verification error", error);
    next(error);
  }
};

const resendOtp = async (req, res, next) => {
  if (!req?.body?.email) {
    return res.status(400).json({
      status: "error",
      message: "Field email is required!",
    });
  }

  try {
    const { email } = req?.body;
    const validateUser = await userModel.findOne({ email });
    if (!validateUser) {
      return res.status(422).json({
        status: "error",
        message: "Invalid email, please provide your valid email",
      });
    }
    const otp = generateOtp(6);
    const otpExp = Date.now() + 5 * 60 * 1000;

    await userModel.findByIdAndUpdate(validateUser._id, { otp, otpExp });
    await sendOtpMail(validateUser, validateUser.userName, otp);
    res.status(200).json({
      status: "success",
      message: "Verification mail resent successfully",
    });
  } catch (error) {
    console.log("OTP resend error", error);
    next(error);
  }
};

const requestResetPassword = async (req, res, next) => {
  if (!req?.body?.email) {
    return res.status(400).json({
      status: "error",
      message: "Please provide your email address",
    });
  }
  try {
    const { email } = req?.body;
    const validateUser = await userModel.findOne({ email });
    if (!validateUser) {
      return res.status(422).json({
        status: "error",
        message: "Invalid email, please provide your valid email",
      });
    }
    const otp = generateOtp(6);
    const otpExp = Date.now() + 5 * 60 * 1000;

    await userModel.findByIdAndUpdate(validateUser._id, { otp, otpExp });
    await sendPasswordResetMail(validateUser, validateUser.userName, otp);
    res.status(200).json({
      status: "success",
      message: "Password reset request mail sent successfully",
    });
  } catch (error) {
    console.log("requestResetPassword-error", error);
    next(error);
  }
};

const resendResetPasswordOtp = async (req, res, next) => {
  if (!req?.body?.email) {
    return res.status(400).json({
      status: "error",
      message: "Field email is required!",
    });
  }

  try {
    const { email } = req?.body;
    const validateUser = await userModel.findOne({ email });
    if (!validateUser) {
      return res.status(422).json({
        status: "error",
        message: "Invalid email, please provide your valid email",
      });
    }
    const otp = generateOtp(6);
    const otpExp = Date.now() + 5 * 60 * 1000;

    await userModel.findByIdAndUpdate(validateUser._id, { otp, otpExp });
    await sendPasswordResetMail(validateUser, validateUser.userName, otp);
    res.status(200).json({
      status: "success",
      message: "Password reset request mail resent successfully",
    });
  } catch (error) {
    console.log("reset password OTP resend error", error);
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  if (!req?.body?.email) {
    return res.status(400).json({
      status: "error",
      message: "Please provide your email address",
    });
  }
  if (!req?.body?.code) {
    return res.status(400).json({
      status: "error",
      message: "Please provide the OTP sent to your email address",
    });
  }
  if (!req?.body?.newPassword) {
    return res.status(400).json({
      status: "error",
      message: "Please provide your new password",
    });
  }
  if (!req?.body?.confirmNewPassword) {
    return res.status(400).json({
      status: "error",
      message: "Please confirm your new password",
    });
  }
  try {
    const { email, code, newPassword, confirmNewPassword } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(422).json({
        status: "error",
        message: `Invalid email, please provide your valid email address`,
      });
    }
    const validateCode = user.otp && user.otp.toString() === code.toString();
    if (!validateCode) {
      return res.status(422).json({
        status: "error",
        message:
          "Invalid code, please check your the code in your email and try again.",
      });
    }
    const validateCodeExp = Date.now() > user.otpExp;
    if (validateCodeExp) {
      return res.status(410).json({
        status: "error",
        message: "The code you entered has expired, please request a new one.",
      });
    }
    const comparePassword = await verifyPassword(newPassword, user);
    if (comparePassword) {
      return res.status(400).json({
        status: "error",
        message: "New password can't be the same as your old password",
      });
    }
    if (confirmNewPassword !== newPassword) {
      return res.status(400).json({
        status: "error",
        message: "Password doesn't match",
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      otp: null,
      otpExp: null,
    });
    await sendPasswordResetSecurityMail(user, user.userName);
    res.status(200).json({
      status: "success",
      message: "Password reset successfull",
    });
  } catch (error) {
    console.log("resetPassword-error", error);
    next(error);
  }
};

const login = async (req, res, next) => {
  if (!req?.body?.userName) {
    return res.status(400).json({
      status: "error",
      message: "Field username is required!",
    });
  }
  if (!req?.body?.password) {
    return res.status(400).json({
      status: "error",
      message: "Field password is required!",
    });
  }
  try {
    const { userName, password } = req?.body;
    const validateUser = await userModel.findOne({ userName });
    if (!validateUser) {
      return res.status(422).json({
        status: "error",
        message: "Invalid credentials",
      });
    }
    if (!validateUser.isVerified) {
      return res.status(400).json({
        status: "error",
        message: "Please verify your account before you login",
      });
    }
    if (validateUser.isDisabled) {
      return res
        .status(403)
        .json({ message: "Your account has been disabled. Contact support." });
    }
    const checkPassword = await verifyPassword(password, validateUser);
    if (!checkPassword) {
      return res.status(422).json({
        status: "error",
        message: "Invalid credentials",
      });
    }
    const token = await gnerateToken(validateUser);
    await userModel.findByIdAndUpdate(validateUser._id, {
      currentSession: token,
    });
    res.status(200).json({
      status: "success",
      message: "Log in successfully",
      token: token,
    });
  } catch (error) {
    console.log("Login error", error);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }
    await userModel.findByIdAndUpdate(req.user._id, { currentSession: null });
    res.json({ status: "success", message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error", error);
    next(error);
  }
};

module.exports = {
  signUp,
  checkUsernameExist,
  verifyAccount,
  resendOtp,
  requestResetPassword,
  resendResetPasswordOtp,
  resetPassword,
  login,
  logout,
};
