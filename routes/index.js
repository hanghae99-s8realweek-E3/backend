const express = require("express");
const User = require("./user");
const Comment = require("./comment");

const router = express.Router();

router.use("/accounts", User);
router.use("/comments", Comment);

module.exports = router;
