
// const TodoListService = require("../services/todolist.service");

class TodoListController {
  // todoListService = new TodoListService();


  // todo 피드 조회 [GET] /api/todolists
  getTodoLists = async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { mbti, filter } = req.query;

      const data = await this.todoListService.todoListsGet(user, mbti, filter);

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };

  // 상세 todo 조회 [GET] /api/todolists/:todoId
  getTodo = async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { todoId } = req.params;

      const data = await this.todoListService.todoGet(user, todoId);

      res.status(200).json({ message: "success", data });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = TodoListController;
