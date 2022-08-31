const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow.controller");
const followController = new FollowController();
const authMiddleware = require("../middlewares/auth_middlewares");

router.get("/:userId", followController.followList);
router.put("/:userId", authMiddleware, followController.followEdit);



module.exports = router;