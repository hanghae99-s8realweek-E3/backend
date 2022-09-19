const { Todo, ChallengedTodo, Follow, Mbti, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const Query = require("../advice/query");
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
      isFollowed: isFollowed ? true : false,
      isChallenged: ischallenged ? true : false,
      isTodayDone: todaysChallenge ? true : false,
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
}

module.exports = TodoListService;
