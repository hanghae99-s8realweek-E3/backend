const express = require("express");
const User = require("./user");
const Follow = require("./follow");
const Comment = require("./comment");
const Todo = require("./todo");
const router = express.Router();

router.use("/accounts", User);
router.use("/followLists", Follow);
router.use("/comments", Comment);
router.use("/todoLists", Todo);

module.exports = router;
