const FollowService = require("../services/follow.service");
const UserService = require("../services/user.service");

class FollowController {
  followService = new FollowService();
  userService = new UserService();

  // 팔로우 목록 조회 [GET] /api/follows/:userId
  getfollowList = async (req, res, next) => {
    try {
      const { userId } = req.params; //팔로우 조회할 유저 아이디
      const data = await this.followService.followListGet(userId);
      res.status(200).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  // 팔로우 추가 및 삭제 [PUT] /api/follows/:userId
  editFollow = async (req, res, next) => {
    try {
      const elseUserId = Number(req.params.userId); //수정할 유저 아이디
      const { userId } = res.locals.user; //나의 유저아이디
      //수정할 유저 아이디
      const asd = await this.followService.followListEdit(userId, elseUserId);
      res.status(201).json({
        asd,
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = FollowController;
