const {
  Comment,
  Todo,
  User,
  ChallengedTodo,
  Follow,
  Mbti,
} = require("../models");
const Boom = require("@hapi/boom");
const { Op } = require("sequelize");

class TodoListService {
  // todo 피드 조회 [GET] /api/todolists
  todoListsGet = async (userId, mbti, filter) => {
    const result = (todos) =>
      todos.map((t) => {
        return {
          todoId: t.todoId,
          todo: t.todo,
          mbti: t.mbti,
          userId: t.userId,
          nickname: t.nickname,
          commentCounts: t.commentCounts,
          challengedCounts: t.challengedCounts,
          createdAt: t.createdAt,
          updatedAt: t.updatedAt,
          isChallenged:
            t.ChallengedTodos.findIndex((c) => c.userId === userId) !== -1
              ? true
              : false,
        };
      });

    // 전체조회 (최신 순)
    if (!mbti && !filter) {
      const todos = await Todo.findAll({
        where: { isTodo: true },
        include: [ChallengedTodo],
        order: [["createdAt", "DESC"]],
        limit: 20,
      });

      return result(todos);
    }

    // mbti별 최신 순
    if (!filter) {
      const todos = await Todo.findAll({
        where: { isTodo: true, mbti },
        include: [ChallengedTodo],
        order: [["createdAt", "DESC"]],
        limit: 20,
      });

      return result(todos);
    }

    // 도전 순, 댓글 순
    if (!mbti) {
      // 도전 순
      if (filter === "challengedCounts") {
        const todos = await Todo.findAll({
          where: { isTodo: true },
          include: [ChallengedTodo],
          order: [
            ["challengedCounts", "DESC"],
            ["createdAt", "DESC"],
          ],
          limit: 20,
        });

        return result(todos);
      }
      // 댓글 순
      if (filter === "commentCounts") {
        const todos = await Todo.findAll({
          where: { isTodo: true },
          include: [ChallengedTodo],
          order: [
            ["commentCounts", "DESC"],
            ["createdAt", "DESC"],
          ],
          limit: 20,
        });

        return result(todos);
      }
    }

    // mbti별 도전 순 / 댓글 순
    if (mbti && filter) {
      // 도전 순
      if (filter === "challengedCounts") {
        const todos = await Todo.findAll({
          where: { isTodo: true, mbti },
          include: [ChallengedTodo],
          order: [
            ["challengedCounts", "DESC"],
            ["createdAt", "DESC"],
          ],
          limit: 20,
        });

        return result(todos);
      }
      // 댓글 순
      if (filter === "commentCounts") {
        const todos = await Todo.findAll({
          where: { isTodo: true, mbti },
          include: [ChallengedTodo],
          order: [
            ["commentCounts", "DESC"],
            ["createdAt", "DESC"],
          ],
          limit: 20,
        });

        return result(todos);
      }
    }
  };

  // 상세 todo 조회 [GET] /api/todolists/:todoId
  todoGet = async (userId, todoId) => {
    const todoInfo = await Todo.findOne({
      where: { todoId },
      include: [
        { model: User, attributes: ["nickname", "profile"] },
        { model: Comment },
      ],
    });

    if (!todoInfo) {
      throw Boom.badRequest("존재하지 않는 Todo입니다.");
    }

    if (!todoInfo.isTodo) {
      throw Boom.badRequest("이미 삭제된 Todo입니다.");
    }

    // 도전한 적 있는지 체크
    const challenge = await ChallengedTodo.findOne({
      where: { userId, ChallengedTodo: todoId },
    });

    // 오늘 도전한 todo 있는지 체크
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 (과거의) 자정
    const todayChall = await ChallengedTodo.findOne({
      where: {
        userId,
        createdAt: { [Op.gte]: today },
      },
    });

    // 작성자 팔로우 여부 체크
    const myfollowing = await Follow.findOne({
      where: { userIdFollower: userId, userIdFollowing: todoInfo.userId },
    });

    return {
      todoInfo,
      isFollowed: myfollowing ? true : false,
      isChallenged: challenge ? true : false,
      isTodayDone: todayChall ? true : false,
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
  };
}

module.exports = TodoListService;
