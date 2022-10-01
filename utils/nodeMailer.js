const nodemailer = require("nodemailer");
const { EmailAuth } = require("../models");

const sendEmail = (email) => {
  // 최대 6자리의 난수
  const authNumber = Math.floor(Math.random() * 1000000);

  // 인증번호 전송
  const configOptions = {
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    maxConnections: 50,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  };
  const emailForm = {
    from: process.env.NODEMAILER_USER, // sender address
    to: email, // list of receivers
    subject: "MIMIC 이메일 인증",
    text: "MIMIC",
    html: `<h1>[ MIMIC 이메일 인증 안내 ]</h1>
          <h2><sup>당신의 하루, 그리고 나의 하루. MIMIC🎯</sup></h2>
          <p>안녕하세요. MIMIC 이메일 인증을 위한 메일입니다.</p>
          <p>인증 번호는 1시간 후에 만료됩니다. 1시간 내로 입력해 주시기 바랍니다.</p>
          <h3>• 인증번호</h3><p>
          <strong><span style="color: rgb(53, 152, 219);" data-mce-style="color: #3598db;">${authNumber}</span></strong></p>
          <p><sub>∗ 인증 번호 유효 시간이 지난 경우, 다시 신청 후 진행해 주세요.</sub></p>`,
  };
  const transporter = nodemailer.createTransport(configOptions);
  transporter.sendMail(emailForm);
  EmailAuth.create({ email, authNumber });
};

module.exports = sendEmail;
