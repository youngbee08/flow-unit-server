const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    invitationInfo: {
      type: String,
      required: [true, "Invitation info is required"],
      trim: true,
    },
    invitationToken: {
      type: String,
      required: [true, "Invitation token is required"],
      trim: true,
    },
    expDate: {
      type: String,
      required: [true, "Invitation expiration date is required"],
    },
  },
  { timestamps: true }
);

const invitationModel = mongoose.model("invitations", invitationSchema);

module.exports = invitationModel;
