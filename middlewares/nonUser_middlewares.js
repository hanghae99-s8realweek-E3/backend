const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const [authType, authToken] = (authorization || "").split(" ");
      // console.log(tokenValue)
      // console.log(jwt.verify(tokenValue, "secret_key"))

      jwt.verify(
        authToken,
        process.env.MYSECRET_KEY,

        async (error, decoded) => {
          // 인증 결과 에러가 나타나면 클라이언트와 서버에 모두 에러를 던지고 미들웨어 종료
          if (error) {
            res.status(401).send({
              errorMessage:
                "이용에 문제가 있습니다. 관리자에게 문의해주세요, 토큰 인증 실패",
            });
            // console.error(error);
            return;
          }

          // 에러없이 잘 인증 된거면, 인증된 사용자이므로 decoding 된 decode 객체가 생김
          // 이 decoded 객체로 DB로부터 사용자 정보를 빼 와서 토큰을 res.locals(전역 객체) 위치에 반환
          let user = await User.findOne({ where: { userId: decoded.userId } });

          res.locals.user = user;
          next();
        }
      );
    } else {
      res.locals.user = "";
      next();
    }
  } catch (error) {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요.(2) 토큰 검증 불가",
    });
    return;
  }
};
