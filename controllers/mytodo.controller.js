const MyTodoService = require("../services/mytodo.service");

class MyTodoController {
  myTodoService = new MyTodoService();


  //나의 오늘의  Todo 도전 등록
  createChallengedTodo = async (req, res, next) => {
    try {
      const { todoId } = req.params;
      const { userId } = res.locals.user;
      await this.myTodoService.challengedTodoCreate(todoId, userId);
      res.status(201).json({
        message: "success",
      });

  // 나의 todo 피드 조회 [GET] /api/mytodos
  getMyTodo = async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { date } = req.query;

      const data = await this.myTodoService.getMyTodo(user, date);

      res.status(200).json({ message: "success", data });

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
      await this.myTodoService.challengedTodoDelete(date, userId, todoId);
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
      await this.myTodoService.challengedTodoComplete(date, userId);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  //나의오늘의 제안 Todo 작성
  createTodo = async (req, res, next) => {
    try {
      const { todo } = req.body;
      const { userId } = res.locals.user;
      await this.myTodoService.todoCreate(todo, userId);
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
      await this.myTodoService.todoDelete(todoId, userId);
      res.status(201).json({
        message: "success",
      });

  // 타인의 todo 피드 조회 [GET] /api/mytodos/:userId
  getUserTodo = async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { userId } = req.params;

      const data = await this.myTodoService.getUserTodo(user, userId);

      res.status(200).json({ message: "success", data });
    } catch (err) {
      next(err);
    }
  };

}

module.exports = MyTodoController;
