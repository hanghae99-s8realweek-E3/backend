const schedule = require("node-schedule");
const logger = require("../logger");
const fetch = require("node-fetch");

// 특정 시간 알림 보내기
module.exports = async () => {
  try {
    const body = {
      registration_ids:[],
      to: "f9cva60sylc:APA91bHRwkHHZOtoXE31yu55JbFqwzXpjRflYK-Dcjy6L09WU4g4PpCt2jDYv6r5tCqFdGENSMmyWD4XiMvYccuZfIRS-y-nDl-_jZC7YItRqSQkGmWWhxhyzGKV6mq9Oi7Op5RrO6h3",
      data: {
        message: "New news story available.",
      },
    };

    schedule.scheduleJob("*/3 * * * * *", async () => {
      const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "key=AAAAx0Yh-pA:APA91bGNJMy7Oojg98fdS6jt9XUU69QSDBgPE7aCPJsSH6hLmJF1ozhiIg4RPjiBeX6s5Hi7cvagjUtu6CgbCaLHx0G4fKf9pj0rwZoq1GtdigiF3AKI1nysYT58VqbazlVflsSpw9Up",
        },
      });
      const data = await response.json();
      console.log(data);
    });
  } catch (err) {
    logger.error(err);
  }
};
