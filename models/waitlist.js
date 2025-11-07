const mongoose = require("mongoose");

const waitlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Waitlist = mongoose.model("Waitlist", waitlistSchema);

module.exports = Waitlist;
