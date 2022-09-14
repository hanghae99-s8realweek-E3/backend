const CommentService = require("../services/comment.service");
const Joi = require("./joi");

class CommentController {
  commentService = new CommentService();
  joi = new Joi();

  // 댓글 작성 [POST] /api/comments/:todoId
  createComment = async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { todoId } = req.params;
      const { comment } = await this.joi.createCommentSchema.validateAsync(
        req.body
      );

      await this.commentService.createComment(user, todoId, comment);

      res.status(200).json({ message: "success" });
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
