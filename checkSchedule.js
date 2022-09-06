const { EmailAuth } = require("./models");
const { Op } = require("sequelize");
const logger = require("./logger");

// emailAuth 테이블이 예기치 못하게 서버가 꺼져 node-schedule이 작동하지 못한 경우를 대비해
// 서버 다시 시작 시 1시간 지난 거 일괄 삭제
module.exports = async () => {
  try {
    const past = new Date();
    past.setHours(past.getHours() - 1); // 1시간 전

    await EmailAuth.destroy({ where: { createdAt: { [Op.lte]: past } } });
  } catch (err) {
    logger.error(err);
  }
};
