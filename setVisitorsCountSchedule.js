const { Count } = require("./models");
const schedule = require("node-schedule");
const logger = require("./logger");
const redisClient = require("./utils/redisconnect");
const redisCli = redisClient.v4;
const date = require("./utils/date");
const localDate =date()


module.exports = async () => {
  try {
    //6시간마다 redis data DB에 저장
    schedule.scheduleJob("*/5 * * * * *", async () => {
      const todayCount = await redisCli.PFCOUNT(localDate);
      console.log("오늘의 방문자" + todayCount);
      console.log(localDate,"+",new Date());
      const day = ("0" + new Date().getDate());
      console.log(day);
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
