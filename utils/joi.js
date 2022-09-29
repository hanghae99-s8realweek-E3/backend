const joi = require("joi");

const numberRegex = /^[0-9]+$/;
const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
const passwordRegex =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&()_+=]{8,20}$/;
const dateRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
const mbtiRegex = /[A-Z]{4}/;

class Joi {
  // parameter primaryKey 유효성 검사
  parameterSchema = joi.object({
    userId: joi.string().pattern(numberRegex),
    todoId: joi.string().pattern(numberRegex),
    commentId: joi.string().pattern(numberRegex),
    challengedTodoId: joi.string().pattern(numberRegex),
  });

  // 카카오 연결끊기 쿼리(user_id) 유효성 검사
  kakaoLeaveQuerySchema = joi.string().pattern(numberRegex).required();

  // 댓글 작성 유효성 검사
  createCommentSchema = joi.object({
    comment: joi.string().min(1).max(160).trim().required(),
  });

  // 이메일 인증번호 보내기 유효성 검사
  emailAuthSchema = joi.object({
    email: joi.string().pattern(emailRegex).required(),
  });

  // 이메일 인증 번호 확인 유효성 검사
  emailAuthCheckSchema = joi.object({
    email: joi.string().pattern(emailRegex).required(),
    emailAuthNumber: joi.number().min(1).required(),
  });

  // 회원 정보 변경 유효성 검사
  changeUserInfoSchema = joi.object({
    password: joi.string().min(1),
    newPassword: joi.string().pattern(passwordRegex),
    confirmPassword: joi.string().pattern(passwordRegex),
    nickname: joi.string().min(1).max(12).trim(),
    mbti: joi.string().pattern(mbtiRegex),
  });

  // 회원탈퇴 유효성 검사
  deleteUserInfoSchema = joi.object({
    password: joi.string().pattern(passwordRegex).required(),
  });

  // 회원가입 유효성 검사
  signupSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().pattern(passwordRegex).required(),
    confirmPassword: joi.string().pattern(passwordRegex).required(),
    nickname: joi.string().min(1).max(12).trim().required(),
  });

  // mbti 등록 유효성 검사
  mbtiSchema = joi.object({
    mbti: joi.string().pattern(mbtiRegex).required(),
  });

  // 로그인 유효성 검사
  loginSchema = joi.object({
    email: joi.string().pattern(emailRegex).required(),
    password: joi.string().pattern(passwordRegex).required(),
  });

  // date 유효성 검사
  dateSchema = joi.object({
    date: joi.string().pattern(dateRegex).required(),
  });

  // todo 유효성 검사
  todoSchema = joi.object({
    todo: joi.string().min(1).max(30).trim().required(),
  });

  // todo 조회 쿼리스트링 유효성 검사
  getTodoListsSchema = joi.object({
    mbti: joi.string().pattern(mbtiRegex).allow(null, ""),
    filter: joi.string().allow(null, ""),
  });
}

module.exports = Joi;
