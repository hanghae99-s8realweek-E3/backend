const express = require("express");
const router = express.Router();

const MyTodoController = require("../controllers/mytodo.controller");
const myTodoController = new MyTodoController();

const authMiddleware = require("../middlewares/auth_middlewares");

// 나의 todo 피드 조회 [GET] /api/mytodos?date=
router.get("/", authMiddleware, myTodoController.getMyTodo);
// 타인의 todo 피드 조회 [GET] /api/mytodos/:userId
router.get("/:userId", authMiddleware, myTodoController.getUserTodo);

// 오늘의 제안 todo 작성 [POST] /api/mytodos
router.post("/", authMiddleware, myTodoController.createTodo);

// todo 삭제 [DELETE] /api/mytodos/:todoId
router.delete("/:todoId", authMiddleware, myTodoController.deleteTodo);

// 오늘의 도전 todo 등록 [POST] /:todoId/challenged
router.post(
  "/:todoId/challenged",
  authMiddleware,
  myTodoController.createChallengedTodo
);

// 오늘의 도전 todo 완료/진행중 처리 [PUT] /:todoId/challenged
router.put(
  "/:todoId/challenged",
  authMiddleware,
  myTodoController.completeChallengedTodo
);

// 오늘의 도전 todo 등록 취소 [DELETE] /:todoId/challenged
router.delete(
  "/:todoId/challenged",
  authMiddleware,
  myTodoController.deleteChallengedTodo
);

module.exports = router;
