const express = require("express");
const router = express.Router();
const redisCli = require("../app");


// GET
router.get("/asd", async (req, res, next) => {
console.log(redisCli.);
  const papers = await redisCli.get('username');
  res.json({
    papers,

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
