const jwt = require("jsonwebtoken");

const createToken = (userData) => {
  const payload = {
    userId: userData.userId,
    nickname: userData.nickname,
    mbti: userData.mbti,
    provider: userData.provider,
    profile: userData.profile,
  };

  return (token = jwt.sign(payload, process.env.MYSECRET_KEY, {
    expiresIn: "2d",
  }));
};

module.exports = createToken;
