const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    projectType: {
      type: String,
      required: [true, "Project type is required"],
      trim: true,
      enum: ["personal", "team"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Project start date is required"],
    },

    dueDate: {
      type: Date,
      required: [true, "Project due date is required"],
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: "Due date cannot be in the past",
      },
    },
    priorityLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Project priority level is required"],
    },
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "pending",
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    latestChanges: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const projectModel = mongoose.model("projects", projectSchema);
module.exports = projectModel;
