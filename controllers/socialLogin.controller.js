const { User } = require("../models");
const jwt = require("jsonwebtoken");
const passport = require("passport");
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

exports.deleteKakao = async (req, res, next) => {
  try {
    const { user_id } = req.query;

    await User.destroy({ where: { snsId: user_id } });
  } catch (err) {
    next(err);
  }
};
