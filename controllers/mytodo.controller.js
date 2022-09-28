const MyTodoService = require("../services/mytodo.service");
const Joi = require("../utils/joi");

class MyTodoController {
  myTodoService = new MyTodoService();
  joi = new Joi();

  // 오늘의 도전 todo 등록 [POST] /:todoId/challenged
  createChallengedTodo = async (req, res, next) => {
      const { todoId } = await this.joi.parameterSchema.validateAsync(
        req.params
      );
      const { userId } = res.locals.user;
      await this.myTodoService.challengedTodoCreate(todoId, userId);
      res.status(201).json({
        message: "success",
      });
  };

  // 오늘의 도전 todo 등록 취소 [DELETE] /:challengedTodoId/challenged
  deleteChallengedTodo = async (req, res, next) => {
      const { userId } = res.locals.user;
      const { challengedTodoId } = await this.joi.parameterSchema.validateAsync(
        req.params
      );
      await this.myTodoService.challengedTodoDelete(challengedTodoId, userId);
      res.status(201).json({
        message: "success",
      });
  };

  // 오늘의 도전 todo 완료/진행중 처리 [PUT] /:challengedTodoId/challenged
  completeChallengedTodo = async (req, res, next) => {
      const { challengedTodoId } = await this.joi.parameterSchema.validateAsync(
        req.params
      );
      const { userId } = res.locals.user;
      const isCompleted = await this.myTodoService.challengedTodoComplete(
        challengedTodoId,
        userId
      );
      res.status(201).json({
        isCompleted,
        message: "success",
      });
  };

  // 오늘의 제안 todo 작성 [POST] /api/mytodos
  createTodo = async (req, res, next) => {
      const { todo } = await this.joi.todoSchema.validateAsync(req.body);
      const { userId } = res.locals.user;
      const { mbti } = res.locals.user;
      await this.myTodoService.todoCreate(todo, userId, mbti);
      res.status(201).json({
        message: "success",
      });
  };

  // todo 삭제 [DELETE] /api/mytodos/:todoId
  deleteTodo = async (req, res, next) => {
      const { todoId } = await this.joi.parameterSchema.validateAsync(
        req.params
      );
      const { userId } = res.locals.user;
      await this.myTodoService.todoDelete(todoId, userId);
      res.status(201).json({
        message: "success",
      });
  };

  // 나의 todo 피드 조회 [GET] /api/mytodos
  getMyTodo = async (req, res, next) => {
      const { userId } = res.locals.user;
      const { date } = await this.joi.dateSchema.validateAsync(req.query);
      const data = await this.myTodoService.getMyTodo(userId, date);
      res.status(200).json({ message: "success", data });
  };

  // 타인의 todo 피드 조회 [GET] /api/mytodos/:userId
  getUserTodo = async (req, res, next) => {
      const { user } = res.locals;
      const { userId } = await this.joi.parameterSchema.validateAsync(
        req.params
      );
      const data = await this.myTodoService.getUserTodo(user, userId);

      res.status(200).json({ message: "success", data });
  };
}

module.exports = MyTodoController;
