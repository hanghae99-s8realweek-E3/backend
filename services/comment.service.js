const { Comment, Todo, sequelize } = require("../models");
const { Transaction } = require("sequelize");
const Boom = require("@hapi/boom");

class CommentService {
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
      async (transaction) => {
        await Comment.create(
          {
            userId,
            todoId,
            comment,
          },
          { transaction }
        );

        const [commentData] = await Comment.findAll({
          attributes: [
            [sequelize.fn("COUNT", sequelize.col("userId")), "commentCounts"],
          ],
          where: {
            todoId,
          },
          transaction,
        });

        await Todo.update(
          { commentCounts: commentData.dataValues.commentCounts },
          { where: { todoId }, transaction }
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
    // ISOLATION_LEVELS.READ_UNCOMMITTED을 설정하여 sql deadlock 방지
    await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED },
      async (transaction) => {
        await Comment.destroy({
          where: { commentId },
          transaction,
        });

        const [commentData] = await Comment.findAll({
          attributes: [
            [sequelize.fn("COUNT", sequelize.col("userId")), "commentCounts"],
          ],
          where: {
            todoId: comment.todoId,
          },
          transaction,
        });

        await Todo.update(
          { commentCounts: commentData.dataValues.commentCounts },
          { where: { todoId: comment.todoId }, transaction }
        );
      }
    );
  };
}

module.exports = CommentService;
