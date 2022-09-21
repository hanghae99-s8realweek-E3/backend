const { User, Follow } = require("../models");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Boom = require("@hapi/boom");
require("dotenv").config();

// Kakao callback Controller
exports.kakaoLogin = (req, res, next) => {
  passport.authenticate(
    "kakao",
    { failureRedirect: "/" },
    (err, user, info) => {
      if (err) return next(err);
      const { userId, mbti, nickname, provider } = user;
      const token = jwt.sign(
        { userId, mbti, nickname, provider },
        process.env.MYSECRET_KEY,
        { expiresIn: "2d" }
      );
      res.redirect(
        `https://frontend-hanghaee99team3.vercel.app/mbti?token=${token}`
      );
    }
  )(req, res, next);
};

// passport-kakao 연결끊기 콜백 API
exports.deleteKakao = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    const user = await User.findOne({ where: { snsId: user_id } });
    if (!user) {
      throw Boom.badRequest("존재하지 않는 카카오 로그인 회원입니다");
    }

    // 카카오 탈퇴 후 follow DB에서 해당 userId 데이터 삭제하는 과정 트렌젝션 설정
    const onTransaction = await sequelize.transaction();
    try {
      await User.destroy({ where: { snsId: user_id } });
      await Follow.destroy({
        where: {
          [Op.or]: [
            { userIdFollowing: user.userId },
            { userIdFollower: user.userId },
          ],
        },
        transaction: onTransaction,
      });
      await onTransaction.commit();
    } catch (err) {
      await onTransaction.rollback();
    }

    res.status(201).json({
      message: "success(kakao)",
    });
  } catch (err) {
    next(err);
  }
};
