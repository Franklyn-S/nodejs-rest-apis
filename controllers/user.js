const User = require("../models/user");

const errorHandler = require("../utils/error");

exports.getUserStatus = (req, res, next) => {
  const { userId } = req;
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json({
        status: user.status,
      });
    })
    .catch(err => errorHandler(err, next, "User not found!"));
};

exports.updateUserStatus = (req, res, next) => {
  const { userId } = req;
  const { status } = req.body;
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 401;
        throw error;
      }
      user.status = status;
      return user.save();
    })
    .then(result => {
      res.status(200).json({
        message: "Status updated successfully!",
        status: result.status,
        userId: result._id,
      });
    })
    .catch(err => errorHandler(err, next, "User not found!"));
};
