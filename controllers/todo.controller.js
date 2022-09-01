const TodoService = require("../services/todo.service");

class TodoController {
  todoService = new TodoService();

  //Todo 테이블 생성(c)
  postTodo = async (req, res, next) => {
    try {
      const { todo } = req.body;
      const { userId } = res.locals.user;
      await this.todoService.todoPost(todo, userId);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  //Todo 테이블 삭제(d)
  deleteTodo = async (req, res, next) => {
    try {
      const { todoId } = req.params;
      await this.todoService.todoDelete(todoId);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  //mychallnegeTodo 테이블 등록(c)
  postchallengeTodo = async (req, res, next) => {
    try {
      const { todoId } = req.params;
      const { userId } = res.locals.user;
      await this.todoService.todoChallengePost(todoId, userId);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  //mychallnegeTodo 테이블 삭제(d)
  deletechallengeTodo = async (req, res, next) => {
    try {
      const { date } = req.body;
      const { userId } = res.locals.user;
      await this.todoService.todoChallengeDelete( date, userId);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  //mytodo 테이블  is challenge ture\\false 진행 여부
  checkMyTodo = async (req, res, next) => {
    try {
      const { date } = req.body;
      const { userId } = res.locals.user;
      await this.todoService.myTodoCheck(todoId, date, userId);
      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = TodoController;
