const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow.controller");
const followController = new FollowController();
const authMiddleware = require("../middlewares/auth_middlewares");

router.get("/:userId", followController.getfollowList);
router.put("/:userId", authMiddleware, followController.editFollow);



module.exports = router;