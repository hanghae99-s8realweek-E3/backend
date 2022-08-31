const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow.controller");
const followController = new FollowController();

router.get("/:userId", followController.followList);
router.put("/:userId", followController.followEdit);


module.exports = router;