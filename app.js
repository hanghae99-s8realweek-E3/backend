const express = require("express");
const morgan = require("morgan");
const { stream } = require("./logger");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const kakaoPassport = require("./passport/index");
const setSchedule = require("./setSchedule");
const { routerError, errorHandler } = require("./middlewares/error_handler");
const indexRouter = require("./routes");
const { sequelize } = require("./models");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
kakaoPassport(app);
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

app.listen(port, () => {
  console.log(`🟢 ${port} 포트로 서버가 열렸어요!`);
});
