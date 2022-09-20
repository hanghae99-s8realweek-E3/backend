const express = require("express");
const router = express.Router();
const redisClient = require("../redisconnect");
const redisCli = redisClient.v4;
const dayjs = require("dayjs");
const { Count } = require("../models");
const localDate = dayjs().format("YYYY-MM-DD");


const schedule = require("node-schedule");
const logger = require("./logger");



//특정 위치로 접속시 사용자의 ip값을 가져온다.
//redis에서 고유값으로 ip값을 저장한다(중복되지 않게)
//날짜 별로 정리를 하여 일일 방문자 수를 파악한다.

//페이지 방문시 ip기준으로 날짜별 방문자수 구하기
router.get("/get", async (req, res, next) => {
  const clientIp = req.ip;
  console.log(clientIp);
  await redisCli.PFADD(localDate, clientIp);
});

// 하루 밤12시에 오늘의 방문자수 DB에 저장하기하고
// radis 데이터 삭제
router.post("/set", async (req, res, next) => {
  const todayCount = await redisCli.PFCOUNT(localDate);
  await Count.create({
    todayCount: todayCount,
  });
  await redisCli.DEL(localDate);
});


// emailAuth 테이블 20분마다 스케쥴 실행 (1시간 지난 데이터 일괄 삭제)
module.exports = async () => {
  try {
    // 20분 마다 스케쥴 실행
    schedule.scheduleJob("* * * * *", async () => {
      const past = new Date();
      past.setHours(past.getHours() - 1); // 1시간 전
      await EmailAuth.destroy({ where: { createdAt: { [Op.lte]: past } } });
    });
  } catch (err) {
    logger.error(err);
  }
};


// // DELETE
// router.delete('/del', (req, res, next) => {
//    // exist : 키가 존재하는지
//    const n = await redisCli.exists('username'); // true: 1 , false: 0
//    if(n) await redisCli.del('username');
// });

// // PUT
// router.put('/rename', (req, res, next) => {
//    // username이라는 키값이 있다면 그 값을 helloname으로 바꿈
//    redisCli.rename('username', 'helloname');
// });

module.exports = router;
