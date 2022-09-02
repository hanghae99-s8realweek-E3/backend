const express = require("express");
const router = express.Router();

const MyTodoController = require("../controllers/mytodo.controller");
const authMiddleware = require("../middlewares/auth_middlewares");
const nonUserMiddleware = require("../middlewares/nonUser_middlewares");

const myTodoController = new MyTodoController();

// 나의 todo 피드 조회
router.get("/", authMiddleware, myTodoController.getMyTodo);
// 타인의 todo 피드 조회
router.get("/:userId", nonUserMiddleware, myTodoController.getUserTodo);
// 오늘의 제안 todo 작성
router.post("/", authMiddleware, myTodoController.createTodo);
// todo 삭제
router.delete("/:todoId", authMiddleware, myTodoController.deleteTodo);
// 오늘의 도전 todo 등록
router.post(
  "/:todoId/challenged",
  authMiddleware,
  myTodoController.createChallengedTodo
);
// 오늘의 도전 todo 완료/진행중 처리
router.put(
  "/:todoId/challenged",
  authMiddleware,
  myTodoController.completeChallengedTodo
);
// 오늘의 도전 todo 등록 취소
router.delete(
  "/:todoId/challenged",
  authMiddleware,
  myTodoController.deleteChallengedTodo
);

module.exports = router;
