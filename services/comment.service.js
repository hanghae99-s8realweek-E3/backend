const { Comment, Todo, sequelize } = require("../models");
const { Transaction } = require("sequelize");
const Boom = require("@hapi/boom");
const Query = require("../utils/query");

class CommentService {
  query = new Query();

  // 댓글 작성 [POST] /api/comments/:todoId
  createComment = async (userId, todoId, comment) => {
    const getTodo = await Todo.findOne({ where: { todoId } });
    if (!getTodo) {
      throw Boom.badRequest("존재하지 않거나 이미 삭제된 todo입니다.");
    }

    // 댓글 생성하고 댓글 개수 update하는 과정 트렌젝션 설정
    await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
      },
      async (t) => {
        await Comment.create(
          {
            userId,
            todoId,
            comment,
          },
          { transaction: t }
        );
        const comments = await sequelize.query(
          this.query.getCommentCountsQuery,
          {
            bind: { todoId },
            transaction: t,
            type: sequelize.QueryTypes.SELECT,
          }
        );
        await Todo.update(
          { commentCounts: comments[0].commentCounts },
          { where: { todoId }, transaction: t }
        );
      }
    );
  };

  // 댓글 삭제 [DELETE] /api/comments/:commentId
  deleteComment = async (userId, commentId) => {
    const comment = await Comment.findOne({ where: { commentId } });
    if (!comment) {
      throw Boom.badRequest("댓글이 존재하지 않습니다.");
    }
    if (userId !== comment.userId) {
      throw Boom.unauthorized("본인 댓글만 삭제 가능합니다.");
    }
    // 댓글 삭제하고 댓글 개수 update하는 과정 트렌젝션 설정
    await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.UNCOMMITTED,
      },
      async (t) => {
        await Comment.destroy({
          where: { commentId },
          transaction: t,
        });
        const comments = await sequelize.query(
          this.query.getCommentCountsQuery,
          {
            bind: { todoId: comment.todoId },
            transaction: t,
            type: sequelize.QueryTypes.SELECT,
          }
        );
        await Todo.update(
          { commentCounts: comments[0]?.commentCounts ?? 0 },
          { where: { todoId: comment.todoId }, transaction: t }
        );
      }
    );
  };
}

module.exports = CommentService;
