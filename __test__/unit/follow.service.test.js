const { ChallengedTodo, Todo, sequelize, User } = require("../../models");
const userData = require("../data/userData.json");
const followService = require("../../services/follow.service");
const FollowService = new followService();


User.findByPk = jest.fn();
sequelize.transaction = jest.fn();
sequelize.query = jest.fn();
ChallengedTodo.create = jest.fn();
User.findOne = jest.fn();

describe("challengedTodoCreate", () => {
  beforeEach(() => {
    userId = userData.userId;
  });

  it("challengedTodoCreate function이 존재하는가?", () => {
    expect(typeof FollowService.followListGet).toBe("function");
  });

  it("사용자 정보가 없다면", async () => {
    await expect(async () => {
      User.findByPk.mockReturnValue();
      await FollowService.followListGet(userId);
    }).rejects.toThrowError(new Error("존재하지 않는 사용자 입니다."));
  });

});
