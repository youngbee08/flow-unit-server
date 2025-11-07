const express = require("express");
const { joinWaitList, getWaitlistUsers } = require("../controller/waitlist");

const waitlistRouter = express.Router();

waitlistRouter.post("/waitlist", joinWaitList)
waitlistRouter.get("/waitlist", getWaitlistUsers);

module.exports = waitlistRouter