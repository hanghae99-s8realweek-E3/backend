const dotenv = require("dotenv");
const dayjs = require("dayjs");
const localDate = dayjs().format("YYYY-MM-DD");
const redisClient = require("../redisconnect");
dotenv.config(); // env환경변수 파일 가져오기


const redisCli = redisClient.v4;

visitorsCount = async (clientIp) => {
  await redisCli.PFADD(localDate, clientIp);
};

module.exports = visitorsCount;