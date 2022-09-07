const joi = require("joi");

class Joi {
  //댓글 작성 유효성
  createCommentSchema = joi.object({
    comment: joi.string().min(1).required(),
  });
  //이메일 인증번호 보내기 유효성
  emailAuthSchema = joi.object({
    email: joi
      .string()
      .pattern(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/)
      .required(),
  });
  //이메일인증확인 유효성
  emailAuthCheckSchema = joi.object({
    email: joi
      .string()
      .pattern(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/)
      .required(),
    emailAuthNumber: joi.number().min(1).required(),
  });

  //회원탈퇴 유효성
  deleteUserInfoSchema = joi.object({
    password: joi
      .string()
      .pattern(
        /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&()_+=]{8,20}$/
      )
      .required(),
  });

  //회원가입 유효성
  signupSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
    nickname: joi.string().min(1).required(),
  });

  //mbti유효성
  mbtiSchema = joi.object({
    mbti: joi.string().min(4).required(),
  });

  //로그인 유효성
  loginSchema = joi.object({
    email: joi
      .string()
      .pattern(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/)
      .required(),
    password: joi
      .string()
      .pattern(
        /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&()_+=]{8,20}$/
      )
      .required(),
  });

  //date유효성
  dateSchema = joi.object({
    date: joi.string().required(),
  });


  //todo유효성
  todoSchema = joi.object({
    todo: joi.string().required(),
  });
}

module.exports = Joi;
