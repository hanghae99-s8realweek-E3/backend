const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs().tz("Asia/Seoul");
const localDate = dayjs().format("YYYY-MM-DD");
const redisClient = require("../utils/redisconnect");


const redisCli = redisClient.v4;

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
