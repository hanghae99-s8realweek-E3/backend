const jwt = require("jsonwebtoken");
const { User } = require("../models");
const Boom = require("@hapi/boom");

module.exports = (req, res, next) => {
  try {
    // Client 요청의 cookies 객체 중 토큰을 authorization으로 읽어들여서, 공백을 기준으로 두 조각으로 나눔
    const { authorization } = req.headers;
    // console.log(authorization, "인증확인");
    const [authType, authToken] = (authorization || "").split(" ");

    // 전달받은 인증값이 Bearer로 시작하지 않으면 인증 실패
    if (authType !== "Bearer") {
      throw Boom.badRequest("로그인 후 사용해주세요, Bearer 토큰이 아님");
    }

    // 뒤쪽 'authToken'을 우리 MYSQL_KEY를 가지고 인증해보고 에러 없으면, user 정보를 토근으로 다음 next으로 넘겨줌
    jwt.verify(
      authToken,
      process.env.MYSECRET_KEY,

      async (error, decoded) => {
        try {
          // 인증 결과 에러가 나타나면 클라이언트와 서버에 모두 에러를 던지고 미들웨어 종료
          if (error) {
            throw Boom.badRequest(
              "이용에 문제가 있습니다. 관리자에게 문의해주세요, 토큰 인증 실패"
            );
          }

          // 에러없이 잘 인증 된거면, 인증된 사용자이므로 decoding 된 decode 객체가 생김
          // 이 decoded 객체로 DB로부터 사용자 정보를 빼 와서 토큰을 res.locals(전역 객체) 위치에 반환
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
