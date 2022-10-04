const express = require("express");
const router = express.Router();

const FollowController = require("../controllers/follow.controller");
const followController = new FollowController();
const { wrapAsyncController } = require("../middlewares/errorHandler");
const authMiddleware = require("../middlewares/authMiddlewares");

// 팔로우 목록 조회 [GET] /api/follows/:userId
router.get(
  "/:userId",
  authMiddleware,
  wrapAsyncController(followController.getfollowList)
);
// 팔로우 추가 및 삭제 [PUT] /api/follows/:userId
router.put(
  "/:userId",
  authMiddleware,
  wrapAsyncController(followController.editFollow)
);

module.exports = router;
