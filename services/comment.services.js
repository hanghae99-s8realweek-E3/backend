const { Comment, Todo, User, MyTodo } = require("../models");

class CommentService {
  // 댓글 작성 [POST] /api/comments/:todoId
  createComment = async (user, todoId, comment) => {
    await Comment.create({
      userId: user.userId,
      nickname: user.nickname,
      todoId,
      comment,
    });

    const todo = await Todo.findOne({
      where: { todoId },
      include: [{ model: Comment }],
    });
    if (todo.isTodo === false) {
      throw new Error("이미 삭제된 todo입니다.");
    }

    const userinfo = await User.findOne({
      where: { userId: user.userId },
      include: [Follow, MyTodo],
    });

    const challengedTodos = await MyTodo.findAll({
      where: { challengedTodo: todoId },
    });

    return {
      todoId,
      userId: todo.userId,
      isFollow: userinfo.Follows,
      todo: todo.todo,
      mbti: todo.mbti,
      nickname: todo.nickname,
      commentCounts: todo.Comments.length,
      challengedCounts: challengedTodos.length,
      isChallenged:
        userinfo.MyTodos.findIndex((todo) => todo.challengedTodo === todoId) !==
        -1
          ? true
          : false,
      comment: todo.Comments.map((c) => {
        return {
          commentId: c.commentId,
          userId: c.userId,
          comment: c.comment,
          nickname: c.nickname,
          isComment: c.userId === user.userId ? true : false,
        };
      }),
    };
  };

  // 댓글 삭제 [DELETE] /api/comments/:commentId
  deleteComment = async (user, commentId) => {
    const comment = await Comment.findOne({ where: { commentId } });
    if (!comment) {
      throw new Error("댓글이 존재하지 않습니다.");
    }
    if (user.userId !== comment.userId) {
      throw new Error("본인 댓글만 삭제 가능합니다.");
    }

    return await Comment.destroy({ where: { commentId } });
  };
}

module.exports = CommentService;
