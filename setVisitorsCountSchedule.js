const { Count } = require("./models");
const schedule = require("node-schedule");
const logger = require("./logger");
const date = require("./utils/date");
const redisClient = require("./utils/redisconnect");
const redisCli = redisClient.v4;

module.exports = async () => {
  try {
    // 23시 58분 59초에 redis data를 mysql DB에 저장
    schedule.scheduleJob("59 58 23 * * *", async () => {
      const today = date.calculateToday();
      const todayCount = await redisCli.PFCOUNT(today);
      console.log("[" + today + "] " + "오늘의 방문자 : " + todayCount);

      await Count.create({
        date: today,
        Count: todayCount,
      });
      await redisCli.DEL(today);
    });
  } catch (err) {
    logger.error(err);
  }
};
