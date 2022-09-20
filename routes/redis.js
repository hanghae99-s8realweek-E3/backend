const express = require("express");
const router = express.Router();
const redisClient = require("../redisconnect");
const redisCli = redisClient.v4;

// GET
router.get("/get", async (req, res, next) => {
  const clientIp = req.ip
  console.log(clientIp);
  await redisCli.set("name", clientIp);
  const ip = await redisCli.get("name"); // nyong
  res.json({
    ip,
  });
});

// POST
router.post("/set", async (req, res, next) => {
  console.log(2);
  await redisCli.set("username", "inpa");
});

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
