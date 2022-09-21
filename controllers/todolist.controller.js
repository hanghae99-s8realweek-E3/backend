const TodoListService = require("../services/todolist.service");
const Joi = require("../advice/joi");

class TodoListController {
  todoListService = new TodoListService();
  joi = new Joi();

  // todo 피드 조회 [GET] /api/todolists?
  getTodoLists = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { mbti, filter } = await this.joi.getTodoListsSchema.validateAsync(
        req.query
      );

      const data = await this.todoListService.todoListsGet(
        userId,
        mbti,
        filter
      );

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };

  // 상세 todo 조회 [GET] /api/todolists/:todoId
  getTodo = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { todoId } = await this.joi.idSchema.validateAsync(req.params);

      const data = await this.todoListService.todoGet(userId, todoId);

      res.status(200).json({ message: "success", data });
    } catch (err) {
      next(err);
    }
  };

  // mbti 알고리즘 [GET] /api/todolists/mbti
  getMbti = async (req, res, next) => {
    try {
      const { user } = res.locals;

      const mbtiData = await this.todoListService.mbtiGet(user);

      res.status(200).json({ message: "success", mbtiData });
    } catch (err) {
      next(err);
    }
  };

  // 현재 인기있는 피드 top5 [GET] /api/todolists/ranking
  getRanking = async (req, res, next) => {
    try {
      const data = await this.todoListService.rankingGet();

      res.status(200).json({ message: "success", data });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = TodoListController;
