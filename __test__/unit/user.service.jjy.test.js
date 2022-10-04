const { User } = require("../../models");

const UserService = require("../../services/user.service");
const userService = new UserService();

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
    }).rejects.toThrowError(new Error("이미  이메일입니다."));
  });
});

