const joi = require("joi");

class Joi {
  // parameter primaryKey 유효성 검사
  parameterSchema = joi.object({
    userId: joi.string().pattern(/^[0-9]+$/),
    todoId: joi.string().pattern(/^[0-9]+$/),
    commentId: joi.string().pattern(/^[0-9]+$/),
    challengedTodoId: joi.string().pattern(/^[0-9]+$/),
  });

  // 댓글 작성 유효성 검사
  createCommentSchema = joi.object({
    comment: joi.string().min(1).required(),
  });

  // 이메일 인증번호 보내기 유효성 검사
  emailAuthSchema = joi.object({
    email: joi
      .string()
      .pattern(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/)
      .required(),
  });

  // 이메일 인증 번호 확인 유효성 검사
  emailAuthCheckSchema = joi.object({
    email: joi
      .string()
      .pattern(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/)
      .required(),
    emailAuthNumber: joi.number().min(1).required(),
  });

  // 회원 정보 변경 유효성 검사
  changeUserInfoSchema = joi.object({
    password: joi.string().min(1),
    newPassword: joi
      .string()
      .pattern(
        /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&()_+=]{8,20}$/
      ),
    confirmPassword: joi
      .string()
      .pattern(
        /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&()_+=]{8,20}$/
      ),
    nickname: joi.string().min(1),
    profile: joi.string(),
    mbti: joi.string().pattern(/[A-Z]{4}/),
  });

  // 회원탈퇴 유효성 검사
  deleteUserInfoSchema = joi.object({
    password: joi
      .string()
      .pattern(
        /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&()_+=]{8,20}$/
      )
      .required(),
  });

  // 회원가입 유효성 검사
  signupSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
    nickname: joi.string().min(1).required(),
  });

  // mbti 등록 유효성 검사
  mbtiSchema = joi.object({
    mbti: joi
      .string()
      .pattern(/[A-Z]{4}/)
      .required(),
  });

  // 로그인 유효성 검사
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

  // date 유효성 검사
  dateSchema = joi.object({
    date: joi
      .string()
      .pattern(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
      .required(),
  });

  // todo 유효성 검사
  todoSchema = joi.object({
    todo: joi.string().required(),
  });

  // todo 조회 쿼리스트링 유효성 검사
  getTodoListsSchema = joi.object({
    mbti: joi
      .string()
      .pattern(/[A-Z]{4}/)
      .allow(null, ""),
    filter: joi.string().allow(null, ""),
  });
}

module.exports = Joi;
