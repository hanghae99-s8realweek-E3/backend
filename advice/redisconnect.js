const dotenv = require("dotenv");
const redis = require("redis");

dotenv.config(); // env환경변수 파일 가져오기

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true, // 반드시 설정 !!
});
redisClient.on("connect", () => console.info("🟢 Redis 연결 성공!"));
redisClient.on("error", (err) =>
  console.error("Redis Client Error", err.message)
);
redisClient.connect();

module.exports = redisClient;