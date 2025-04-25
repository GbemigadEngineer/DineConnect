const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));

// // Unhandled routes
// app.all("*", (req, res, next) => {
//   const error = new Error(`Can'f find ${req.originalUrl} on this server!`);
//   error.statusCode = 404;
//   error.status = "fail";
//   next(error);
// });

// // GENERAL ERROR HANDLING MIDDLEWARE
// app.use((error, req, res, next) => {
//   error.statusCode = error.statusCode || 500;
//   error.status = error.status || "error!";
//   res.status(statusCode).json({
//     status: error.status,
//     message: error.message,
//   });
// });

// Export the app
module.exports = app;
