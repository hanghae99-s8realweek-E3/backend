const express = require("express");
const router = express.Router();
const passport = require("passport");

const socialLoginController = require("../controllers/socialLogin.controller");
const { wrapAsyncController } = require("../middlewares/errorHandler");

// passport-kakao Login [GET] /api/accounts/kakao
router.get("/kakao", passport.authenticate("kakao"));
// passport-kakao callback
router.get("/auth/kakao/callback", socialLoginController.kakaoLogin);
// passport-kakao 연결끊기 콜백 API
router.get("/auth/kakao/leave", wrapAsyncController(socialLoginController.deleteKakao));

module.exports = router;
