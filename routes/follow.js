const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow.controller");
const followController = new FollowController();
const authMiddleware = require("../middlewares/auth_middlewares");

// 팔로우 목록 조회 [GET] /api/follows/:userId
router.get("/:userId", followController.followList);
// 팔로우 추가 및 삭제 [PUT] /api/follows/:userId
router.put("/:userId", authMiddleware, followController.followEdit);

module.exports = router;
