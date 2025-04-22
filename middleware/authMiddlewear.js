const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Ensure req.body is defined
    req.body = req.body || {};
    // Get token from header
    const authHeader = req.headers["authorization"];

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token not found or malformed",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized User!",
        });
      } else {
        // Attach the decoded user to the request object and call next()
        req.body.id = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.log("Error in authMiddleware:", error);
    res.status(500).json({
      success: false,
      message: "Provide Auth token in the header",
      error: error.message,
    });
  }
};
