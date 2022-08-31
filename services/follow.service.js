const { Follow } = require("../models/followers");
const { User } = require("../models");

class FollowService {
  followList = async (url_userId) => {
    //======================================
    //팔로우 테이블 불러오기
    //팔로우 테이블에서 userId 가져오기
    //팔로우 userId에서 userData 가져오기
    //userData를 userlist로 바꿔서 보내주기

    const myFollowerTable = await Follow.findAll({
      where: { userId_follower: url_userId },
    });
    const myFollowerUserId = myFollowerTable.map(
      (table) => table.userId_follower
    );
    const myFollowerData = await User.findAll({
      where: { userId: myFollowerUserId },
    });
    const myFollowerlist = await myFollowerData.map((user) => {
      return {
        nickname: user.nickname,
        mbti: user.mbti,
        profile: user.profile,
        userId: user.userId,
      };
    });
    //=====================================================
    //팔로잉 테이블 불러오기
    //팔로잉 테이블에서 userId 가져오기
    //팔로잉 userId에서 userData 가져오기
    //userData를 userlist로 바꿔서 보내주기

    const myFollowingTable = await Follow.findAll({
      where: { userId_following: url_userId },
    });
    const myFollowingUserId = myFollowingTable.map(
      (table) => table.userId_follower
    );
    const myFollowingData = await User.findAll({
      where: { userId: myFollowingUserId },
    });
    const myFollowinglist = await myFollowingData.map((user) => {
      return {
        nickname: user.nickname,
        mbti: user.mbti,
        profile: user.profile,
        userId: user.userId,
      };
    });

    return `following: ${myFollowinglist}, follower: ${myFollowerlist}`;
  };

  followListEdit = async (userId, url_userId) => {
    //나의 팔로잉 테이블에 팔로잉 되어있으면
    //팔로잉 테이블 에서 팔로우 usrerId 삭제
    //팔로잉 테이블에 팔로잉 안되어있으면
    //팔로잉 테이블 에서 팔로우 usrerId 추가
    const myFollowingTable = await Follow.findAll({
      where: { userId_following: userId },
    });
    if (!myFollowingTable) {
      await Follow.create({ userId_folloing: url_userId });
    } else {
      await Follow.destroy({ where: { userId_folloing: url_userId } });
    }
    return;
  };
}

module.exports = FollowService;
