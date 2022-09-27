const { Follow } = require("../models");
const { User } = require("../models");
const Boom = require("@hapi/boom");

class FollowService {
  // 팔로우 목록 조회 [GET] /api/follows/:userId
  followListGet = async (userId) => {
    const checkUserId = await User.findByPk(userId);
    if (!checkUserId) {
      throw Boom.badRequest("존재하지 않는 사용자 입니다.");
    }
    //======================================
    //follower:나를 팔로우 하는 사람
    //follwing:내가 팔로우 하는 사람
    //팔로우 테이블 불러오기
    //팔로우 테이블에서 userId 가져오기
    //팔로우 userId에서 userData 가져오기
    //userData를 userlist로 바꿔서 보내주기
    const myFollowerTable = await Follow.findAll({
      where: { userIdFollowing: userId },
    });
    const myFollowerUserId = myFollowerTable.map(
      (table) => table.userIdFollower
    );
    const myFollowerlist = await User.findAll({
      where: { userId: myFollowerUserId },
      attributes: ["userId", "nickname", "mbti", "profile"],
    });

    //=====================================================
    //내가 팔로잉 하는  테이블 불러오기
    //팔로잉 테이블에서 userId 가져오기
    //팔로잉 userId에서 userData 가져오기
    //userData를 userlist로 바꿔서 보내주기

    const myFollowingTable = await Follow.findAll({
      where: { userIdFollower: userId },
    });

    const myFollowingUserId = myFollowingTable.map(
      (table) => table.userIdFollowing
    );
    const myFollowinglist = await User.findAll({
      where: { userId: myFollowingUserId },
      attributes: ["userId", "nickname", "mbti", "profile"],
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
    //=====================================================
    //팔로우 관계 동일한것 제작 금지
    //나의 팔로잉 테이블에 팔로잉 되어있으면
    //팔로잉 테이블 에서 팔로우 usrerId 삭제
    //팔로잉 테이블에 팔로잉 안되어있으면
    //팔로잉 테이블 에서 팔로우 usrerId 추가
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
    return;
  };
}

module.exports = FollowService;
