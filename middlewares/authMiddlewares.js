const jwt = require("jsonwebtoken");
const { User } = require("../models");
const Boom = require("@hapi/boom");

module.exports = (req, res, next) => {
  try {
    // 헤더의 토큰을 authorization으로 읽어들여서, 공백을 기준으로 두 조각으로 나눔
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    // 전달받은 인증값이 Bearer로 시작하지 않으면 인증 실패
    if (authType !== "Bearer") {
      throw Boom.badRequest("로그인 후 사용해주세요. Bearer 토큰이 아님.");
    }

    // 뒤쪽 'authToken'을 우리 MYSECRET_KEY를 가지고 인증해보고 에러 없으면, user 정보를 토근으로 다음 next으로 넘겨줌
    jwt.verify(
      authToken,
      process.env.MYSECRET_KEY,

      async (error, decoded) => {
        try {
          // 인증 결과 에러가 나타나면 클라이언트와 서버에 모두 에러를 던지고 미들웨어 종료
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
  } catch (err) {
    next(err);
  }
};
