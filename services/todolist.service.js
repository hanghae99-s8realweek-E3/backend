const {
  Comment,
  Todo,
  User,
  ChallengedTodo,
  Follow,
  Mbti,
} = require("../models");
const Boom = require("@hapi/boom");

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
        include: [{ model: ChallengedTodo }],
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
              (c) => c.challengedTodo === t.todoId
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
              (c) => c.challengedTodo === t.todoId
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
                (c) => c.challengedTodo === t.todoId
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
                (c) => c.challengedTodo === t.todoId
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
                (c) => c.challengedTodo === t.todoId
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
                (c) => c.challengedTodo === t.todoId
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
        include: [{ model: ChallengedTodo }],
      });
      myfollowing = await Follow.findAll({
        where: { userIdFollower: user.userId },
      });
    }

    const todoInfo = await Todo.findOne({
      where: { todoId },
      include: [{ model: Comment }],
    });

    if (!todoInfo) {
      throw Boom.badRequest("존재하지 않는 Todo입니다.");
    }

    if (!todoInfo.isTodo) {
      throw Boom.badRequest("이미 삭제된 Todo입니다.");
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

  // mbti 알고리즘 [GET] /api/todolists/mbti/:mbti
  mbtiGet = async (user) => {
    if (!user) {
      return {
        mbti: null,
      };
    }
    return await Mbti.findOne({
      where: { mbti: user.mbti },
      attributes: { exclude: ["mbtiId"] },
    });

    // 비 회원 응답값 이걸로 변경 될 수 있음
    // return {
    //   mbti: null,
    //   INFP: null,
    //   ENFP: null,
    //   INFJ: null,
    //   ENFJ: null,
    //   INTJ: null,
    //   ENTJ: null,
    //   INTP: null,
    //   ENTP: null,
    //   ISFP: null,
    //   ESFP: null,
    //   ISTP: null,
    //   ESTP: null,
    //   ISFJ: null,
    //   ESFJ: null,
    //   ISTJ: null,
    //   ESTJ: null,
    // };
  };
}

module.exports = TodoListService;
