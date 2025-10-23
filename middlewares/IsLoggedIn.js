const userModel = require("../models/user");
const { decodeToken } = require("../services/jwt");

const isLoggedIn = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Request failed. No token provided.",
      });
    }

    const decoded = decodeToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        status: "error",
        message: "Invalid or expired token.",
      });
    }
    const validateUser = await userModel.findById(decoded.id).populate("projects");
    if (!validateUser) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }
    if (token !== validateUser.currentSession) {
      return res.status(401).json({
        status: "error",
        message:
          "Request failed. Your session has expired or you have recently log out.",
      });
    }
    req.user = validateUser;
    next()
  } catch (error) {
    console.log("Is login error", error);
    next(error);
  }
};

module.exports = isLoggedIn;
