const express = require("express");
const connectTodb = require("./config/connectTodb");
const dotenv = require("dotenv");
const authRouter = require("./routers/auth");
const errorHandler = require("./middlewares/errorHandler");
const userRouter = require("./routers/user");
dotenv.config();

const server = express();
server.use(express.json());
const serverPort = process.env.SERVER_PORT || 1000;

const startServer = async () => {
  server.listen(serverPort, () => {
    console.log(`Server is running at port:${serverPort}`);
  });
  await connectTodb();
  require("./utils/nodemailer/transporter");
};

startServer();

server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);

server.all("/{*any}", (req, res) => {
  res.status(403).json({
    status: "error",
    message: `${req.method} ${req.originalUrl} is not an endpoint on this server.`,
  });
});

server.use(errorHandler);
