const UserService = require("../services/user.service");
const Joi = require("../utils/joi");

class UserController {
  userService = new UserService();
  joi = new Joi();

  // 로컬 회원가입 [POST] /api/accounts/signup
  signup = async (req, res) => {
    const { email, password, confirmPassword, nickname } =
      await this.joi.signupSchema.validateAsync(req.body);

    const token = await this.userService.userSignup(
      email,
      password,
      confirmPassword,
      nickname
    );

    res.status(201).json({
      token,
      message: "success",
    });
  };

  // mbti 등록 [POST] /api/accounts/mbti
  mbti = async (req, res) => {
    const { mbti } = await this.joi.mbtiSchema.validateAsync(req.body);
    const { userId } = res.locals.user;

    const token = await this.userService.userMbti(mbti, userId);

    res.status(201).json({
      token,
      message: "success",
    });
  };

  // 로그인 [POST] /api/accounts/login
  login = async (req, res) => {
    const { email, password } = await this.joi.loginSchema.validateAsync(
      req.body
    );

    const token = await this.userService.userLogin(email, password);

    res.status(200).json({
      token,
      message: "success",
    });
  };

  // 이메일 중복 검사 + 인증메일 발송 [POST] /api/accounts/emailAuth
  emailAuth = async (req, res) => {
    const { email } = await this.joi.emailAuthSchema.validateAsync(req.body);

    await this.userService.authEmail(email);

    res.status(200).json({ message: "success" });
  };

  // 이메일 인증확인 [POST] /api/accounts/emailAuth/check
  emailAuthCheck = async (req, res) => {
    const { email, emailAuthNumber } =
      await this.joi.emailAuthCheckSchema.validateAsync(req.body);

    await this.userService.checkEmailAuth(email, emailAuthNumber);

    res.status(200).json({ message: "success" });
  };

  // 회원 정보 조회 [GET] /api/accounts
  getUserInfo = async (req, res) => {
    const { userId } = res.locals.user;

    const userInfo = await this.userService.userInfoGet(userId);

    res.status(200).json({ message: "success", userInfo });
  };

  // 회원 정보 변경 [PUT] /api/accounts
  changeUserInfo = async (req, res) => {
    const { userId } = res.locals.user;
    const { password, newPassword, confirmPassword, nickname, mbti } =
      await this.joi.changeUserInfoSchema.validateAsync(req.body);

    const token = await this.userService.userInfoChange(
      userId,
      password,
      newPassword,
      confirmPassword,
      nickname,
      mbti
    );

    res.status(200).json({ message: "success", token });
  };

  // 프로필 사진 변경 [PUT] /api/accounts/profile
  changeUserProfile = async (req, res) => {
    const { userId } = res.locals.user;
    const beforeResizingProfile = req.file.location;
    const profile = beforeResizingProfile.replace(
      /\/mimic\//,
      "/resizingMimic/"
    );

    const token = await this.userService.userProfileChange(userId, profile);

    res.status(200).json({ message: "success", token });
  };

  // 회원탈퇴 [DELETE] /api/accounts
  deleteUserInfo = async (req, res) => {
    const { userId } = res.locals.user;
    const { password } = await this.joi.deleteUserInfoSchema.validateAsync(
      req.body
    );

    await this.userService.userInfoDelete(userId, password);

    res.status(200).json({ message: "success" });
  };
}

module.exports = UserController;
