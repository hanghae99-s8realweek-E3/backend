const express = require("express");
const router = express.Router();

const MyTodoController = require("../controllers/mytodo.controller");
const myTodoController = new MyTodoController();
const { wrapAsyncController } = require("../middlewares/error_handler");
const authMiddleware = require("../middlewares/auth_middlewares");

// 나의 todo 피드 조회 [GET] /api/mytodos?date=
router.get("/", authMiddleware, wrapAsyncController(myTodoController.getMyTodo));
// 타인의 todo 피드 조회 [GET] /api/mytodos/:userId
router.get("/:userId", authMiddleware, wrapAsyncController(myTodoController.getUserTodo));
// 오늘의 제안 todo 작성 [POST] /api/mytodos
router.post("/", authMiddleware, wrapAsyncController(myTodoController.createTodo));
// todo 삭제 [DELETE] /api/mytodos/:todoId
router.delete("/:todoId", authMiddleware, wrapAsyncController(myTodoController.deleteTodo));
// 오늘의 도전 todo 등록 [POST] /:todoId/challenged
router.post(
  "/:todoId/challenged",
  authMiddleware,
  wrapAsyncController(myTodoController.createChallengedTodo)
);
// 오늘의 도전 todo 완료/진행중 처리 [PUT] /:challengedTodoId/challenged
router.put(
  "/:challengedTodoId/challenged",
  authMiddleware,
  wrapAsyncController(myTodoController.completeChallengedTodo)
);
// 오늘의 도전 todo 등록 취소 [DELETE] /:challengedTodoId/challenged
router.delete(
  "/:challengedTodoId/challenged",
  authMiddleware,
  wrapAsyncController(myTodoController.deleteChallengedTodo)
);

module.exports = router;
