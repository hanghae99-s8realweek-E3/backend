const { createLogger, format, transports } = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
require("dotenv").config();

const logDir = process.env.LOGDIR;
const colorizer = format.colorize();

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => {
      const prefix = `[${info.level}] - ${info.timestamp}`;
      return `${colorizer.colorize(info.level, prefix)} ${info.message}`;
    })
  ),

  transports: [
    // 로그 기록 파일로 저장
    new winstonDaily({
      level: "warn",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/warn",
      filename: `%DATE%.warn.log`,
      maxFiles: 20,
      zippedArchive: true,
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

// morgan이랑 결합해서 사용
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

// 콘솔에 표시
logger.add(
  new transports.Console({
    level: process.env.NODE_ENV === "production" ? "warn" : "info",
    format: format.combine(format.colorize(), format.simple()),
  })
);

module.exports = { logger, stream };
