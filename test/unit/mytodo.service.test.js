const { ChallengedTodo, Todo, sequelize } = require("../../models");
const Query = require("../../utils/query");
query = new Query();
const MyTodoController = require("../../services/mytodo.service");
const myTodoController = new MyTodoController();
const userData = require("../data/userData.json");
const todoData = require("../data/userData.json");

Todo.findOne = jest.fn();
ChallengedTodo.findOne = jest.fn();
sequelize.query = jest.fn();
ChallengedTodo.create = jest.fn();
Todo.update = jest.fn();

describe("challengedTodoCreate", () => {
  beforeEach(() => {
    todoId = userData.todoId;
    userId = userData.userId;
  });

  it("challengedTodoCreate function이 존재하는가?", () => {
    expect(typeof myTodoController.challengedTodoCreate).toBe("function");
  });


  //불러와지는지 체크 하고 
  it("Todo.findOne이 올바르게 작동하는지 테스트(올바르게 되었을때)", async () => {
      await myTodoController.challengedTodoCreate(todoId, userId);

  });

  it("Todo.findOne의 올바르게 되었을때)", async () => {
    try {
      Todo.findOne.mockReturnValue({ mbti: "ESTJ", userId: 1 });
      await myTodoController.challengedTodoCreate(todoId, userId);
    } catch (error) {
      expect(error).toStrictEqual(new Error("본인 글은 도전할 수 없습니다."));
    }
  });


});
