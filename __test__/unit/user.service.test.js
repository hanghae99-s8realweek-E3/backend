const { User, EmailAuth } = require("../../models");
const UserService = require("../../services/user.service");
const userService = new UserService();
const bcrypt = require("bcrypt");
// const multer = jest.mock("multer");

User.findOne = jest.fn();
EmailAuth.findOne = jest.fn();
// multer.deleteProfile = jest.fn();
bcrypt.compare = jest.fn();
User.findByPk = jest.fn();
describe("회원가입", () => {
  beforeEach(() => {
    email = "test@test.com";
    password = "password123";
    confirmPassword = "password123";
    nickname = "test";
  });

  it("userSignup function이 존재하는가?", () => {
    expect(typeof userService.userSignup).toBe("function");
  });

  it("이미 가입된 이메일이라면 에러메시지", async () => {
    await expect(async () => {
      User.findOne.mockReturnValue({});
      await userService.userSignup(email, password, confirmPassword, nickname);
    }).rejects.toThrowError(new Error("중복된 이메일 입니다."));
  });

  it("비밀번호와 확인비밀번호가 일치 하지 않을 경우 에러메시지", async () => {
    const confirmPassword = "password777"; //확인 비밀번호 틀리게 설정
    await expect(async () => {
      User.findOne.mockReturnValue();
      await userService.userSignup(email, password, confirmPassword, nickname);
    }).rejects.toThrowError(
      new Error("비밀번호와 비밀번호 확인값이 일치 하지 않습니다.")
    );
  });

  it("이메일 인증이 완료 되지 않을 경우 에러 메시지", async () => {
    await expect(async () => {
      User.findOne.mockReturnValue();
      EmailAuth.findOne.mockReturnValue();
      await userService.userSignup(email, password, confirmPassword, nickname);
    }).rejects.toThrowError(new Error("이메일 인증이 완료되지 않았습니다."));
  });
});

describe("로그인", () => {
  it("userLogin function이 존재하는가?", () => {
    expect(typeof userService.userLogin).toBe("function");
  });

  it("로그인시 가입하지 않은 이메일이라면 에러메시지", async () => {
    await expect(async () => {
      const email = "test@test.com";
      const password = "password123";
      User.findOne.mockReturnValue();
      await userService.userLogin(email, password);
    }).rejects.toThrowError(new Error("회원정보가 없습니다."));
  });

  it("비밀번호가 일치 하지 않으면 에러 메시지", async () => {
    await expect(async () => {
      const email = "test@test.com";
      const password = "password123";
      User.findOne.mockReturnValue({});
      bcrypt.compare.mockReturnValue();
      await userService.userLogin(email, password);
    }).rejects.toThrowError(new Error("아이디나 비번이 올바르지 않습니다."));
  });
});

describe("이메일 중복 검사 + 인증메일 발송", () => {
  it("authEmail function이 존재하는가?", () => {
    expect(typeof userService.authEmail).toBe("function");
  });

  it("이미 가입된 이메일이면 에러를 반환한다", () => {
    const email = "test@test.com";
    User.findOne.mockReturnValue({
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
    });
    expect(async () => {
      await userService.authEmail(email);
    }).rejects.toThrowError(new Error("이미 가입된 이메일입니다."));
  });
});

describe("이메일 인증확인", () => {
  it("checkEmailAuth function이 존재하는가?", () => {
    expect(typeof userService.checkEmailAuth).toBe("function");
  });

  it("이메일 정보가 데이터에 없다면", async () => {
    const email = "test@test.com";
    const emailAuthNumber = 123456;
    await expect(async () => {
      EmailAuth.findOne.mockReturnValue();
      await userService.checkEmailAuth(email, emailAuthNumber);
    }).rejects.toThrowError(
      new Error("email 정보가 존재하지 않습니다. 다시 인증 바랍니다.")
    );
  });

  it("입력한 인증번호가 일치 하지 않다면", async () => {
    const email = "test@test.com";
    const emailAuthNumber = 123456;
    await expect(async () => {
      EmailAuth.findOne.mockReturnValue({
        authnumber: 654321,
      });
      await userService.checkEmailAuth(email, emailAuthNumber);
    }).rejects.toThrowError(new Error("인증번호가 일치하지 않습니다."));
  });
});

describe("회원정보 변경", () => {
  it("userInfoChange function이 존재하는가?", () => {
    expect(typeof userService.userInfoChange).toBe("function");
  });
});

describe("프로필 사진 변경", () => {
  it("userProfileChange function이 존재하는가?", () => {
    expect(typeof userService.userProfileChange).toBe("function");
  });

});

describe("회원탈퇴", () => {
  it("userInfoDelete function 존재하는가", () => {
    expect(typeof userService.userInfoDelete).toBe("function");
  });

  it("비밀번호와 확인비밀번호가 일치 하지 않으면 에러메시지 발생", () => {
    const userId = 1;
    const password = "password123";
    expect(async () => {
      User.findByPk.mockReturnValue({ password: "password123" });
      bcrypt.compare.mockReturnValue(); //비밀번호가 같지 않다는 조건으로 값을 리턴
      await userService.userInfoDelete(userId, password);
    }).rejects.toThrowError(
      new Error("아이디 또는 비밀번호가 올바르지 않습니다.")
    );
  });

  it("비밀번호와 확인비밀번호가 일치하면 transaction실행", async () => {
    const userId = 1;
    const password = "password123";
    expect(async () => {
      User.findByPk.mockReturnValue({ password: "password123" });
      bcrypt.compare.mockReturnValue({});
      await userService.userInfoDelete(userId, password);
      expect().toBeCalled();
    });
  });
});
