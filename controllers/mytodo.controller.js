const MyTodoService = require("../services/mytodo.service");

class MyTodoController {
  myTodoService = new MyTodoService();

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

  // 오늘의 제안 todo 작성 [POST] /api/mytodos
  // todo 삭제 [DELETE] /api/mytodos/:todoId
  // 오늘의 도전 todo 등록 [POST] /:todoId/challenged
  // 오늘의 도전 todo 완료/진행중 처리 [PUT] /:todoId/challenged
  // 오늘의 도전 todo 등록 취소 [DELETE] /:todoId/challenged
}

module.exports = MyTodoController;
