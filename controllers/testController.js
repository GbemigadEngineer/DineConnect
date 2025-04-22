const testUserController = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Test Successfull!",
    });
  } catch (err) {
    console.log("error in test API", err);
    res.status(500).json({ message: "Internal Server Error or test failure!" });
  }
};

module.exports = {
  testUserController,
};
