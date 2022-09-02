const MyTodoService = require("../services/mytodo.service");

class MyTodoController {
  myTodoService = new MyTodoService();

  //나의 오늘의  Todo 도전 등록
  createChallengedTodo = async (req, res, next) => {
    try {
      const { todoId } = req.params;
      const { userId } = res.locals.user;
      await this.todoService.challengedTodoCreate(todo, userId);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  //오늘의 도전 Todo 등록 취소
  deleteChallengedTodo = async (req, res, next) => {
    try {
      const { date } = req.body;
      const { todoId } = req.params;
      const { userId } = res.locals.user;
      await this.todoService.challengedTodoDelete(todo, userId);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  // 나의 오늘의 Todo  진행중/완료 처리
  completeChallengedTodo = async (req, res, next) => {
    try {
      const { date } = req.body;
      const { userId } = res.locals.user;
      await this.todoService.challengedTodoComplete(date, userId);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  //나의오늘의 제안 Todo 작성
  createTod = async (req, res, next) => {
    try {
      const { todo } = req.body;
      const { userId } = res.locals.user;
      await this.todoService.todoCreate(todo, userId);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  //Todo 삭제
  deleteTodo = async (req, res, next) => {
    try {
      const { todoId } = req.params;
      const { userId } = res.locals.user;
      await this.todoService.todoDelete(todoId, userId);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = MyTodoController;
