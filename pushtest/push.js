const schedule = require("node-schedule");
const logger = require("../logger");
const fetch = require("node-fetch");

// 특정 시간 알림 보내기
module.exports = async () => {
  try {
    const body = {
      to: "ep_0aZ7Mvtc:APA91bEZyYQB3i7raM78yy3MbdHzVkWnHiqHQug9ViDfsFe4OwHkd3BkQEp8BbQaC1HJHqIIDcgWNoBrFrKbsNDlSks73WSfPi3jhH_ttROEsoC58ml8_Ys0fgDRzcgJZRoO5g8vrgbt",
      data: {
        message: "New news story available.",
      },
    };

    schedule.scheduleJob("*/10 * * * * *", async () => {
      await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "key=AAAAx0Yh-pA:APA91bGNJMy7Oojg98fdS6jt9XUU69QSDBgPE7aCPJsSH6hLmJF1ozhiIg4RPjiBeX6s5Hi7cvagjUtu6CgbCaLHx0G4fKf9pj0rwZoq1GtdigiF3AKI1nysYT58VqbazlVflsSpw9Up",
        },
      });
    });
  } catch (err) {
    logger.error(err);
  }
};
