const User = require("../models/User");
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json({ message: "User created Successfully", user });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

exports.loginTestUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.session.userId = user._id;
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
      error: error.message,
    });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    const user = await User.findById(req.session.userId);

    res.json({
      message: "You are logged in",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get user",
      error: error.message,
    });
  }
};
