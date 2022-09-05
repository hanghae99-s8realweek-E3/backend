const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info", // log, info, warn, error 순서 // info면은 info부터 기록됨 (info, warn, error)
  format: format.json(), // 로그 시간을 표시하려면 json()말고 timestamp() 사용
  transports: [
    // 로그 저장 방식
    new transports.File({ filename: "combined.log" }),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});

// new transports.File은 파일에 저장한다는 뜻
// new transports.Console은 콘솔에 표시한다는 뜻

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({ format: format.simple() })); // simple이면 말그대로 간단하게 메시지 나옴 - json()보다 간단
}
// production이 아닐 때(개발용일땐) 콘솔에만 표시하기.
// 참고) 콘솔에만 표시할 수도 있고, 파일에 저장할 수도 있고, DB에 넣을 수도 있음

module.exports = logger;
// 모듈로 export 했으므로 app.js의 라우터 에러 핸들러, 에러 핸들러의 console.log/console.error의 console을 logger로 바꿔서 사용 가능.

// winston-daily-rotate-file 패키지로 날짜별 관리도 가능 (combined.log를 알아서 날짜별로 저장해줌)
// 참고) winston 말고 aws CloudWatch로 로그 기록 관리 가능
