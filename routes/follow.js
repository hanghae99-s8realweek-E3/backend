const express = require("express");
const router = express.Router();

const FollowController = require("../controllers/follow.controller");
const followController = new FollowController();
const { wrapAsyncController } = require("../middlewares/error_handler");
const authMiddleware = require("../middlewares/auth_middlewares");

// 팔로우 목록 조회 [GET] /api/follows/:userId
router.get("/:userId", wrapAsyncController(followController.getfollowList));
// 팔로우 추가 및 삭제 [PUT] /api/follows/:userId
router.put("/:userId", wrapAsyncController(authMiddleware, followController.editFollow));

module.exports = router;
