const { Todo, Mbti } = require("../../models");

const TodolistService = require("../../services/todolist.service");
const todolistService = new TodolistService();

const todoModel = jest.mock("../../models/todo");

Todo.findByPk = jest.fn();
Mbti.findOne = jest.fn();

describe("상세 todo 조회 API 테스트", () => {
  it("todo 정보가 없으면 에러를 반환한다", async () => {
    const userId = 1;
    const todoId = 1;
    const profile = "profile";

    expect(async () => {
      Todo.findByPk.mockReturnValue();
      await todolistService.todoGet(userId, profile, todoId);
    }).rejects.toThrowError(new Error("존재하지 않거나 삭제된 Todo입니다."));
  });
});

describe("mbti 알고리즘 조회 API 테스트", () => {
  it("userId가 none이면 null을 리턴한다", async () => {
    const userId = "none";
    const mbti = "none";

    expect(await todolistService.mbtiGet(userId, mbti)).toEqual({ mbti: null });
  });
});
