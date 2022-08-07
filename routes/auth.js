const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");

const User = require("../models/user");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Email must be valid")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("E-mail already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }).withMessage("Password too short"),
    body("name").trim().isLength({ min: 3 }).withMessage("Name too short"),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
