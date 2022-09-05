const express = require("express");
const router = express.Router();
const passport = require("passport");

const socialLoginController = require("../controllers/socialLogin.controller");

//passport-kakao Login [GET] /api/accounts/kakao
router.get("/kakao", passport.authenticate("kakao"));
router.get("/auth/kakao/callback", socialLoginController.kakaologin);

module.exports = router;
