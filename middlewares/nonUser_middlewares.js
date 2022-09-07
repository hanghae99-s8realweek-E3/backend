const jwt = require("jsonwebtoken");
const { User } = require("../models");
const Boom = require("@hapi/boom");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const [authType, authToken] = (authorization || "").split(" ");

      if (authType !== "Bearer") {
        throw Boom.badRequest("로그인 후 사용해주세요. Bearer 토큰이 아님.");
      }

      jwt.verify(
        authToken,
        process.env.MYSECRET_KEY,

        async (error, decoded) => {
          try {
            if (error) {
              throw Boom.badRequest(
                "토큰 인증 실패 - 이용에 문제가 있습니다. 관리자에게 문의해주세요."
              );
            }

            const user = await User.findOne({
              where: { userId: decoded.userId },
            });
            res.locals.user = user;
            next();
          } catch (err) {
            next(err);
          }
        }
      );
    } else {
      res.locals.user = "";
      next();
    }
  } catch (err) {
    next(err);
  }
};
