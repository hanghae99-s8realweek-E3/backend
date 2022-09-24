const { Count } = require("./models");
const schedule = require("node-schedule");
const logger = require("./logger");
const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs().tz("Asia/Seoul");
const localDate = dayjs().format("YYYY-MM-DD");

const redisCli = redisClient.v4;
const date = require("./utils/date");
const koreaDate = date();

module.exports = async () => {
  try {
    //6시간마다 redis data DB에 저장
    schedule.scheduleJob("59 58 23 * * *", async () => {
      const todayCount = await redisCli.PFCOUNT(localDate);
      console.log("dateModule " + "+ " + koreaDate);
      console.log("오늘의 방문자" + todayCount);
      await Count.create({
        date: localDate,
        Count: todayCount,
      });
      await redisCli.DEL(localDate);
    });
  } catch (err) {
    logger.error(err);
  }
};
