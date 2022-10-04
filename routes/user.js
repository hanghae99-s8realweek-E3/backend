const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer");

const UserController = require("../controllers/user.controller");
const userController = new UserController();
const { wrapAsyncController } = require("../middlewares/errorHandler");
const authMiddleware = require("../middlewares/authMiddlewares");

// 로컬 회원가입 [POST] /api/accounts/signup
router.post("/signup", wrapAsyncController(userController.signup)); //로컬 회원가입
// mbti 등록 [POST] /api/accounts/mbti
router.post("/mbti", authMiddleware, wrapAsyncController(userController.mbti));
// 로그인 [POST] /api/accounts/login
router.post("/login", wrapAsyncController(userController.login));
// 이메일 중복 검사 + 인증메일 발송 [POST] /api/accounts/emailAuth
router.post("/emailAuth", wrapAsyncController(userController.emailAuth));
// 이메일 인증확인 [POST] /api/accounts/emailAuth/check
router.post("/emailAuth/check", wrapAsyncController(userController.emailAuthCheck));
// 프로필 사진 변경 [PUT] /api/accounts/profile
router.put(
  "/profile",
  authMiddleware,
  multer.uploadProfile.single("profile"),
  wrapAsyncController(userController.changeUserProfile)
);
// 회원 정보 조회 [GET] /api/accounts
router.get("/", authMiddleware, wrapAsyncController(userController.getUserInfo));
// 회원 정보 변경 [PUT] /api/accounts
router.put("/", authMiddleware, wrapAsyncController(userController.changeUserInfo));
// 회원탈퇴 [DELETE] /api/accounts
router.delete("/", authMiddleware, wrapAsyncController(userController.deleteUserInfo));

module.exports = router;
