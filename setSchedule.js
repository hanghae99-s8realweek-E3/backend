const schedule = require("node-schedule");
const { EmailAuth } = require("./models");
const { Op } = require("sequelize");
const logger = require("./logger");

// emailAuth 테이블 10분마다 스케쥴 실행 (1시간 지난 데이터 일괄 삭제)
module.exports = async () => {
  try {
    const past = new Date();
    past.setHours(past.getHours() - 1); // 1시간 전

    // 10분 마다 스케쥴 실행
    schedule.scheduleJob("*/10 * * * *", async () => {
      await EmailAuth.destroy({ where: { createdAt: { [Op.lte]: past } } });
    });
  } catch (err) {
    logger.error(err);
  }
};
