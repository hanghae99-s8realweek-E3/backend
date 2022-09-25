const schedule = require("node-schedule");
const { EmailAuth } = require("./models");
const { Op } = require("sequelize");
const logger = require("./logger");
const date = require("./utils/date");

// emailAuth 테이블 20분마다 스케쥴 실행 (1시간 지난 데이터 일괄 삭제)
module.exports = async () => {
  try {
    // 20분 마다 스케쥴 실행
    schedule.scheduleJob("*/20 * * * *", async () => {
      const past = date.calculateOneHourAgo();
      await EmailAuth.destroy({ where: { createdAt: { [Op.lte]: past } } });
    });
  } catch (err) {
    logger.error(err);
  }
};
