const { Follow } = require("../models");
const { User } = require("../models");
const Boom = require("@hapi/boom");
const Query = require("../utils/query");

class FollowService {
  query = new Query();

  // 팔로우 목록 조회 [GET] /api/follows/:userId
  followListGet = async (userId) => {
    const checkUserId = await User.findByPk(userId);
    if (!checkUserId) {
      throw Boom.badRequest("존재하지 않는 사용자 입니다.");
    }
    const myFollowerlist = await sequelize.query(this.query.getFollwerlist, {
      bind: { userIdFollowing: userId },
      type: sequelize.QueryTypes.SELECT,
    });

    const myFollowinglist = await sequelize.query(this.query.getFollwinglist, {
      bind: { userIdFollower: userId },
      type: sequelize.QueryTypes.SELECT,
    });

    return {
      following: myFollowinglist,
      follower: myFollowerlist,
    };
  };

  // 팔로우 추가 및 삭제 [PUT] /api/follows/:userId
  followListEdit = async (userId, elseUserId) => {
    const checkUserId = await User.findByPk(elseUserId);
    if (!checkUserId) {
      throw Boom.badRequest("존재하지 않는 사용자 입니다.");
    }
    if (userId === elseUserId) {
      throw Boom.badRequest("자기 자신은 팔로우를 하지 못합니다.");
    }
    const checkFollow = await Follow.findOne({
      where: { userIdFollowing: elseUserId, userIdFollower: userId },
    });
    if (!checkFollow) {
      await Follow.create({
        userIdFollowing: elseUserId,
        userIdFollower: userId,
      });
    } else {
      await Follow.destroy({
        where: { userIdFollowing: elseUserId, userIdFollower: userId },
      });
    }
  };
}

module.exports = FollowService;
