const User = require("../models/user");

const errorHandler = require("../utils/error");

exports.getUserStatus = async (req, res, next) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({
      status: user.status,
    });
  } catch (err) {
    errorHandler(err, next, "User not found!");
  }
};

exports.updateUserStatus = async (req, res, next) => {
  const { userId } = req;
  const { status } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    user.status = status;
    const result = await user.save();
    res.status(200).json({
      message: "Status updated successfully!",
      status: result.status,
      userId: result._id,
    });
  } catch (err) {
    errorHandler(err, next, "Error updating user status!");
  }
};
