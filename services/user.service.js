const { User } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();

//이메일 형식
const regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
//비밀번호 글자수 8~20 & 필수 포함 영어, 숫자, 특수문자 2개 이상 혼합
const regexPassword =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&()_+=]{8,20}$/;

class UserService {
  userSignup = async (email, password, confirmpassword, nickname) => {
    const emailCheck = regexEmail.test(email);
    const passwordCheck = regexPassword.test(password);

    if (!emailCheck && !passwordCheck) {
      throw new Error("이메일 비밀번호 형식이 알맞지 않습니다");
    }
    if (password !== confirmpassword) {
      throw new Error("비밀번호와 비밀번호 확인값이 일치 하지 않습니다.");
    }
    const bcr_password = bcrypt.hashSync(password, 10); //비밀번호 암호화
    await User.create({
      email,
      password: bcr_password,
      nickname,
    });
  };

  userLogin = async (email, password) => {
    const userData = await User.findOne({ where: { email: email } });

    if (!email || !password) {
      throw new Error("빈칸을 채워주세요");
    }

    if (!userData) {
      throw new Error("회원정보가 없습니다.");
    }

    const passwordSame = await bcrypt.compare(password, userData.password); //비밀번호 암호화 비교

    if (!passwordSame) {
      throw new Error("아이디나 비번이 올바르지 않습니다.");
    }

    const payload = {
      userId: userData.userId,
      nickName: userData.nickName,
    };

    const token = jwt.sign(payload, process.env.MYSECRET_KEY, {
      expiresIn: "2d",
    });
    return token;
  };

  userMbti = async (mbti) => {
    const userMbti = await User.create({
      mbti,
    });
  };
}

module.exports = UserService;
