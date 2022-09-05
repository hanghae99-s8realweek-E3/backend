
const express = require("express");
const router = express.Router();

const TodoListController = require("../controllers/todolist.controller");
const nonUserMiddleware = require("../middlewares/nonUser_middlewares");
const todoListController = new TodoListController();

// todo 피드 조회 [GET] /api/todolists
router.get("/", nonUserMiddleware, todoListController.getTodoLists);
// 상세 todo 조회 [GET] /api/todolists/:todoId
router.get("/:todoId", nonUserMiddleware, todoListController.getTodo);


