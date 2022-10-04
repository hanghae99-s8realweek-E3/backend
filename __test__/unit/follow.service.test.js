const { sequelize, User } = require("../../models");
const followService = require("../../services/follow.service");
const FollowService = new followService();

User.findByPk = jest.fn();
sequelize.transaction = jest.fn();
sequelize.query = jest.fn();

describe("followListGet", () => {
  it("followListGet function이 존재하는가?", () => {
    expect(typeof FollowService.followListGet).toBe("function");
  });

  it("팔로우 목록 조회하려는 사용자의 정보가 없다면", async () => {
    const userId = 1;
    await expect(async () => {
      User.findByPk.mockReturnValue(); //사용자의 정보가 없을경우
      await FollowService.followListGet(userId);
    }).rejects.toThrowError(new Error("존재하지 않는 사용자 입니다."));
  });
});

describe("followListEdit", () => {
  it("followListEdit function이 존재하는가?", () => {
    expect(typeof FollowService.followListEdit).toBe("function");
  });

  it("팔로우 목록 추가 삭제 할경우 사용자의 정보가 없다면 에러메시지 전송", async () => {
    const userId = 1;
    const elseUserId = 2;
    await expect(async () => {
      User.findByPk.mockReturnValue(); //사용자의 정보가 없을경우
      await FollowService.followListEdit(userId, elseUserId);
    }).rejects.toThrowError(new Error("존재하지 않는 사용자 입니다."));
  });

  it("자기 자신을 팔로우 요청 발생시 에러메시지 전송", async () => {
    const userId = 1;
    const elseUserId = 1;
    await expect(async () => {
      User.findByPk.mockReturnValue({}); //사용자의 정보가 있을경우
      await FollowService.followListEdit(userId, elseUserId);
    }).rejects.toThrowError(new Error("자기 자신은 팔로우를 하지 못합니다."));
  });
});
