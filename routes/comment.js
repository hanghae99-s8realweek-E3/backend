const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth_middlewares");
const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();

// 댓글 작성
router.post("/:todoId", authMiddleware, commentController.createComment);
// 댓글 삭제
router.delete("/:commentId", authMiddleware, commentController.deleteComment);

module.exports = router;
