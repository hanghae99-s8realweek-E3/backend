const { Count } = require("./models");
const schedule = require("node-schedule");
const logger = require("./logger");
const redisClient = require("./advice/redisconnect");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone); 
dayjs.tz.setDefault("Asia/Seoul");

const localDate = dayjs().format("YYYY-MM-DD");
const redisCli = redisClient.v4;



console.log(new Date());
module.exports = async () => {
  try {
    //6시간마다 redis data DB에 저장
    schedule.scheduleJob("59 58 23 * * *", async () => {
      const todayCount = await redisCli.PFCOUNT(localDate);
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
