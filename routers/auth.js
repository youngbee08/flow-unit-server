const express = require("express");
const {
  signUp,
  verifyAccount,
  resendOtp,
  login,
  logout,
  checkUsernameExist,
  requestResetPassword,
  resetPassword,
  resendResetPasswordOtp,
} = require("../controller/auth");
const isLoggedIn = require("../middlewares/IsLoggedIn");
const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.get("/validateUsername/:username", checkUsernameExist)
authRouter.post("/verify", verifyAccount);
authRouter.post("/resendOtp", resendOtp);
authRouter.post("/requestResetPassword", requestResetPassword);
authRouter.post("/resendResetPasswordOtp", resendResetPasswordOtp);
authRouter.post("/resetPassword", resetPassword);
authRouter.post("/login", login);
authRouter.put("/logout", isLoggedIn, logout)

module.exports = authRouter;
