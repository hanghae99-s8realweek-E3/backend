const express = require("express");
const User = require("./user");
const Follow = require("./follow");
const TodoList = require("./todolist");
const Comment = require("./comment");
const MyTodo = require("./mytodo");
const router = express.Router();

router.use("/accounts", User);
router.use("/followLists", Follow);
// router.use("/todolists", TodoList);
router.use("/mytodos", MyTodo);
router.use("/comments", Comment);
// router.use("/todoLists", Todo);


module.exports = router;
