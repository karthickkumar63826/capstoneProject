const express = require("express");
const {
  createPost,
  editPost,
  deletePost,
  getAllPosts,
  getPost,
  getCategoryPost,
  getAuthorPost,
} = require("../Controllers/postController");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPost);
router.get("/users/:id", getAuthorPost);
router.get("/categories/:category", getCategoryPost);
router.patch("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
