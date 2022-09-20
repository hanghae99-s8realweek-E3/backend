const { Count } = require("./models");
const schedule = require("node-schedule");
const logger = require("./logger");
const dayjs = require("dayjs");
const redisClient = require("./advice/redisconnect");
const localDate = dayjs().format("YYYY-MM-DD");

const redisCli = redisClient.v4;
// console.log(redisClient);

module.exports = async () => {
  try {
    //6시간마다 redis data DB에 저장
    schedule.scheduleJob("* * */6 * * *", async () => {
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
