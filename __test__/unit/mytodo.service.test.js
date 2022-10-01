const { ChallengedTodo, Todo, sequelize } = require("../../models");

const userData = require("../data/userData.json");
const MyTodoController = require("../../services/mytodo.service");

const myTodoController = new MyTodoController();

Todo.findOne = jest.fn();

ChallengedTodo.findOne = jest.fn();
sequelize.transaction = jest.fn();
sequelize.query = jest.fn();
ChallengedTodo.create = jest.fn();

describe("challengedTodoCreate", () => {
  beforeEach(() => {
    todoId = userData.todoId;
    userId = userData.userId;
  });

  it("challengedTodoCreate function이 존재하는가?", () => {
    expect(typeof myTodoController.challengedTodoCreate).toBe("function");
  });

  it("Todos 테이블에 입력된 todoId와 일치하는 데이터가 없다면", async () => {
    await expect(async () => {
      Todo.findOne.mockReturnValue();
      await myTodoController.challengedTodoCreate(todoId, userId);
    }).rejects.toThrowError(new Error("존재하지 않는 todo 입니다."));
  });

  it("Todos 테이블에 입력된 todo데이터에 mbti정보가 없다면", async () => {
    await expect(async () => {
      Todo.findOne.mockReturnValue({
        userId: 1,
      });
      await myTodoController.challengedTodoCreate(todoId, userId);
    }).rejects.toThrowError(new Error("MBTI 정보 등록바랍니다."));
  });

  it("작성자가 같다면", async () => {
    await expect(async () => {
      Todo.findOne.mockReturnValue({
        mbti: "ESTJ",
        userId: 1,
      });
      await myTodoController.challengedTodoCreate(todoId, userId);
    }).rejects.toThrowError(new Error("본인 글은 도전할 수 없습니다."));
  });

  beforeEach(() => {
    Todo.findOne.mockReturnValue({
      mbti: "ESTJ",
      userId: 2,
    });
  });

  it("오늘 등록한 도전이 이미 있다면", async () => {
    await expect(async () => {
      ChallengedTodo.findOne.mockReturnValue({});
      await myTodoController.challengedTodoCreate(todoId, userId);
    }).rejects.toThrowError(new Error("오늘의 todo가 이미 등록되었습니다."));
  });

  it("transaction function이 실행되는지 ", async () => {
    ChallengedTodo.findOne.mockReturnValue();
    await myTodoController.challengedTodoCreate(todoId, userId);
    expect(sequelize.transaction).toBeCalled();
  });
});
