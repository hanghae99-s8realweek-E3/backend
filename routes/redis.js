const express = require("express");
const router = express.Router();

const visitorsNumber = require("../controllers/redis.controller");
const nonUserMiddleware = require("../middlewares/nonUser_middlewares");

router.get("/get", nonUserMiddleware, visitorsNumber);

module.exports = router;
