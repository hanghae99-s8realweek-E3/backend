const { createLogger, format, transports } = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
require("dotenv").config();

const logDir = process.env.LOGDIR;
const colorizer = format.colorize();

const logger = createLogger({
  level: "info", // log, info, warn, error 순서 // info면은 info부터 기록됨 (info, warn, error)
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => {
      const prefix = `[${info.level}] - ${info.timestamp}`;
      return `${colorizer.colorize(info.level, prefix)} ${info.message}`;
    })
  ),

  transports: [
    // 로그 저장 방식
    new winstonDaily({
      level: "warn",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/warn",
      filename: `%DATE%.warn.log`, // file 이름 날짜로 저장
      maxFiles: 20, // 20일치 로그 파일 저장
      zippedArchive: true, // 압축 여부
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

// winston-daily-rotate-file 사용 안 할 시 new transports로 설정
// new transports.File은 파일에 저장한다는 뜻
// new transports.Console은 콘솔에 표시한다는 뜻

const stream = {
  write: (message) => {
    const status = Number(message.split(" ")[8]);
    if (status < 400) {
      logger.info(message); //level info
    } else if (400 <= status && status < 500) {
      logger.warn(message); //level warn
    } else if (status >= 500) {
      logger.error(message); //level error
    }
  },
};
// stream으로 morgan이랑 결합해서 사용

logger.add(
  new transports.Console({
    level: process.env.NODE_ENV === "production" ? "warn" : "info",
    format: format.combine(format.colorize(), format.simple()),
  })
);
// simple이면 말그대로 간단하게 메시지 나옴 - json()보다 간단
// production이 아닐 때(개발용일땐) 콘솔에만 표시하기.
// 참고) 콘솔에만 표시할 수도 있고, 파일에 저장할 수도 있고, DB에 넣을 수도 있음

module.exports = { logger, stream };
// 모듈로 export 했으므로 app.js의 라우터 에러 핸들러, 에러 핸들러의 console.log/console.error의 console을 logger로 바꿔서 사용 가능.
// stream -> morgan에 결합

// winston-daily-rotate-file 패키지로 날짜별 관리도 가능 (combined.log를 알아서 날짜별로 저장해줌)
// 참고) winston 말고 aws CloudWatch로 로그 기록 관리 가능
