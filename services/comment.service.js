const { Comment, Todo, sequelize } = require("../models");
const Boom = require("@hapi/boom");

class CommentService {
  // 댓글 작성 [POST] /api/comments/:todoId
  createComment = async (user, todoId, comment) => {
    const getTodo = await Todo.findOne({ where: { todoId } });
    if (!getTodo || getTodo.isTodo === false) {
      throw Boom.badRequest("존재하지 않거나 이미 삭제된 todo입니다.");
    }

    // 댓글 생성하고 댓글 개수 update하는 과정 트렌젝션 설정
    const onTransaction = await sequelize.transaction();
    try {
      await Comment.create(
        {
          userId: user.userId,
          nickname: user.nickname,
          todoId,
          comment,
        },
        { transaction: onTransaction }
      );
      const todo = await Todo.findOne({
        where: { todoId },
        include: [{ model: Comment }],
        transaction: onTransaction,
      });

      await Todo.update(
        { commentCounts: todo.Comments.length },
        { where: { todoId }, transaction: onTransaction }
      );
      await onTransaction.commit();
    } catch (err) {
      await onTransaction.rollback();
    }
  };

  // 댓글 삭제 [DELETE] /api/comments/:commentId
  deleteComment = async (user, commentId) => {
    const comment = await Comment.findOne({ where: { commentId } });
    if (!comment) {
      throw Boom.badRequest("댓글이 존재하지 않습니다.");
    }
    if (user.userId !== comment.userId) {
      throw Boom.unauthorized("본인 댓글만 삭제 가능합니다.");
    }

    // 댓글 삭제하고 댓글 개수 update하는 과정 트렌젝션 설정
    const onTransaction = await sequelize.transaction();
    try {
      await Comment.destroy({
        where: { commentId },
        transaction: onTransaction,
      });

      const todo = await Todo.findOne({
        where: { todoId: comment.todoId },
        include: [{ model: Comment }],
        transaction: onTransaction,
      });

      await Todo.update(
        { commentCounts: todo.Comments.length },
        { where: { todoId: comment.todoId }, transaction: onTransaction }
      );
      await onTransaction.commit();
    } catch (err) {
      await onTransaction.rollback();
    }
  };
}

module.exports = CommentService;
