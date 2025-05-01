const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");

// dot env configuration
dotenv.config({ path: "./config.env" });

// DATABASE CONNECTION
connectDB(); // connect  to the database

// Server connection

// port
const port = process.env.PORT || 8080; //short circuting

// listen connect to the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.red.bgBlue);
});



