const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs().tz("Asia/Seoul");

const calculateToday = () => {
  return dayjs().format("YYYY-MM-DD");
};

const calculateYesterdayMidnight = () => {
  return dayjs().subtract(1, "day").startOf("day");
};

const calculateOneHourAgo = () => {
  return dayjs().subtract(1, "hour");
};

module.exports = {
  calculateToday,
  calculateYesterdayMidnight,
  calculateOneHourAgo,
};
