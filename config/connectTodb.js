const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoUri = process.env.MONGO_URI;

const connectTodb = async () => {
  const isConnected = await mongoose.connect(mongoUri);
  if (isConnected) {
    console.log("Server connected to database");
  } else {
    console.log("Server failed to connect to database");
  }
};

module.exports = connectTodb;
