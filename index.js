const express = require("express");
const connectTodb = require("./config/connectTodb");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler");
const waitlistRouter = require("./router/waitlist");
const cors = require("cors");
const path = require("path");
dotenv.config();

const server = express();
server.use(express.json());
const allowedOrigin = process.env.CLIENT_DOMAIN;
server.use(
  cors({ origin: allowedOrigin, methods: ["POST", "GET"], credentials: true })
);
server.use(express.static(path.join(__dirname, "public")));
const serverPort = process.env.SERVER_PORT || 1000;

const startServer = async () => {
  server.listen(serverPort, () => {
    console.log(`Server is running at port:${serverPort}`);
  });
  await connectTodb();
  require("./utils/nodemailer/transporter");
};

startServer();

server.use("/api", waitlistRouter);
server.all("/{*any}", (req, res) => {
  res.status(403).json({
    status: "error",
    message: `${req.method} ${req.originalUrl} is not an endpoint on this server.`,
  });
});

server.use(errorHandler);
