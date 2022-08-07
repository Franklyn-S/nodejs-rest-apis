const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

const MIN_TITLE = 5;
const MIN_CONTENT = 5;

const router = express.Router();

// GET /feed/posts
router.get("/posts", isAuth, feedController.getPosts);

// POST /feed/posts
router.post(
  "/posts",
  isAuth,
  [
    body("title")
      .trim()
      .isLength({ min: MIN_TITLE })
      .withMessage(`Title must be at least ${MIN_TITLE} characters`),
    body("content")
      .trim()
      .isLength({ min: MIN_CONTENT })
      .withMessage(`Content must be at least ${MIN_CONTENT} characters`),
  ],
  feedController.createPost
);

router.get("/posts/:postId", isAuth, feedController.getPostById);

router.put(
  "/posts/:postId",
  isAuth,
  [
    body("title")
      .trim()
      .isLength({ min: MIN_TITLE })
      .withMessage(`Title must be at least ${MIN_TITLE} characters`),
    body("content")
      .trim()
      .isLength({ min: MIN_CONTENT })
      .withMessage(`Content must be at least ${MIN_CONTENT} characters`),
  ],
  feedController.updatePost
);

router.delete("/posts/:postId", isAuth, feedController.deletePost);

module.exports = router;
