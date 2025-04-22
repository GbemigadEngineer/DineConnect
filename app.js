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
// app.get("/", (req, res) => {
//   res.status(200).send("Hello World!");
// });

module.exports = app;
