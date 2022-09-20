const express = require("express");
const morgan = require("morgan");
const { stream } = require("./logger");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const kakaoPassport = require("./passport/index");
const setSchedule = require("./setSchedule");
const setVisitorsCouSchedule = require("./setVisitorsCouSchedule");
const { routerError, errorHandler } = require("./middlewares/error_handler");
const redis = require("./services/redis.service");
// const redis = require("redis");
const indexRouter = require("./routes");
const { sequelize } = require("./models");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// const redisClient = redis.createClient({
//   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
//   legacyMode: true, // 반드시 설정 !!
// });
// redisClient.on("connect", () => console.info("🟢 Redis 연결 성공!"));
// redisClient.on("error", (err) =>
//   console.error("Redis Client Error", err.message)
// );
// redisClient.connect();

// module.exports = redisClient;

kakaoPassport(app);
setVisitorsCouSchedule();
setSchedule();

// sequelize 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// morgan(로그 관리), hpp(중복된 파라미터 처리 -> production 모드에서만 사용)
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined", { stream }));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan("dev", { stream }));
}

//cors관리
const corsOption = {
  origin: [
    "https://frontend-hanghaee99team3.vercel.app",
    "http://localhost:3000",
  ],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", indexRouter);

// errorHandler
app.use(routerError);
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`🟢 ${port} 포트로 서버가 열렸어요!`);
});
