const CommentService = require("../services/comment.service");
const Joi = require("../utils/joi");

class CommentController {
  commentService = new CommentService();
  joi = new Joi();

  // 댓글 작성 [POST] /api/comments/:todoId
  createComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { todoId } = await this.joi.parameterSchema.validateAsync(req.params);
    const { comment } = await this.joi.createCommentSchema.validateAsync(
      req.body
    );

    await this.commentService.createComment(userId, todoId, comment);

    res.status(200).json({ message: "success" });
  };

  // 댓글 삭제 [DELETE] /api/comments/:commentId
  deleteComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { commentId } = await this.joi.parameterSchema.validateAsync(
      req.params
    );

    await this.commentService.deleteComment(userId, commentId);

    res.status(200).json({ message: "success" });
  };
}

module.exports = CommentController;
