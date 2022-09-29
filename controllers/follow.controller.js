const FollowService = require("../services/follow.service");
const Joi = require("../utils/joi");

class FollowController {
  followService = new FollowService();
  joi = new Joi();

  // 팔로우 목록 조회 [GET] /api/follows/:userId
  getfollowList = async (req, res) => {
    const { userId } = await this.joi.parameterSchema.validateAsync(req.params);

    const data = await this.followService.followListGet(userId);

    res.status(200).json({
      data,
    });
  };

  // 팔로우 추가 및 삭제 [PUT] /api/follows/:userId
  editFollow = async (req, res) => {
    await this.joi.parameterSchema.validateAsync(req.params);
    const elseUserId = Number(req.params.userId);
    const { userId } = res.locals.user;

    await this.followService.followListEdit(userId, elseUserId);

    res.status(201).json({
      message: "success",
    });
  };
}

module.exports = FollowController;
