const TodoListService = require("../services/todolist.service");

class TodoListController {
  todoListService = new TodoListService();

  // todo 피드 조회 [GET] /api/todolist
  // 상세 todo 조회 [GET] /api/todolist/:todoId
}

module.exports = TodoListController;
