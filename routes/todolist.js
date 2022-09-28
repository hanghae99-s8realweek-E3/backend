const express = require("express");
const router = express.Router();

const TodoListController = require("../controllers/todolist.controller");
const todoListController = new TodoListController();

const authMiddleware = require("../middlewares/auth_middlewares");
const nonUserMiddleware = require("../middlewares/nonUser_middlewares");
const vistorCountMiddleware = require("../middlewares/vistorCount_middleware");
const { wrapAsyncController } = require("../middlewares/error_handler");

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
