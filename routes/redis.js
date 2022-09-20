const express = require("express");
const router = express.Router();
const redisClient = require("../redisconnect");
const redisCli = redisClient.v4;
const dayjs = require("dayjs");
const { Count } = require("../models");

const localDate = dayjs().format("YYYY-MM-DD");
const schedule = require("node-schedule");
const logger = require("../logger");

//페이지 방문시 ip기준으로 날짜별 방문자수 redis에 저장
try {
  router.get("/get", async (req, res) => {
    const clientIp = req.ip;
    await redisCli.PFADD(localDate, clientIp);
  });
  //6시간마다 DB로 저장후 redis 비우기
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

module.exports = router;
