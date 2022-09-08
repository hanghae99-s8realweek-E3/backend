const {
  Comment,
  Todo,
  User,
  ChallengedTodo,
  Follow,
  sequelize,
} = require("../models");
const Boom = require("@hapi/boom");

class CommentService {
  // 댓글 작성 [POST] /api/comments/:todoId
  createComment = async (user, todoId, comment) => {
    const getTodo = await Todo.findOne({ where: { todoId } });
    if (!getTodo) {
      throw Boom.badRequest("존재하지 않는 todo입니다.");
    }
    if (getTodo.isTodo === false) {
      throw Boom.badRequest("이미 삭제된 todo입니다.");
    }

    // 댓글 생성하고 댓글 개수 update하는 과정 트렌젝션 설정
    const t = await sequelize.transaction();
    try {
      await Comment.create(
        {
          userId: user.userId,
          nickname: user.nickname,
          todoId,
          comment,
        },
        { transaction: t }
      );
      await Todo.findOne({
        where: { todoId },
        transaction: t,
      });
      const commentCounts = todoInfo.Comments.length;
      await Todo.update(
        { commentCounts },
        { where: { todoId }, transaction: t }
      );
      await t.commit();
    } catch (err) {
      await t.rollback();
    }

    const todoInfo = await Todo.findOne({
      where: { todoId },
      include: [{ model: Comment }],
    });
    const userInfo = await User.findOne({
      where: { userId: user.userId },
      include: [{ model: ChallengedTodo }],
    });
    const myfollowing = await Follow.findAll({
      where: { userIdFollower: user.userId },
    });

    return {
      todoId,
      userId: todoInfo.userId,
      isFollowed:
        myfollowing.findIndex((f) => f.userIdFollowing === todoInfo.userId) !==
        -1
          ? true
          : false,
      profile: todoInfo.profile,
      todo: todoInfo.todo,
      mbti: todoInfo.mbti,
      nickname: todoInfo.nickname,
      commentCounts: todoInfo.commentCounts,
      challengedCounts: todoInfo.challengedCounts,
      isChallenged:
        userInfo.ChallengedTodos.findIndex(
          (c) => c.challengedTodo === todoInfo.todoId
        ) !== -1
          ? true
          : false,
      createdAt: todoInfo.createdAt,
      updatedAt: todoInfo.updatedAt,
      comment: todoInfo.Comments.map((c) => {
        return {
          commentId: c.commentId,
          userId: c.userId,
          comment: c.comment,
          nickname: c.nickname,
          isCommented: c.userId === user.userId ? true : false,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        };
      }),
    };
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

    // 삭제하고 commentCounts update하는 거 트렌젝션 걸어서 동시에 성공하게 하기
    await Comment.destroy({ where: { commentId } });

    const todoInfo = await Todo.findOne({
      where: { todoId: comment.todoId },
      include: [{ model: Comment }],
    });

    const commentCounts = todoInfo.Comments.length;
    await Todo.update({ commentCounts }, { where: { todoId: comment.todoId } });
  };
}

module.exports = CommentService;
