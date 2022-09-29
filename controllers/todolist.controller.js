const TodoListService = require("../services/todolist.service");
const Joi = require("../utils/joi");

class TodoListController {
  todoListService = new TodoListService();
  joi = new Joi();

  // todo 피드 조회 [GET] /api/todolists?
  getTodoLists = async (req, res) => {
    const { userId } = res.locals.user;
    const { mbti, filter } = await this.joi.getTodoListsSchema.validateAsync(
      req.query
    );

    const data = await this.todoListService.todoListsGet(userId, mbti, filter);

    res.status(200).json({ data });
  };

  // 상세 todo 조회 [GET] /api/todolists/:todoId
  getTodo = async (req, res) => {
    const { userId, profile } = res.locals.user;
    const { todoId } = await this.joi.parameterSchema.validateAsync(req.params);

    const data = await this.todoListService.todoGet(userId, profile, todoId);

    res.status(200).json({ message: "success", data });
  };

  // mbti 알고리즘 [GET] /api/todolists/mbti
  getMbti = async (req, res) => {
    const { userId, mbti } = res.locals.user;

    const mbtiData = await this.todoListService.mbtiGet(userId, mbti);

    res.status(200).json({ message: "success", mbtiData });
  };

  // 현재 인기있는 피드 top5 [GET] /api/todolists/ranking
  getRanking = async (req, res) => {
    const data = await this.todoListService.rankingGet();

    res.status(200).json({ message: "success", data });
  };
}

module.exports = TodoListController;
