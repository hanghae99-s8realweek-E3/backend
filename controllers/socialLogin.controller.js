const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

//Kakao callback Controller======ok
exports.kakaologin = (req, res, next) => {
  passport.authenticate(
    "kakao",
    { failureRedirect: "/" },
    (err, user, info) => {
      if (err) return next(err);
      const { userId, mbti, nickname } = user;
      const token = jwt.sign(
        { userId, mbti, nickname },
        process.env.MYSECRET_KEY,
        { expiresIn: "2d" }
      );
      res.redirect(
        `https://frontend-hanghaee99team3.vercel.app/mbti?token=${token}`
      );
    }
  )(req, res, next);
};
