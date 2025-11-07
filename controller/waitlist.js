const Waitlist = require("../models/waitlist");
const { sendWaitlistMail } = require("../utils/nodemailer/mailer");

const joinWaitList = async (req, res, next) => {
  if (!req?.body?.email) {
    return res.status(400).json({
      status: "error",
      message: "Email is required",
    });
  }
  try {
    const { email } = req.body;
    const userOnWaitlist = await Waitlist.create({ email });
    await sendWaitlistMail(userOnWaitlist);
    return res.status(201).json({
      status: "success",
      message: "🎉 You’ve been added to the waitlist successfully!",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        status: "error",
        message: "You're already on the waitlist 😊",
      });
    }

    console.error(error);
    next(error);
  }
};

const getWaitlistUsers = async (req, res, next) => {
  if (!req?.query?.auth) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }
  try {
    const { auth } = req.query;
    if (auth !== "me@$YoungbeE") {
      return res.status(400).json({
        status: "error",
        message: "Oops!, you are not allowed to make request in this endpoint",
      });
    }

    const waitlistUsers = await Waitlist.find();
    if (!waitlistUsers) {
      return res.status(204).json({
        status: "success",
        message: "Seems there no users on waitlist",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Waitlist users found successfully",
      waitlistUsers,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { joinWaitList, getWaitlistUsers };
