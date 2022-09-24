const { Todo, ChallengedTodo, Follow, Mbti, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const Boom = require("@hapi/boom");

class TodoListService {
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
  todoGet = async (userId, todoId) => {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      throw Boom.badRequest("존재하지 않거나 삭제된 Todo입니다.");
    }

    // 오늘 (과거의) 자정 시간 세팅
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todoInfo, comments, ischallenged, todaysChallenge, isFollowed] =
      await Promise.all([
        sequelize.query(
          `SELECT *, 
          (SELECT nickname FROM users WHERE users.userId = todos.userId) AS nickname, 
          (SELECT profile FROM users WHERE users.userId = todos.userId) AS profile
          FROM todos
          WHERE todoId = $todoId`,
          { bind: { todoId } },
          {
            type: QueryTypes.SELECT,
          }
        ),
        sequelize.query(
          `SELECT *, 
          (SELECT nickname FROM users WHERE users.userId = comments.userId) AS nickname, 
          (SELECT profile FROM users WHERE users.userId = comments.userId) AS profile
          FROM comments
          WHERE todoId = $todoId`,
          { bind: { todoId } },
          {
            type: QueryTypes.SELECT,
          }
        ),
        ChallengedTodo.findOne({
          where: { userId, originTodoId: todoId },
        }),
        ChallengedTodo.findOne({
          where: {
            userId,
            createdAt: { [Op.gte]: today },
          },
        }),
        Follow.findOne({
          where: { userIdFollower: userId, userIdFollowing: todo.userId },
        }),
      ]);

    if (!todo) {
      throw Boom.badRequest("존재하지 않거나 삭제된 Todo입니다.");
    }
    return todoInfo, comments;

    // return {
    //   todoInfo: todoInfo[0],
    //   comments: comments.map((comment) => {
    //       return {
    //         commentId: comment.commentId,
    //         comment: comment.comment,
    //         userId: comment.userId ? comment.userId : "none",
    //         nickname: comment.nickname ? comment.nickname : "(알수없음)",
    //         profile: comment.profile ? comment.profile : "none",
    //         createdAt: comment.createdAt,
    //         updatedAt: comment.updatedAt,
    //       };
    //   }),
    //   isChallenged: ischallenged ? true : false,
    //   isTodayDone: todaysChallenge ? true : false,
    //   isFollowed: isFollowed ? true : false,
    // };
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
    // 어제 날짜 - 자정으로 세팅
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

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
