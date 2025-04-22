const mongoose = require("mongoose");
const colors = require("colors");
// mongoDB connection

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log(
      `connected to database succesfully! ${mongoose.connection.host}`.bgCyan
        .white
    );
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`.red.bold);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
