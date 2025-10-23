const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Task name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
    },
    dueDate: {
      type: Date,
      required: [true, "Task due date is required"],
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: "Due date cannot be in the past",
      },
    },
    status: {
      type: String,
      enum: ["done", "todo"],
      default: "todo",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
      required: true,
    },
    cantUpdate:{
      type:Boolean,
      trim:true,
      default:false
    }
  },
  { timestamps: true }
);

const taskModel = mongoose.model("tasks", taskSchema);
module.exports = taskModel;
