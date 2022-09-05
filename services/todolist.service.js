const { Comment, Todo, User, ChallengedTodo, Follow } = require("../models");

class TodoListService {
  // todo 피드 조회 [GET] /api/todolists
  todoListsGet = async (user, mbti, filter) => {
    let userInfo = "";
    if (!user) {
      userInfo = [];
      userInfo.ChallengedTodos = [];
    } else {
      userInfo = await User.findOne({
        where: { userId: user.userId },
        include: [ChallengedTodo],
      });
    }

    // 전체조회 (최신 순)
    if (!mbti && !filter) {
      const todos = await Todo.findAll({
        where: { isTodo: true },
        order: [["createdAt", "DESC"]],
        limit: 20,
      });

      return todos.map((t) => {
        return {
          todoId: t.todoId,
          todo: t.todo,
          mbti: t.mbti,
          userId: t.userId,
          nickname: t.nickname,
          isChallenged:
            userInfo.ChallengedTodos.findIndex(
              (c) => c.challengedTodo === todoId
            ) !== -1
              ? true
              : false,
          commentCounts: t.commentCounts,
          challengedCounts: t.challengedCounts,
          createdAt: t.createdAt,
          updatedAt: t.updatedAt,
        };
      });
    }

    // mbti별 최신 순
    if (!filter) {
      const todos = await Todo.findAll({
        where: { isTodo: true, mbti },
        order: [["createdAt", "DESC"]],
        limit: 20,
      });

      return todos.map((t) => {
        return {
          todoId: t.todoId,
          todo: t.todo,
          mbti: t.mbti,
          userId: t.userId,
          nickname: t.nickname,
          isChallenged:
            userInfo.ChallengedTodos.findIndex(
              (c) => c.challengedTodo === todoId
            ) !== -1
              ? true
              : false,
          commentCounts: t.commentCounts,
          challengedCounts: t.challengedCounts,
          createdAt: t.createdAt,
          updatedAt: t.updatedAt,
        };
      });
    }

    // 도전 순, 댓글 순
    if (!mbti) {
      // 도전 순
      if (filter === "challengedCounts") {
        const todos = await Todo.findAll({
          where: { isTodo: true },
          order: [
            ["challengedCounts", "DESC"],
            ["createdAt", "DESC"],
          ],
          limit: 20,
        });

        return todos.map((t) => {
          return {
            todoId: t.todoId,
            todo: t.todo,
            mbti: t.mbti,
            userId: t.userId,
            nickname: t.nickname,
            isChallenged:
              userInfo.ChallengedTodos.findIndex(
                (c) => c.challengedTodo === todoId
              ) !== -1
                ? true
                : false,
            commentCounts: t.commentCounts,
            challengedCounts: t.challengedCounts,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
          };
        });
      }
      // 댓글 순
      if (filter === "commentCounts") {
        const todos = await Todo.findAll({
          where: { isTodo: true },
          order: [
            ["commentCounts", "DESC"],
            ["createdAt", "DESC"],
          ],
          limit: 20,
        });

        return todos.map((t) => {
          return {
            todoId: t.todoId,
            todo: t.todo,
            mbti: t.mbti,
            userId: t.userId,
            nickname: t.nickname,
            isChallenged:
              userInfo.ChallengedTodos.findIndex(
                (c) => c.challengedTodo === todoId
              ) !== -1
                ? true
                : false,
            commentCounts: t.commentCounts,
            challengedCounts: t.challengedCounts,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
          };
        });
      }
    }

    // mbti별 도전 순 / 댓글 순
    if (mbti && filter) {
      // 도전 순
      if (filter === "challengedCounts") {
        const todos = await Todo.findAll({
          where: { isTodo: true, mbti },
          order: [
            ["challengedCounts", "DESC"],
            ["createdAt", "DESC"],
          ],
          limit: 20,
        });

        return todos.map((t) => {
          return {
            todoId: t.todoId,
            todo: t.todo,
            mbti: t.mbti,
            userId: t.userId,
            nickname: t.nickname,
            isChallenged:
              userInfo.ChallengedTodos.findIndex(
                (c) => c.challengedTodo === todoId
              ) !== -1
                ? true
                : false,
            commentCounts: t.commentCounts,
            challengedCounts: t.challengedCounts,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
          };
        });
      }
      // 댓글 순
      if (filter === "commentCounts") {
        const todos = await Todo.findAll({
          where: { isTodo: true, mbti },
          order: [
            ["commentCounts", "DESC"],
            ["createdAt", "DESC"],
          ],
          limit: 20,
        });

        return todos.map((t) => {
          return {
            todoId: t.todoId,
            todo: t.todo,
            mbti: t.mbti,
            userId: t.userId,
            nickname: t.nickname,
            isChallenged:
              userInfo.ChallengedTodos.findIndex(
                (c) => c.challengedTodo === todoId
              ) !== -1
                ? true
                : false,
            commentCounts: t.commentCounts,
            challengedCounts: t.challengedCounts,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
          };
        });
      }
    }
  };

  // 상세 todo 조회 [GET] /api/todolists/:todoId
  todoGet = async (user, todoId) => {
    let userInfo = "";
    let myfollowing = [];
    if (!user) {
      userInfo = [];
      userInfo.ChallengedTodos = [];
      myfollowing = [];
    } else {
      userInfo = await User.findOne({
        where: { userId: user.userId },
        include: [ChallengedTodo],
      });
      myfollowing = await Follow.findAll({
        where: { userIdFollower: user.userId },
      });
    }

    const todoInfo = await Todo.findOne({
      where: { todoId },
      include: [{ model: Comment }],
    });

    if (!todoInfo.isTodo) {
      throw new Error("이미 삭제된 Todo입니다.");
    }

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
          (c) => c.challengedTodo === todoId
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
}

module.exports = TodoListService;
