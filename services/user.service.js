const { User, Follow } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Boom = require("boom");

//이메일 형식
const regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
//비밀번호 글자수 8~20 & 필수 포함 영어, 숫자, 특수문자 2개 이상 혼합
const regexPassword =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&()_+=]{8,20}$/;

class UserService {
  userSignup = async (email, password, confirmpassword, nickname) => {
    const emailCheck = regexEmail.test(email);
    const passwordCheck = regexPassword.test(password);
    const duplicateCheck = await User.findOne({ where: { email: email } });

    if (duplicateCheck) {
      throw new Error("중복된 이메일 입니다.");
    }
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

    const userData = await User.findOne({ where: { email: email } });
    const userId = userData.userId;
    const mbti = userData.mbti;

    const payload = {
      userId: userId,
      nickname: nickname,
      mbti: mbti,
    };

    const token = jwt.sign(payload, process.env.MYSECRET_KEY, {
      expiresIn: "2d",
    });

    return token;
  };

  userMbti = async (mbti, userId) => {
    await User.update({ mbti: mbti }, { where: { userId: userId } });
    return;
  };

  userLogin = async (email, password) => {
    const userData = await User.findOne({ where: { email: email } });
    const userId = userData.userId;
    const nickname = userData.nickname;
    const mbti = userData.mbti;

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
      userId: userId,
      nickname: nickname,
      mbti: mbti,
    };

    const token = jwt.sign(payload, process.env.MYSECRET_KEY, {
      expiresIn: "2d",
    });

    return token;
  };

  getUserInfo = async (userId) => {
    const userData = await User.findByPk(userId);

    const myfolloing = await Follow.findAll({
      where: { userIdFollower: userId },
    });

    const myfollower = await Follow.findAll({
      where: { userIdFollowing: userId },
    });

    return {
      userId: userData.userId,
      mbti: userData.mbti,
      nickname: userData.nickname,
      profile: userData.profile,
      following: myfolloing.length,
      follower: myfollower.length,
    };
  };

  changeUserInfo = async (
    userId,
    password,
    confirmPassword,
    nickname,
    profile,
    mbti
  ) => {
    const userData = await User.findByPk(userId);

    if (password) {
      if (password !== confirmPassword) {
        // const error = new Error(
        //   "비밀번호와 비밀번호 확인값이 일치 하지 않습니다."
        // );
        // error.code = 400;
        // throw error;
        // 이래서 에러 핸들러 라이브러리를 쓰는군... 언제 하나하나 다 정의하고 코드 넣어주고 던지나... Boom 쓸 이유가 생겼다
        throw new Error("비밀번호와 비밀번호 확인값이 일치 하지 않습니다.");
      }

      // const compareResult = await bcrypt.compare(password, userData.password);
      // if (compareResult) {
      //   throw new Error("기존 비밀번호와 동일한 비밀번호입니다.");
      // }

      const hash = bcrypt.hashSync(password, parseInt(process.env.SALT));
      await User.update({ password: hash }, { where: { userId } });
    }

    if (nickname) {
      // if (nickname === userData.nickname) {
      //   throw new Error("기존 닉네임과 동일한 닉네임입니다.");
      // }

      await User.update({ nickname }, { where: { userId } });
    }

    if (profile) {
      await User.update({ profile }, { where: { userId } });
    }

    if (mbti) {
      // if (mbti === userData.mbti) {
      //   throw new Error("기존 MBTI와 동일한 MBTI입니다.");
      // }
      await User.update({ mbti }, { where: { userId } });
    }
  };

  deleteUserInfo = async (userId, password) => {
    const userData = await User.findByPk(userId);

    const compareResult = await bcrypt.compare(password, userData.password);
    if (!compareResult) {
      throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
    }

    return await User.destroy({ where: { userId } });
  };
}

module.exports = UserService;
