const visitorsCount = require("../services/redis.service");

//페이지 방문시 ip기준으로 날짜별 방문자수 redis에 저장
visitorsNumber = async (req, res, next) => {
  try {
    const clientIp = req.ip;
    await visitorsCount(clientIp);
    res.status(201).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};
module.exports = visitorsNumber;
