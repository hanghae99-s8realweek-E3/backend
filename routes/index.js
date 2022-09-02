const express = require("express");
const User = require("./user");
const Follow = require("./follow");
const TodoList = require("./todolist");
const MyTodo = require("./mytodo");
const Comment = require("./comment");
const Social = require("./social");
const router = express.Router();

router.use("/accounts", User);
router.use("/follows", Follow);
router.use("/todolists", TodoList);
router.use("/mytodos", MyTodo);
router.use("/comments", Comment);
router.use("/accounts", Social);

module.exports = router;
