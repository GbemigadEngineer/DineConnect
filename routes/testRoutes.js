const express = require("express");
const { testUserController } = require("../controllers/testController");

// router Object

const router = express.Router();

// routes

router.get("/test-user", testUserController);

// export router
module.exports = router;
