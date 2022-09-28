const { Todo, ChallengedTodo, Follow, Mbti, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const date = require("../utils/date");
const Boom = require("@hapi/boom");
const Query = require("../utils/query");
class TodoListService {
  query = new Query();

  // todo 피드 조회 [GET] /api/todolists
  todoListsGet = async (userId, mbti, filter) => {
    const myChallengedTodos = await ChallengedTodo.findAll({
      where: { userId },
    });
    const result = (todos, myChallengedTodos) =>
      todos.map((todo) => {
        return {
          todoInfo: todo,
          isChallenged:
            myChallengedTodos.findIndex(
              (myChallengedTodo) =>
                myChallengedTodo.originTodoId === todo.todoId &&
                myChallengedTodo.isCompleted === true
            ) !== -1
              ? true
              : false,
        };
      });

    // 전체조회 (최신 순)
    if (!mbti && !filter) {
      const todos = await Todo.findAll({
        order: [["createdAt", "DESC"]],
      });

      return result(todos, myChallengedTodos);
    }

    // mbti별 최신 순
    if (!filter) {
      const todos = await Todo.findAll({
        where: { mbti },
        order: [["createdAt", "DESC"]],
      });

      return result(todos, myChallengedTodos);
    }

    // 도전 순, 댓글 순
    if (!mbti) {
      // 도전 순
      if (filter === "challengedCounts") {
        const todos = await Todo.findAll({
          order: [
            ["challengedCounts", "DESC"],
            ["createdAt", "DESC"],
          ],
        });

        return result(todos, myChallengedTodos);
      }
      // 댓글 순
      if (filter === "commentCounts") {
        const todos = await Todo.findAll({
          order: [
            ["commentCounts", "DESC"],
            ["createdAt", "DESC"],
          ],
        });

        return result(todos, myChallengedTodos);
      }
    }

    // mbti별 도전 순 / 댓글 순
    if (mbti && filter) {
      // 도전 순
      if (filter === "challengedCounts") {
        const todos = await Todo.findAll({
          where: { mbti },
          order: [
            ["challengedCounts", "DESC"],
            ["createdAt", "DESC"],
          ],
        });

        return result(todos, myChallengedTodos);
      }
      // 댓글 순
      if (filter === "commentCounts") {
        const todos = await Todo.findAll({
          where: { mbti },
          order: [
            ["commentCounts", "DESC"],
            ["createdAt", "DESC"],
          ],
        });

        return result(todos, myChallengedTodos);
      }
    }
  };

  // 상세 todo 조회 [GET] /api/todolists/:todoId
  todoGet = async (user, todoId) => {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      throw Boom.badRequest("존재하지 않거나 삭제된 Todo입니다.");
    }

    const today = date.calculateToday();

    const [todoInfo, comments, todaysChallenge, isFollowed] = await Promise.all(
      [
        sequelize.query(this.query.getTodoQuery, {
          bind: { todoId },
          type: QueryTypes.SELECT,
        }),
        sequelize.query(this.query.getCommentsQuery, {
          bind: { todoId },
          type: QueryTypes.SELECT,
        }),
        ChallengedTodo.findOne({
          where: {
            userId: user.userId,
            date: today,
          },
        }),
        Follow.findOne({
          where: { userIdFollower: user.userId, userIdFollowing: todo.userId },
        }),
      ]
    );

    return {
      todoInfo: todoInfo[0],
      comments,
      isTodayDone: todaysChallenge ? true : false,
      isFollowed: isFollowed ? true : false,
      loginUserProfile: user.profile,
    };
  };

  // mbti 알고리즘 [GET] /api/todolists/mbti/:mbti
  mbtiGet = async (user) => {
    if (user.userId === "none") {
      return {
        mbti: null,
      };
    }
    return await Mbti.findOne({
      where: { mbti: user.mbti },
      attributes: { exclude: ["mbtiId"] },
    });
  };

  // 현재 인기있는 피드 top5 [GET] /api/todolists/ranking
  rankingGet = async () => {
    const yesterday = date.calculateYesterdayMidnight();

    const challengeRanking = await Todo.findAll({
      where: {
        createdAt: { [Op.gte]: yesterday },
      },
      order: [
        ["challengedCounts", "DESC"],
        ["createdAt", "DESC"],
      ],
      limit: 5,
    });

    const commentRanking = await Todo.findAll({
      where: {
        createdAt: { [Op.gte]: yesterday },
      },
      order: [
        ["commentCounts", "DESC"],
        ["createdAt", "DESC"],
      ],
      limit: 5,
    });

    return { challenge: challengeRanking, comment: commentRanking };
  };
}

module.exports = TodoListService;
