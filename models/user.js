const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "Please provide your username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "Email with this account already exist"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      trim: true,
    },
    profile: {
      type: String,
      trim: true,
    },
    otp: {
      type: Number,
      default: null,
      trim: true,
    },
    otpExp: {
      type: Date,
      default: null,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      trim: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
      trim: true,
    },
    currentSession: {
      type: String,
      default: null,
      trim: true,
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
    memberOf: [{ type: mongoose.Schema.Types.ObjectId, ref: "teams" }],
    ownerOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teams",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
