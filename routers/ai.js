const express = require("express");
const { createTaskOption } = require("../controller/ai");
const aiRouter = express.Router();

aiRouter.post("/task-options", createTaskOption);

module.exports = aiRouter;
