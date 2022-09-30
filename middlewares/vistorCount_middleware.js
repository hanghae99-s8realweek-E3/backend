
const redisClient = require("../utils/redisConnect");
const { calculateToday } = require("../utils/date");
const redisCli = redisClient.v4;
const localDate = calculateToday();

module.exports = (req, res, next) => {

  try {
    const clientIp = req.ip;
    console.log("IP 주소 : ", clientIp);

    redisCli.PFADD(localDate, clientIp);
    next();
  } catch (err) {
    next(err);
  }
};
