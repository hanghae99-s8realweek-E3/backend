const { Count } = require("./models");
const schedule = require("node-schedule");
const logger = require("./logger");
const dayjs = require("dayjs");
const redisClient = require("./services/redis.service");
// const redisClient = require("./app");
const localDate = dayjs().format("YYYY-MM-DD");


const redisCli = redisClient.v4;
console.log(redisCli);

module.exports = async () => {
  try {
    schedule.scheduleJob("*/3 * * * * *", async () => {
      const todayCount = await redisCli.PFCOUNT(localDate);
      console.log(todayCount);
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
