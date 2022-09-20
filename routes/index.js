const express = require("express");
const User = require("./user");
const Social = require("./social");
const Follow = require("./follow");
const TodoList = require("./todolist");
const Comment = require("./comment");
const MyTodo = require("./mytodo");


const router = express.Router();

router.use("/accounts", Social);
router.use("/accounts", User);
router.use("/follows", Follow);
router.use("/todolists", TodoList);
router.use("/mytodos", MyTodo);
router.use("/comments", Comment);


module.exports = router;
