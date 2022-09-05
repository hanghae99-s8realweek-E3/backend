const { Comment, Todo, User, ChallengedTodo, Follow } = require("../models");
const Boom = require("@hapi/boom");

class CommentService {
  // 댓글 작성 [POST] /api/comments/:todoId
  createComment = async (user, todoId, comment) => {
    await Comment.create({
      userId: user.userId,
      nickname: user.nickname,
      todoId,
      comment,
    });

    const todoInfo = await Todo.findOne({
      where: { todoId },
      include: [{ model: Comment }],
    });
    if (todoInfo.isTodo === false) {
      throw Boom.badRequest("이미 삭제된 todo입니다.");
    }

    const commentCounts = todoInfo.Comments.length;
    await Todo.update({ commentCounts }, { where: { todoId } });

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
      commentCounts,
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

    return await Comment.destroy({ where: { commentId } });
  };
}

module.exports = CommentService;
