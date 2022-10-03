const { User } = require("../../models");

const UserService = require("../../services/user.service");
const userService = new UserService();

const userModel = jest.mock("../../models/user");
const bcrypt = jest.mock("bcrypt");
const multer = jest.mock("multer");

User.findOne = jest.fn();
User.update = jest.fn();
User.findByPk = jest.fn();
multer.deleteProfile = jest.fn();

describe("이메일 중복 검사 + 인증메일 발송 API 테스트", () => {
  it("이미 가입된 이메일이면 에러를 반환한다", async () => {
    const email = "test@test.com";
    User.findOne.mockReturnValue(
      Promise.resolve({
        userId: 1,
        email: "test@test.com",
        password: "password",
        nickname: "nickname",
        mbti: "INFP",
        profile: "profile",
        todoCounts: 1,
        challengeCounts: 1,
        snsId: "124234",
        provider: "local",
      })
    );

    await expect(async () => {
      await userService.authEmail(email);
    }).rejects.toThrowError(new Error("이미 가입된 이메일입니다."));
  });
});

// describe("회원 정보 변경 API 테스트", () => {
//   it("비밀번호 변경", async () => {
//     const userId = 1;
//     const password = "password";
//     const newPassword = "pw";
//     const confirmPassword = "pww";
//     const nickname = "nickname";
//     const mbti = "ENFP";
//     await bcrypt.compare.mockReturnValue(true);
//     const userData = { password: "pw" };

//     await expect(async () => {
//       await userService.userInfoChange(
//         userId,
//         password,
//         newPassword,
//         confirmPassword,
//         nickname,
//         mbti
//       );
//     }).rejects.toThrowError(new Error("이미 가입된 이메일입니다."));
//   });
// });

// describe("프로필 사진 변경 API 테스트", () => {
//   it("비밀번호 변경", async () => {
//     const userId = 1;
//     const profile = "profile";
//     // const user = { userId: 1, profile: "profile" };
//     await userService.userProfileChange(userId);
//     await User.findByPk.mockReturnValue({
//       userId: 1,
//       profile: "profile",
//     });

//     expect(multer.deleteProfile).toBeCalled();
//   });
// });
