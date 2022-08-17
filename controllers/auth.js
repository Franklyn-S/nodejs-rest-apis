const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const errorHandler = require("../utils/error");
const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.details = errors.array();
    throw error;
  }
  const { email, password, name } = req.body;
  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPw, name });
    const result = await user.save();
    res.status(201).json({ message: "User created successfully!", userId: result._id });
  } catch (err) {
    console.log(err);
    errorHandler(err, next, "Error creating user");
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      { email: loadedUser.email, userId: loadedUser._id.toString() },
      "duiashgabjasbuoqwbjiqeqcaxgasdashhw2321gz",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, userId: loadedUser._id.toString() });
  } catch (err) {
    errorHandler(err, next, "Error logging in");
  }
};
