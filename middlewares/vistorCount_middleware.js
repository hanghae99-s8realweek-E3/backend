const dayjs = require("dayjs");
const localDate = dayjs().format("YYYY-MM-DD");
const redisClient = require("../utils/redisconnect");

const redisCli = redisClient.v4;

module.exports = (req, res, next) => {
  try {
    const clientIp = req.ip;
    redisCli.PFADD(localDate, clientIp);
    next();
  } catch (err) {
    next(err);
  }
};
