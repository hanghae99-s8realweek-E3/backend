const express = require("express");
const User = require("./user");
const Follow = require("./follow");
const Comment = require("./comment");
const Social = require("./social");
const router = express.Router();

router.use("/accounts", User);
router.use("/followLists", Follow);
router.use("/comments", Comment);
router.use("/accounts", Social);

module.exports = router;
