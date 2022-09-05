const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const userController = new UserController();

const authMiddleware = require("../middlewares/auth_middlewares");

router.post("/login", userController.login); //로그인
router.get("/", authMiddleware, userController.getUserInfo); //회원정보조회
router.put("/", authMiddleware, userController.changeUserInfo); //회원정보변경
router.delete("/", authMiddleware, userController.deleteUserInfo); //회원탈퇴(회원정보 삭제)

// router.delete('/kakao', userController.kakao);//카카오로그인

router.post("/signup", userController.signup); //로컬 회원가입
router.post("/mbti", authMiddleware, userController.mbti); //mbti입력

// router.post('/emailAuth', userController.emailAuth);//이메일 중복 검사 + 메일 인증
// router.post('/emailAuth/check', userController.emailAuthCheck);//인증확인

module.exports = router;
