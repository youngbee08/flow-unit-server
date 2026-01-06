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
  createTeam,
  findMyTeam,
  updateTeam,
  inviteToTeam,
  acceptInvitation,
  declineInvitation,
  assignTask,
  deleteAccount,
  findUser,
  getSingleProject,
  findProjects,
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
userRouter.get("/project/:projectID", isLoggedIn, getSingleProject);
userRouter.get("/validateTaskName", isLoggedIn, checkTaskNameExist);
userRouter.patch("/updateProject/:projectID", isLoggedIn, updateProject);
userRouter.patch("/updateTask/:taskID", isLoggedIn, updateTask);
userRouter.delete("/deleteProject/:projectID", isLoggedIn, deleteProject);
userRouter.delete("/deleteTask", isLoggedIn, deleteTask);
userRouter.get("/findAssignedTasks", isLoggedIn, findAssignedTasks);
userRouter.post("/createTeam", isLoggedIn, createTeam);
userRouter.get("/myTeam", isLoggedIn, findMyTeam);
userRouter.get("/myProjects", isLoggedIn, findProjects);
userRouter.patch("/updateTeamInfo", isLoggedIn, updateTeam);
userRouter.get("/findUser/:userName", isLoggedIn, findUser);
userRouter.post("/inviteToTeam/:userID", isLoggedIn, inviteToTeam);
userRouter.post(
  "/acceptInvitation/:teamID/:token",
  isLoggedIn,
  acceptInvitation
);
userRouter.post("/declineInvitation/:token", isLoggedIn, declineInvitation);
userRouter.post("/assignTask", isLoggedIn, assignTask);
userRouter.delete("/deleteAccount", isLoggedIn, deleteAccount);

module.exports = userRouter;
