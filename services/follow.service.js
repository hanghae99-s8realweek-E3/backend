const { Follow } = require("../models");
const { User } = require("../models");

class FollowService {
  followListGet = async (userId) => {
    const checkUserId = await User.findOne({ where: { userId: userId } });
    if (!checkUserId) {
      throw new Error("존재하지 않는 사용자 입니다.");
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
    // console.log(myFollowerTable)
    const myFollowerUserId = myFollowerTable.map(
      (table) => table.userIdFollower
    );
    // console.log(myFollowerUserId)
    const myFollowerData = await User.findAll({
      where: { userId: myFollowerUserId },
    });
    //  console.log(myFollowerData)
    const myFollowerlist = await myFollowerData.map((user) => {
      return {
        nickname: user.nickname,
        mbti: user.mbti,
        profile: user.profile,
        userId: user.userId,
      };
    });
    const myfollowerCount = myFollowerlist.length;

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
    const myfollowingCount = myFollowinglist.length;

    return {
      // followingCount: myfollowingCount,
      // followerCount: myfollowerCount,
      following: myFollowinglist,
      follower: myFollowerlist,
    };
  };

  followListEdit = async (userId, elseUserId) => {
    //팔로잉 할 userId 있나 조회
    const checkUserId = await User.findOne({ where: { userId: elseUserId } });
    if (!checkUserId) {
      throw new Error("존재하지 않는 사용자 입니다.");
    }

    //나 자신 팔로우 금지
    if (userId === elseUserId) {
      throw new Error("자기 자신은 팔로우를 하지 못합니다.");
    }

    //팔로우 관계 동일한것 제작 금지
    //나의 팔로잉 테이블에 팔로잉 되어있으면
    //팔로잉 테이블 에서 팔로우 usrerId 삭제
    //팔로잉 테이블에 팔로잉 안되어있으면
    //팔로잉 테이블 에서 팔로우 usrerId 추가

    const myFollowerTable = await Follow.findAll({
      where: { userIdFollower: userId },
    });

    const myfollowingUserId = await myFollowerTable.map((table) => {
      return table.userIdFollowing;
    });

    const checkFollow = myfollowingUserId.includes(elseUserId);

    if (!checkFollow) {
      await Follow.create({
        userIdFollowing: elseUserId,
        userIdFollower: userId,
      });
    } else {
      await Follow.destroy({ where: { userIdFollowing: elseUserId } });
    }
    return;
  };
}

module.exports = FollowService;
