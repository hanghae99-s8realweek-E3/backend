const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();
  //회원가입=====ok
  signup = async (req, res, next) => {
    try {
      const { email, password, confirmpassword, nickname } = req.body;
      const token = await this.userService.userSignup(
        email,
        password,
        confirmpassword,
        nickname
      );
      res.status(201).json({
        token,
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  //mbti====ok
  mbti = async (req, res, next) => {
    try {
      const { mbti } = req.body;
      const { userId } = res.locals.user;
      await this.userService.userMbti(mbti, userId);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  //로그인 ====ok
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await this.userService.userLogin(email, password);
      res.status(200).json({
        token,
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  // 회원 정보 조회
  getUserInfo = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;

      const userInfo = await this.userService.getUserInfo(userId);

      res.status(200).json({ message: "success", userInfo });
    } catch (err) {
      next(err);
    }
  };

  // 회원 정보 변경
  changeUserInfo = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { password, confirmPassword, nickname, profile, mbti } = req.body;

      await this.userService.changeUserInfo(
        userId,
        password,
        confirmPassword,
        nickname,
        profile,
        mbti
      );

      res.status(200).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  };

  // 회원탈퇴
  deleteUserInfo = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { password } = req.body;

      await this.userService.deleteUserInfo(userId, password);

      res.status(200).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
