const express = require("express");
const router = express.Router();

const TodoController = require('../controllers/todo.controller');
const authMiddleware = require('../middlewares/auth_middlewares');

const todoController = new TodoController();


//오늘의 제안 투두 작성 POST(todo  c)
router.post('./',authMiddleware,todoController.postTodo)

//상세 투두 삭제 DELETE(todo  d)
router.delete('./:todoId',authMiddleware,todoController.deleteTodo)

//투두 도전 누르기POST(mytodo c)
router.post('./:todoId/challenged',authMiddleware,todoController.postchallengeTodo)

//투두 도전 삭제 DELETE(mytodo d)
router.delete('./:todoId/challenged',authMiddleware,todoController.deletechallengeTodo)

//오늘의 투두 챌린지 진행완료 체크 PUT(mytodo iscomplete u)
router.put('./:todoId',authMiddleware,todoController.checkMyTodo)