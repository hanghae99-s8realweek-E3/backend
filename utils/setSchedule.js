const schedule = require("node-schedule");
const { EmailAuth, Count } = require("../models");
const { Op } = require("sequelize");
const logger = require("../utils/logger");
const date = require("./date");
const redisClient = require("./redisConnect");
const redisCli = redisClient.v4;

module.exports = {
  emailAuthTableSchedule: async () => {
    try {
      // 20분 마다 이메일 인증 data 삭제 스케쥴 실행
      schedule.scheduleJob("*/20 * * * *", async () => {
        const past = date.calculateOneHourAgo();

        await EmailAuth.destroy({ where: { createdAt: { [Op.lte]: past } } });
      });
    } catch (err) {
      logger.error(err);
    }
  },
  visitorCountSchedule: async () => {
    try {
      // 23시 58분 59초에 redis에 저장된 방문자 data를 mysql DB에 저장
      schedule.scheduleJob("59 58 23 * * *", async () => {
        const today = date.calculateToday();
        const todayCount = await redisCli.PFCOUNT(today);

        await Count.create({
          date: today,
          Count: todayCount,
        });
        await redisCli.DEL(today);
      });
    } catch (err) {
      logger.error(err);
    }
  },
};
