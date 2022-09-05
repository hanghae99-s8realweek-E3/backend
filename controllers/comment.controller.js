const CommentService = require("../services/comment.service");

class CommentController {
  commentService = new CommentService();

  // 댓글 작성 [POST] /api/comments/:todoId
  createComment = async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { todoId } = req.params;
      const { comment } = req.body;

      const createComment = await this.commentService.createComment(
        user,
        todoId,
        comment
      );

      res.status(200).json({ message: "success", data: createComment });
    } catch (err) {
      next(err);
    }
  };

  // 댓글 삭제 [DELETE] /api/comments/:commentId
  deleteComment = async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { commentId } = req.params;

      await this.commentService.deleteComment(user, commentId);

      res.status(200).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = CommentController;
