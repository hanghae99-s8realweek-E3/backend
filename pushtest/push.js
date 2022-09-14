const schedule = require("node-schedule");
const logger = require("../logger");
const fetch = require("node-fetch");



module.exports = async () => {
  //알림에 들어갈내용
  try {
    const body = {
      //메세지 받을 클라이어튼 토큰 입력
      to: "dcGZ3YHCtGk:APA91bE-Mm2d7qJHDgT1_lW3-VLcVd77g_sntzO26BM6gzZozOL5PLfM4xiIv-O4H2TaMQds0XxtXTv5nb4TdseqRDNcE6BMj0865-JmVWFw0j5dVKSf28kUjh14MpYCX-3tS7N5VDuZ",
      // data: {
      //   message: "페이지 꺼졌을때 메시지",
      // },
      notification: {
        title: "페이지 꺼졌을때 타이틀",//메세지 제목
        body: "안쪽",//메세지 내용
        click_action: "https://naver.com",//클릭시 홈페이지 이동
        icon: '/firebase-logo.png',//사용자 프로필 오면 좋을듯
      },
    };

    // 특정 시간 알림 보내기
    schedule.scheduleJob("*/6 * * * * *", async () => {
      console.log("메세지 전송 성공");
      //fcm서버에 http 통신을 통해 위 알림내용 보내기
      await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "post",
        body: JSON.stringify(body),
        headers: {//보내는 양식
          "Content-Type": "application/json",
          Authorization://서버키 입력
            "key=AAAAx0Yh-pA:APA91bGNJMy7Oojg98fdS6jt9XUU69QSDBgPE7aCPJsSH6hLmJF1ozhiIg4RPjiBeX6s5Hi7cvagjUtu6CgbCaLHx0G4fKf9pj0rwZoq1GtdigiF3AKI1nysYT58VqbazlVflsSpw9Up",
        },
      });
    });
  } catch (err) {
    logger.error(err);
  }
};
