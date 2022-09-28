const express = require("express");
const morgan = require("morgan");
const { stream } = require("./utils/logger");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const indexRouter = require("./routes");
const kakaoPassport = require("./passport/index");
const { sequelize } = require("./models");
const { routerError, errorHandler } = require("./middlewares/error_handler");
const {
  emailAuthTableSchedule,
  visitorCountSchedule,
} = require("./utils/setSchedule");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const corsOption = {
  origin: [
    "https://www.todaysmimic.today",
    "https://todaysmimic.today",
    "http://localhost:3000",
  ],
  credentials: true,
};

kakaoPassport(app);
emailAuthTableSchedule();
visitorCountSchedule();

// sequelize 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// ip 주소가 프록시 서버로 등록 되는 것 방지
app.set("trust proxy", true);

// morgan(로그 관리), hpp(중복된 파라미터 처리)
app.use(morgan("combined", { stream }));
app.use(helmet());
app.use(hpp());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// router
app.use("/api", indexRouter);

// errorHandler
app.use(routerError);
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`🟢 ${port} 포트로 서버가 열렸어요!`);
});
