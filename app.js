const express = require("express");
const Http = require("http");
// const Https = require("https");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { stream } = require("./logger");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const kakaoPassport = require("./passport/index");
const checkSchedule = require("./checkSchedule");
const { routerError, errorHandler } = require("./middlewares/error_handler");
const indexRouter = require("./routes");
const { sequelize } = require("./models");
require("dotenv").config();

const app = express();
kakaoPassport(app);
checkSchedule();
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

const http = Http.createServer(app);
// const https = Https.createServer(options, app);

const http_port = process.env.HTTP_PORT || 4000;
// const https_port = process.env.HTTPS_PORT || 443;
// const port = process.env.Port;

const corsOption = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", indexRouter);

// errorHandler
app.use(routerError);
app.use(errorHandler);

http.listen(http_port, () => {
  console.log(`🟢 ${http_port} 포트로 서버가 열렸어요!`);
});

// https.listen(https_port, () => {
//   console.log(`Start listen Server: ${https_port}`);
// });
