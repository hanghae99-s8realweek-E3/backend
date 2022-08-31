const UserService = require("../services/user.service");

class UserController {
  v

  //회원가입
  signup = async (res, req, next) => {
    try {
      const { email, password, confirmpassword, nickname } = req.body;
      await this.userService.userSignup(
        email,
        password,
        confirmpassword,
        nickname
      );
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  //로그인
  login = async (res, req, next) => {
    try {
      const { email, password } = req.body;
      await this.userService.userLogin(email, password);
      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  //mbti
  mbti = async (res, req, next) => {
    try {
      const { mbti } = req.body;
      await this.userService.userMbti(mbti);
      res.status(201).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  
}

module.exports = UserController;
