const express = require("express");
const router = express.Router();

const TodoListController = require("../controllers/todolist.controller");
const todoListController = new TodoListController();

const authMiddleware = require("../middlewares/authMiddlewares");
const nonUserMiddleware = require("../middlewares/nonUserMiddlewares");
const vistorCountMiddleware = require("../middlewares/vistorCountMiddleware");
const { wrapAsyncController } = require("../middlewares/errorHandler");

// mbti 알고리즘 [GET] /api/todolists/mbti
router.get(
  "/mbti",
  nonUserMiddleware,
  wrapAsyncController(todoListController.getMbti)
);
// 현재 인기있는 피드 top5 [GET] /api/todolists/ranking
router.get(
  "/ranking",
  vistorCountMiddleware,
  wrapAsyncController(todoListController.getRanking)
);
// todo 피드 조회 [GET] /api/todolists
router.get(
  "/",
  nonUserMiddleware,
  wrapAsyncController(todoListController.getTodoLists)
);
// 상세 todo 조회 [GET] /api/todolists/:todoId
router.get(
  "/:todoId",
  authMiddleware,
  wrapAsyncController(todoListController.getTodo)
);

module.exports = router;
