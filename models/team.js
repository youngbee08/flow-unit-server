const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide your team name"],
    },
    about: {
      type: String,
      trim: true,
      required: [true, "Please provide your team about info"],
    },
    ownedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
  },
  { timestamps: true }
);

const teamModel = mongoose.model("teams", teamSchema);
module.exports = teamModel;
