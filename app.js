const express = require("express");

const app = express();

// route
app.get("/", (req,res) =>{
    res.send("Hello World!")
});

module.exports = app;
