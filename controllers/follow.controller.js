const FollowService = require("../services/follow.service");
const UserService = require("../services/user.service");

class FollowController {
  followService = new FollowService();
  userService = new UserService();

  //팔로우 리스트 조회
  followList = async (req, res, next) => {
    try {
      const url_userId = req.params.userId; //상대방 유저 아이디
      // const { userId } = res.locals.user; //나의 유저아이디
      const userFollowlist = await this.followService.getFollowList(
        userId,
        url_userId
      );
      res.status(200).json({
        userFollowlist,
      });
    } catch (err) {
      next(err);
    }
  };

  //팔로우 추가 및 삭제
  followEdit = async (req, res, next) => {
    try {
      const url_userId = req.params.userId; //수정할 유저 아이디
      // const { userId } = res.locals.user; //나의 유저아이디
      //수정할 유저 아이디
      await this.followService.editFollowList(url_userId);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = FollowController;
