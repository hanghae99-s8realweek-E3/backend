const express = require("express");
const router = express.Router();

const TodoListController = require("../controllers/todolist.controller");
const todoListController = new TodoListController();

const authMiddleware = require("../middlewares/auth_middlewares");
const nonUserMiddleware = require("../middlewares/nonUser_middlewares");
const vistorCountMiddleware = require("../middlewares/vistorCount_middleware");

// mbti 알고리즘 [GET] /api/todolists/mbti
router.get("/mbti", nonUserMiddleware, todoListController.getMbti);
// todo 피드 조회 [GET] /api/todolists
router.get("/", nonUserMiddleware, vistorCountMiddleware, todoListController.getTodoLists);
// 상세 todo 조회 [GET] /api/todolists/:todoId
router.get("/:todoId", authMiddleware, todoListController.getTodo);

module.exports = router;
