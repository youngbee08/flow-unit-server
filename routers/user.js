const express = require("express");
const {
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
} = require("../controller/user");
const isLoggedIn = require("../middlewares/IsLoggedIn");
const userRouter = express.Router();

userRouter.get("/me", isLoggedIn, viewProfile);
userRouter.patch("/updatePassword", isLoggedIn, updatePassword);
userRouter.patch("/updateProfile", isLoggedIn, updateProfile);
userRouter.post("/createProject", isLoggedIn, createProject);
userRouter.post("/createTask", isLoggedIn, createTask);
userRouter.get(
  "/validateProjectName/:projectName",
  isLoggedIn,
  checkProjectNameExist
);
userRouter.get(
  "/validateTaskName",
  isLoggedIn,
  checkTaskNameExist
);
userRouter.patch("/updateProject/:projectID", isLoggedIn, updateProject);
userRouter.patch("/updateTask/:taskID", isLoggedIn, updateTask);
userRouter.delete("/deleteProject/:projectID", isLoggedIn, deleteProject);
userRouter.delete("/deleteTask", isLoggedIn, deleteTask);
userRouter.get("/findAssignedTasks", isLoggedIn, findAssignedTasks);

module.exports = userRouter;
