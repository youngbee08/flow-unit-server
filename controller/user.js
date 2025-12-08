const mongoose = require("mongoose");
const projectModel = require("../models/project");
const taskModel = require("../models/task");
const userModel = require("../models/user");
const { verifyPassword, hashPassword } = require("../services/bcrypt");
const {
  sendProjectCreatedMail,
  sendProjectupdatedMail,
  sendTaskCreatedMail,
  sendTaskUpdatedMail,
  sendTaskCompletedMail,
} = require("../utils/nodemailer/mailer");
const teamModel = require("../models/team");

const viewProfile = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  try {
    const findUser = await userModel
      .findById(req.user._id)
      .select([
        "-password",
        "-otp",
        "-otpExp",
        "-currentSession",
        "-isVerified",
        "-isDisabled",
      ])
      .populate("projects");
    if (!findUser) {
      return res.status(422).json({
        status: "error",
        message: "Please provide a valid token",
      });
    }
    res.json({
      status: "success",
      message: "User found successful",
      user: findUser,
    });
  } catch (error) {
    console.log("vie-profile error", error);
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  if (!req?.body?.oldPassword) {
    return res.status(400).json({
      status: "error",
      message: "Please provide your old password",
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
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    const verifyOldPassword = await verifyPassword(oldPassword, req.user);
    if (!verifyOldPassword) {
      return res.status(422).json({
        status: "error",
        message: "Invalid old password",
      });
    }

    if (oldPassword === newPassword) {
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
    console.log(hashedPassword);
    await userModel.findByIdAndUpdate(req.user._id, {
      password: hashedPassword,
    });
    res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("updatePassword error", error);
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "Please provide at least one field to update",
    });
  }
  try {
    if (req.body.email && req.body.email !== req.user.email) {
      const existingEmail = await userModel.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.status(400).json({
          status: "error",
          message: "Provided email already exists",
        });
      }
    }

    if (req.body.userName && req.body.userName !== req.user.userName) {
      const existingUsername = await userModel.findOne({
        userName: req.body.userName,
      });
      if (existingUsername) {
        return res.status(400).json({
          status: "error",
          message: "Provided username already exists",
        });
      }
    }

    if (req?.body?.userName && req.body.userName !== req.user.userName) {
      req.body.profile = `https://api.dicebear.com/8.x/avataaars/svg?seed=${encodeURIComponent(
        req.body.userName
      )}`;
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(req?.user?._id, req.body, { new: true })
      .select([
        "-password",
        "-otp",
        "-otpExp",
        "-currentSession",
        "-isVerified",
        "-isDisabled",
      ]);
    let message = `Profile updated successfully.${
      req?.body?.userName ? " Avatar regenerated to match new username" : ""
    }`;
    res.status(200).json({
      status: "success",
      message,
      user: updatedUser,
    });
  } catch (error) {
    console.log("updateProfile-error", error);
    next(error);
  }
};

const createProject = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  if (!req.query.type) {
    return res.status(400).json({
      status: "error",
      messsage: "Please provide your project type",
    });
  }

  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }

  const { _id } = req.user;
  const { name } = req.body;
  const { type } = req.query;
  try {
    const projectAlreadyExists = await projectModel.findOne({
      createdBy: _id,
      name,
    });
    if (projectAlreadyExists) {
      return res.status(403).json({
        status: "error",
        message: "You already have a project with that name.",
      });
    }
    let project;

    if (type === "personal") {
      project = await projectModel.create({
        ...req.body,
        createdBy: _id,
        projectType: type,
      });
      await userModel.findByIdAndUpdate(_id, {
        $push: { projects: project._id },
      });
    } else if (type === "team") {
      const userTeam = await teamModel.findById(req.user.ownerOf);
      if (!userTeam) {
        return res.status(403).json({
          status: "error",
          message:
            "Couldn't create team project, Seems you dont have any team.",
        });
      }
      project = await projectModel.create({
        ...req.body,
        createdBy: _id,
        projectType: type,
      });
      await teamModel.findByIdAndUpdate(userTeam._id, {
        $push: { projects: project._id },
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Project type must be either team or personal, ",
      });
    }

    await sendProjectCreatedMail(project, req.user);
    res.status(201).json({
      status: "success",
      message: "Project created successfully. you can start adding tasks",
      project,
    });
  } catch (error) {
    console.log("create-project-error", error);
    next(error);
  }
};

const checkProjectNameExist = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  const { projectName } = req.params;
  if (!projectName) {
    return res.status(400).json({
      status: "error",
      message: "Please provide project name parameter",
    });
  }
  try {
    const decodedName = decodeURIComponent(projectName.trim());
    const existingProject = await projectModel.findOne({
      createdBy: req.user._id,
      name: decodedName,
    });
    if (existingProject) {
      return res.status(400).json({
        status: "error",
        message: "A project with this name already exists in your account",
      });
    }
    res.status(200).json({
      status: "success",
      message: `Project name '${decodedName}' is available for use.`,
    });
  } catch (error) {
    console.log("checkProjectNameExist-error", error);
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "Please provide at least one field to update",
    });
  }
  const { projectID } = req.params;
  if (!mongoose.Types.ObjectId.isValid(projectID)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid project ID format",
    });
  }
  if (!req.params.projectID) {
    return res.status(400).json({
      status: "error",
      message: "Please provide project ID parameter",
    });
  }
  if (!req.body.updateMessage) {
    return res.status(400).json({
      status: "error",
      message: "Please provide project update message",
    });
  }
  try {
    const findProject = await projectModel.findOne({
      createdBy: req.user._id,
      _id: projectID,
    });
    if (!findProject) {
      return res.status(400).json({
        status: "error",
        message:
          "Couldn't find project with given ID or you don't have permission to update this project",
      });
    }
    if (req?.body?.name && req.body.name !== findProject.name) {
      const existingProject = await projectModel.findOne({
        createdBy: req.user._id,
        name: req.body.name,
      });
      if (existingProject) {
        return res.status(400).json({
          status: "error",
          message: "A project with this name already exists in your account",
        });
      }
    }
    if (req.body.createdBy) delete req.body.createdBy;

    const updatedProject = await projectModel.findByIdAndUpdate(
      findProject._id,
      { ...req.body, latestChanges: req.body.updateMessage },
      { new: true }
    );
    await sendProjectupdatedMail(
      updatedProject,
      req.user,
      updatedProject.latestChanges
    );
    res.status(200).json({
      status: "success",
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.log("updateProject-error", error);
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  const { projectID } = req.params;
  if (!mongoose.Types.ObjectId.isValid(projectID)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid project ID format",
    });
  }
  if (!req.params.projectID) {
    return res.status(400).json({
      status: "error",
      message: "Please provide project ID parameter",
    });
  }
  try {
    const findProject = await projectModel
      .findOne({
        createdBy: req.user._id,
        _id: projectID,
      })
      .populate("tasks");
    if (!findProject) {
      return res.status(400).json({
        status: "error",
        message:
          "Couldn't find project with given ID or you don't have permission to delete this project",
      });
    }
    if (req?.body?.owner) delete req?.body?.owner;

    await taskModel.deleteMany({ _id: { $in: findProject.tasks } });
    await projectModel.findByIdAndDelete(findProject._id);
    if (findProject.projectType === "personal") {
      await userModel.findByIdAndUpdate(req.user._id, {
        $pull: { projects: findProject._id },
      });
    } else {
      await teamModel.findOneAndUpdate(
        { ownedBy: req.user._id },
        {
          $pull: { projects: findProject._id },
        }
      );
    }

    res.status(200).json({
      status: "success",
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log("deleteProject-error", error);
    next(error);
  }
};

const createTask = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }

  const { name, projectID } = req.body;
  if (!mongoose.Types.ObjectId.isValid(projectID)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid project ID format",
    });
  }

  try {
    const project = await projectModel.findById(projectID);
    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Couldn't find project to add this task to.",
      });
    }

    const owner = project.createdBy.equals(req.user._id);

    if (!owner) {
      return res.status(403).json({
        status: "error",
        message:
          "Only project owner are allowed to create task on this project",
      });
    }
    const taskAlreadyExists = await taskModel.findOne({
      project: project._id,
      name,
    });
    if (taskAlreadyExists) {
      return res.status(403).json({
        status: "error",
        message: "You already have a task with that name in this project.",
      });
    }

    delete req.body.cantUpdate;

    const task = await taskModel.create({
      ...req.body,
      project: project._id,
      assignedTo: req.user._id,
    });
    await projectModel.findByIdAndUpdate(project._id, {
      $push: { tasks: task._id },
    });
    const updatedProject = await projectModel
      .findById(project._id)
      .populate("tasks");

    if (updatedProject.progress > 0) {
      const totalTasks = updatedProject.tasks.length;
      const completedTasks = updatedProject.tasks.filter(
        (t) => t.status === "done"
      ).length;
      const newProgress = (completedTasks / totalTasks) * 100;

      await projectModel.findByIdAndUpdate(project._id, {
        progress: newProgress,
        status: "pending",
      });
    }
    await sendTaskCreatedMail(task, updatedProject, req.user);
    res.status(201).json({
      status: "success",
      message: "Task created successfully, you can managing your tasks.",
      task,
    });
  } catch (error) {
    console.log("create-task-error", error);
    next(error);
  }
};

const checkTaskNameExist = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  const { projectID, taskName } = req.query;

  if (!taskName) {
    return res.status(400).json({
      status: "error",
      message: "Please provide task name parameter",
    });
  }
  if (!mongoose.Types.ObjectId.isValid(projectID)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid project ID format",
    });
  }

  try {
    const project = await projectModel.findById(projectID);
    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }
    const decodedName = decodeURIComponent(taskName.trim());
    const existingTask = await taskModel.findOne({
      project: projectID,
      name: decodedName,
    });
    if (existingTask) {
      return res.status(400).json({
        status: "error",
        message: "A task with this name already exists in this project",
      });
    }
    res.status(200).json({
      status: "success",
      message: `Task name '${decodedName}' is available for use.`,
    });
  } catch (error) {
    console.log("checkTaskNameExist-error", error);
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "Please provide at least one field to update",
    });
  }
  const { taskID } = req.params;
  if (!taskID) {
    return res.status(400).json({
      status: "error",
      message: "Please provide task ID parameter",
    });
  }
  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid task ID format",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(req.body.projectID)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid project ID format",
    });
  }

  try {
    const project = await projectModel
      .findById(req.body.projectID)
      .populate(["createdBy", "tasks"]);
    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Invalid project ID, please provide a valid project ID.",
      });
    }
    const findTask = await taskModel.findOne({
      project: req.body.projectID,
      _id: taskID,
    });
    if (!findTask) {
      return res.status(400).json({
        status: "error",
        message: "Invalid details, please provide a valid task or project ID.",
      });
    }
    const isOwner = project.createdBy._id.equals(req.user._id);
    const isAssigned = findTask.assignedTo.equals(req.user._id);

    if (!isOwner && !isAssigned) {
      return res.status(403).json({
        status: "error",
        message: "You don't have permission to update this task.",
      });
    }
    if (findTask.cantUpdate) {
      return res.status(403).json({
        status: "error",
        message:
          "Seems you have completed this task, which means you can't make any changes again.",
      });
    }

    if (isAssigned && !isOwner) {
      const allowed = ["status", "description"];
      const invalidFields = Object.keys(req.body).filter(
        (key) => !allowed.includes(key)
      );
      if (invalidFields.length > 0) {
        return res.status(403).json({
          status: "error",
          message: `You cannot update the following fields: ${invalidFields.join(
            ", "
          )}`,
        });
      }
    }

    if (req.body.project) delete req.body.project;
    if (req.body.assignedTo) delete req.body.assignedTo;

    if (req?.body?.status && req?.body?.status === "done") {
      const updatedTask = await taskModel.findByIdAndUpdate(
        findTask._id,
        { status: "done", cantUpdate: true },
        { new: true }
      );

      const freshProject = await projectModel
        .findById(project._id)
        .populate(["tasks", "createdBy"]);

      const tasks = freshProject.tasks;
      const completed = tasks.filter((t) => t.status === "done").length;
      const progress = (completed / tasks.length) * 100;

      const updateBody =
        progress === 100
          ? { progress, status: "completed" }
          : { progress, status: "pending" };

      await projectModel.findByIdAndUpdate(freshProject._id, {
        $set: updateBody,
      });
      await sendTaskCompletedMail(updatedTask, freshProject, req.user);

      return res.status(200).json({
        status: "success",
        message:
          "Task completed successfully, you can't make any update after this",
        task: updatedTask,
      });
    }
    const updatedTask = await taskModel.findByIdAndUpdate(
      findTask._id,
      req.body,
      { new: true }
    );
    const newProject = await projectModel
      .findById(project._id)
      .populate("createdBy");
    await sendTaskUpdatedMail(updateTask, newProject, req.user);
    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.log("updateTask-error", error);
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  const { taskID, projectID } = req.query;

  if (!taskID || !projectID) {
    return res.status(400).json({
      status: "error",
      message: "Please provide both taskID and projectID query",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid task ID format",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(projectID)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid project ID format",
    });
  }

  try {
    const project = await projectModel
      .findById(projectID)
      .populate("createdBy");

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    const isOwner = project.createdBy._id.equals(req.user._id);
    if (!isOwner) {
      return res.status(403).json({
        status: "error",
        message: "You don't have permission to delete this task.",
      });
    }

    const findTask = await taskModel.findOne({
      project: projectID,
      _id: taskID,
    });
    if (!findTask) {
      return res.status(400).json({
        status: "error",
        message: "Invalid task ID, please provide a valid task ID.",
      });
    }

    await taskModel.findByIdAndDelete(findTask._id);
    await projectModel.findByIdAndUpdate(projectID, {
      $pull: { tasks: findTask._id },
    });

    const projectAfterDelete = await projectModel
      .findById(projectID)
      .populate("tasks");
    if (projectAfterDelete.tasks.length > 0) {
      let completedTasks = projectAfterDelete.tasks.filter(
        (task) => task.status === "done"
      );
      let progress =
        (completedTasks.length / projectAfterDelete.tasks.length) * 100;
      const updateBody =
        progress === 100
          ? { progress: progress, status: "completed" }
          : { progress: progress, status: "pending" };
      await projectModel.findByIdAndUpdate(projectID, { $set: updateBody });
    } else {
      await projectModel.findByIdAndUpdate(projectID, {
        progress: 0,
        status: "pending",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log("deleteTask-error", error);
    next(error);
  }
};

const findAssignedTasks = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  try {
    const assignedTasks = await taskModel.find({ assignedTo: req.user._id });
    return res.status(200).json({
      status: "success",
      message:
        assignedTasks.length > 0
          ? "Assigned tasks found"
          : "No assigned tasks found",
      tasks: assignedTasks,
    });
  } catch (error) {
    console.log("findAssignedTasks-error", error);
    next(error);
  }
};

const createTeam = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }
  try {
    const hasTeam = await userModel.findById(req.user._id);
    if (hasTeam.ownerOf) {
      return res.status(403).json({
        status: "error",
        message: "You can't have more than one team",
      });
    }
    const newTeam = await teamModel.create({
      ...req.body,
      ownedBy: req.user._id,
    });
    if (!newTeam) {
      return res.status(400).json({
        status: "error",
        message: "Could'nt create team, Please try again.",
      });
    }
    await userModel.findByIdAndUpdate(req.user._id, { ownerOf: newTeam._id });
    res.status(201).json({
      status: "success",
      message: "Team created succesfully, you can start adding members",
      team: newTeam,
    });
  } catch (error) {
    console.log("Error while creating team", error);
    next(error);
  }
};

const findMyTeam = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  try {
    const myTeam = await teamModel.findById(req.user.ownerOf);
    if (!myTeam) {
      return res.status(200).json({
        status: "success",
        message: "Couldn't find any team owned by you",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Team found successfully",
      team: myTeam,
    });
  } catch (error) {
    console.log("Error while finding user team", error);
    next(error);
  }
};

const updateTeam = async (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }
  if (req.body.ownedBy) delete req.body.ownedBy;
  if (req.body.members) delete req.body.members;
  if (req.body.projects) delete req.body.projects;
  try {
    const updatedInfo = await teamModel.findByIdAndUpdate(
      req.user.ownerOf,
      req.body
    );
    if (!updatedInfo) {
      return res.status(400).json({
        status: "error",
        message: "Failed to update team info, Please try again.",
      });
    }
    res
      .status(200)
      .json({ status: "success", message: "Team info updated successfully" });
  } catch (error) {
    console.log("Error while updating team info", error);
    next(error);
  }
};

module.exports = {
  viewProfile,
  updatePassword,
  updateProfile,
  createProject,
  checkProjectNameExist,
  updateProject,
  deleteProject,
  createTask,
  checkTaskNameExist,
  updateTask,
  deleteTask,
  findAssignedTasks,
  createTeam,
  findMyTeam,
  updateTeam,
};
