const { ChallengedTodo, Todo, sequelize } = require("../../models");
const Query = require("../../utils/query");
const { calculateToday } = require("../../utils/date");
const userData = require("../data/userData.json");
const MyTodoController = require("../../services/mytodo.service");
const MytodoRepository = require("../../repositories/mytodo.repository");
const myTodoController = new MyTodoController();
const mytodoRepository = new MytodoRepository();

Todo.findOne = jest.fn();
mytodoRepository.getTodoByTodoId = jest.fn();
ChallengedTodo.findOne = jest.fn();
sequelize.transaction = jest.fn();
sequelize.query = jest.fn();
ChallengedTodo.create = jest.fn();
mytodoRepository.getChallengedTodoByoriginTodoId= jest.fn();

describe("challengedTodoCreate", () => {
  const todayDate = calculateToday();
  beforeEach(() => {
    todoId = userData.todoId;
    userId = userData.userId;
  });

  it("challengedTodoCreate function이 존재하는가?", () => {
    expect(typeof myTodoController.challengedTodoCreate).toBe("function");
  });

  it(" mytodoRepository.getTodoByTodoId function이 존재하는가?", async () => {
      await myTodoController.challengedTodoCreate(todoId, userId);
      expect(typeof mytodoRepository.getTodoByTodoId).toBe("function");
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

  it("mytodoRepository.getChallengedTodoByoriginTodoId 함수가 있는가?", async () => {
      await myTodoController.challengedTodoCreate(todoId, userId);
      expect(typeof mytodoRepository.getChallengedTodoByoriginTodoId).toBe("function");
  });

  it("mytodoRepository.getChallengedTodoByoriginTodoId 함수가 있는가?", async () => {
    const challengedTodoData = chsequelize.query.mockReturnValue([])
    await myTodoController.challengedTodoCreate(todoId, userId);

  });

});
