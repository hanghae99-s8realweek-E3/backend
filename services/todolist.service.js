const { Todo, ChallengedTodo, Follow, Mbti, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const Query = require("../utils/query");
const Boom = require("@hapi/boom");

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
  todoGet = async (userId, todoId) => {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      throw Boom.badRequest("존재하지 않거나 삭제된 Todo입니다.");
    }

    // 오늘 (과거의) 자정 시간 세팅
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log("상세 todo 조회 - 오늘 과거의 자정: ", today);
    const today2 = new Date();
    today2.setHours(today2.getHours() + 9);
    today2.setHours(0, 0, 0, 0);
    console.log("[+9]상세 todo 조회 - 오늘 과거의 자정: ", today2);

    const [todoInfo, comments, ischallenged, todaysChallenge, isFollowed] =
      await Promise.all([
        sequelize.query(this.query.todoInfoQuery(todoId), {
          type: QueryTypes.SELECT,
        }),
        sequelize.query(this.query.commentsQuery(todoId), {
          type: QueryTypes.SELECT,
        }),
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

    return {
      todoInfo: todoInfo[0],
      comments: comments.map((comment) => {
        return {
          commentId: comment.commentId,
          comment: comment.comment,
          userId: comment.userId ? comment.userId : "none",
          nickname: comment.nickname ? comment.nickname : "(알수없음)",
          profile: comment.profile ? comment.profile : "none",
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        };
      }),
      isChallenged: ischallenged ? true : false,
      isTodayDone: todaysChallenge ? true : false,
      isFollowed: isFollowed ? true : false,
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
    // 어제 날짜 - 자정으로 세팅
    const yesterday = new Date();
    yesterday.setHours(yesterday.getHours() + 9);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    console.log("[+9] 메인 top5 - 어제 자정: ", yesterday);
    const yesterday2 = new Date();
    yesterday2.setDate(yesterday2.getDate() - 1);
    yesterday2.setHours(0, 0, 0, 0);
    console.log("메인 top5 - 어제 자정: ", yesterday2);

    const challenge = await Todo.findAll({
      where: {
        createdAt: { [Op.gte]: yesterday },
      },
      order: [
        ["challengedCounts", "DESC"],
        ["createdAt", "DESC"],
      ],
      limit: 5,
    });

    const comment = await Todo.findAll({
      where: {
        createdAt: { [Op.gte]: yesterday },
      },
      order: [
        ["commentCounts", "DESC"],
        ["createdAt", "DESC"],
      ],
      limit: 5,
    });

    return { challenge, comment };
  };
}

module.exports = TodoListService;
