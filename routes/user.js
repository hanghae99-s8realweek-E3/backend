const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const userController = new UserController();

const authMiddleware = require("../middlewares/auth_middlewares");

// 로컬 회원가입 [POST] /api/accounts/signup
router.post("/signup", userController.signup); //로컬 회원가입
// mbti 등록 [POST] /api/accounts/mbti
router.post("/mbti", authMiddleware, userController.mbti);
// 로그인 [POST] /api/accounts/login
router.post("/login", userController.login);
// 이메일 중복 검사 + 인증메일 발송 [POST] /api/accounts/emailAuth
router.post("/emailAuth", userController.emailAuth);
// 이메일 인증확인 [POST] /api/accounts/emailAuth/check
router.post("/emailAuth/check", userController.emailAuthCheck);
// 회원 정보 조회 [GET] /api/accounts
router.get("/", authMiddleware, userController.getUserInfo);
// 회원 정보 변경 [PUT] /api/accounts
router.put("/", authMiddleware, userController.changeUserInfo);
// 회원탈퇴 [DELETE] /api/accounts
router.delete("/", authMiddleware, userController.deleteUserInfo);

module.exports = router;
