// Description: This file contains the database connection logic for MongoDB.
// It uses the mongoose library to connect to the MongoDB database using the connection string stored in environment variables.
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
