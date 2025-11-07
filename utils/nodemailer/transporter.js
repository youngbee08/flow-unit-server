const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const serverPassword = process.env.SERVER_PASS;
const serverMail = process.env.SERVER_MAIL;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: serverMail,
    pass: serverPassword,
  },
});

transporter.verify((err, success) => {
  if (success) {
    console.log("Server ready to send mail");
  } else {
    console.log(
      `An error occured while trying to set up mail transporter, Error:${err}`
    );
  }
});

module.exports = transporter;
