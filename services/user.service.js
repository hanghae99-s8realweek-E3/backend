const { User, Follow, EmailAuth, sequelize } = require("../models");
const { Transaction } = require("sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const multer = require("../middlewares/multer");
const Boom = require("@hapi/boom");
const Query = require("../utils/query");
const createToken = require("../utils/createToken");
const sendEmail = require("../utils/nodeMailer");

class UserService {
  query = new Query();

  // 회원가입 [POST] /api/accounts/signup
  userSignup = async (email, password, confirmPassword, nickname) => {
    const checkEamilDuplicate = await User.findOne({ where: { email: email } });
    const authResult = await EmailAuth.findOne({
      where: { email, authCheck: true },
    });
    if (checkEamilDuplicate) {
      throw Boom.badRequest("중복된 이메일 입니다.");
    }
    if (password !== confirmPassword) {
      throw Boom.badRequest("비밀번호와 비밀번호 확인값이 일치 하지 않습니다.");
    }
    if (!authResult) {
      throw new Error("이메일 인증이 완료되지 않았습니다.");
    }
    const bcrPassword = bcrypt.hashSync(
      password,
      parseInt(parseInt(process.env.SALT))
    ); //비밀번호 암호화
    await User.create({
      email,
      password: bcrPassword,
      nickname,
    });
    const userData = await User.findOne({ where: { email: email } });
    createToken(userData);
    return token;
  };

  // mbti 등록 [POST] /api/accounts/mbti
  userMbti = async (mbti, userId) => {
    await User.update({ mbti: mbti }, { where: { userId: userId } });
    const userData = await User.findOne({ where: { userId: userId } });
    createToken(userData);
    return token;
  };

  // 로그인 [POST] /api/accounts/login
  userLogin = async (email, password) => {
    const userData = await User.findOne({ where: { email: email } });
    if (!userData) {
      throw Boom.badRequest("회원정보가 없습니다.");
    }
    const bcrCompareResult = await bcrypt.compare(password, userData.password); //비밀번호 암호화 비
    if (!bcrCompareResult) {
      throw Boom.badRequest("아이디나 비번이 올바르지 않습니다.");
    }
    createToken(userData);
    return token;
  };

  // 이메일 중복 검사 + 인증메일 발송 [POST] /api/accounts/emailAuth
  authEmail = async (email) => {
    const dupCheck = await User.findOne({ where: { email } });
    if (dupCheck) {
      throw Boom.unauthorized("이미 가입된 이메일입니다.");
    }
    // 중복 아닌 경우 emailAuth 테이블에 데이터 존재하는지 확인하고 없으면 인증번호 전송 / 존재하면 삭제하고 인증번호 재전송
    const exEmailAuth = await EmailAuth.findOne({ where: { email } });
    if (exEmailAuth) {
      await EmailAuth.destroy({ where: { email } });
    }
    sendEmail(email);
  };

  // 이메일 인증확인 [POST] /api/accounts/emailAuth/check
  checkEmailAuth = async (email, emailAuthNumber) => {
    const authNumber = await EmailAuth.findOne({ where: { email } });
    if (!authNumber) {
      throw Boom.unauthorized(
        "email 정보가 존재하지 않습니다. 다시 인증 바랍니다."
      );
    }
    if (authNumber.authNumber !== emailAuthNumber) {
      throw Boom.unauthorized("인증번호가 일치하지 않습니다.");
    }

    await EmailAuth.update({ authCheck: true }, { where: { email } });
  };

  //회원 정보 조회 [GET] /api/accounts
  userInfoGet = async (userId) => {
    const [userData, followings, followers] = await Promise.all([
      User.findByPk(userId),
      sequelize.query(this.query.getFollowingCountsQuery, {
        bind: { userId },
        type: sequelize.QueryTypes.SELECT,
      }),
      sequelize.query(this.query.getFollowerCountsQuery, {
        bind: { userId },
        type: sequelize.QueryTypes.SELECT,
      }),
    ]);

    return {
      userId: userData.userId,
      mbti: userData.mbti,
      nickname: userData.nickname,
      profile: userData.profile,
      mimicCounts: userData.todoCounts + userData.challengeCounts,
      following: followings[0]?.followingCount ?? 0,
      follower: followers[0]?.followerCount ?? 0,
    };
  };

  // 회원 정보 변경 [PUT] /api/accounts
  userInfoChange = async (
    userId,
    password,
    newPassword,
    confirmPassword,
    nickname,
    mbti
  ) => {
    const userData = await User.findByPk(userId);

    if (password) {
      const bcrCompareResult = await bcrypt.compare(
        password,
        userData.password
      );
      if (!bcrCompareResult) {
        throw Boom.unauthorized("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
      if (newPassword !== confirmPassword) {
        throw Boom.unauthorized(
          "비밀번호와 비밀번호 확인값이 일치 하지 않습니다."
        );
      }
      const bcrPassword = bcrypt.hashSync(
        newPassword,
        parseInt(process.env.SALT)
      );
      await User.update({ password: bcrPassword }, { where: { userId } });
    }

    if (nickname) {
      await User.update({ nickname }, { where: { userId } });
    }

    if (mbti) {
      await User.update({ mbti }, { where: { userId } });
    }

    const changedData = await User.findByPk(userId);
    createToken(changedData);

    return token;
  };

  // 프로필 사진 변경 [PUT] /api/accounts/profile
  userProfileChange = async (userId, profile) => {
    const user = await User.findByPk(userId);
    if (user.profile !== "none") {
      await multer.deleteProfile(user.profile);
    }
    await User.update({ profile }, { where: { userId } });

    const changedData = await User.findByPk(userId);
    createToken(changedData);

    return token;
  };

  // 회원탈퇴 [DELETE] /api/accounts
  userInfoDelete = async (userId, password) => {
    const userData = await User.findByPk(userId);
    const bcrCompareResult = await bcrypt.compare(password, userData.password);
    if (!bcrCompareResult) {
      throw Boom.unauthorized("아이디 또는 비밀번호가 올바르지 않습니다.");
    }

    // 회원탈퇴 후 follow DB에서 해당 userId 데이터 삭제하는 과정 트렌젝션 설정
    await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (t) => {
        await User.destroy({ where: { userId }, transaction: t });
        await Follow.destroy({
          where: {
            [Op.or]: [{ userIdFollowing: userId }, { userIdFollower: userId }],
          },
          transaction: t,
        });
      }
    );
  };
}

module.exports = UserService;
