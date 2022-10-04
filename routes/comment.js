const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();
const authMiddleware = require("../middlewares/authMiddlewares");
const { wrapAsyncController } = require("../middlewares/errorHandler");

// 댓글 작성 [POST] /api/comments/:todoId
router.post("/:todoId", authMiddleware, wrapAsyncController(commentController.createComment));
// 댓글 삭제 [DELETE] /api/comments/:commentId
router.delete("/:commentId", authMiddleware, wrapAsyncController(commentController.deleteComment));

module.exports = router;
