const UserService = require("../services/userservice.js");

class UserController {
  userService = new UserService();

  signup = async (res, req) => {
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
    } catch (error) {
      res.status(400).json({
        errorMessage: error,
      });
    }
  };

  login = async (res, req) => {
    try {
      const { email, password } = req.body;
      await this.userService.userLogin(email, password);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(400).json({
        errorMessage: error,
      });
    }
  };
}

module.exports = UserController;
