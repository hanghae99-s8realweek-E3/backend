const { ChallengedTodo, Todo, sequelize, User } = require("../../models");
const userData = require("../data/userData.json");
const MyTodoController = require("../../services/mytodo.service");
const myTodoController = new MyTodoController();
const returnChallengedTodoData = require("../data/returnChallengedTodoData.json");
const returnUserData = require("../data/returnUserData.json");


Todo.findOne = jest.fn();
ChallengedTodo.findOne = jest.fn();
sequelize.transaction = jest.fn();
sequelize.query = jest.fn();
ChallengedTodo.create = jest.fn();
User.findOne = jest.fn();

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

describe("challengedTodoDelete", () => {
  beforeEach(() => {
    challengedTodoId = userData.todoId;
    userId = userData.userId;
  });

  it("challengedTodoDelete function이 존재하는가?", () => {
    expect(typeof myTodoController.challengedTodoDelete).toBe("function");
  });

  it("(req)challengedTodoId와 일치하는 데이터가 없다면", async () => {
    await expect(async () => {
      ChallengedTodo.findOne.mockReturnValue();
      await myTodoController.challengedTodoDelete(challengedTodoId, userId);
    }).rejects.toThrowError(
      new Error("삭제되었거나 존재하지 않는 todo 입니다.")
    );
  });

  it("ChallengedTodo 테이블에 (req)challengedTodoId와 일치하는 데이터가 있다면 transaction실행", async () => {
    ChallengedTodo.findOne.mockReturnValue(returnChallengedTodoData);
    await myTodoController.challengedTodoDelete(challengedTodoId, userId);
    expect(sequelize.transaction).toBeCalled();
  });
});

describe("challengedTodoComplete", () => {
  beforeEach(() => {
    challengedTodoId = userData.todoId;
    userId = userData.userId;
  });

  it("challengedTodoDelete function이 존재하는가?", () => {
    expect(typeof myTodoController.challengedTodoComplete).toBe("function");
  });

  it("이용자가 오늘 도전한 todo가 없다면", async () => {
    await expect(async () => {
      ChallengedTodo.findOne.mockReturnValue();
      await myTodoController.challengedTodoDelete(challengedTodoId, userId);
    }).rejects.toThrowError(
      new Error("삭제되었거나 존재하지 않는 todo 입니다.")
    );
  });

  it("이용자가 오늘 도전한 todo가 있다면 transactiont 시작", async () => {
    ChallengedTodo.findOne.mockReturnValue(returnChallengedTodoData);
    await myTodoController.challengedTodoDelete(challengedTodoId, userId);
    expect(sequelize.transaction).toBeCalled();
  });
});

describe("todoCreate", () => {
  beforeEach(() => {
    todoId = userData.todoId;
    userId = userData.userId;
  });

  it("todoCreate function이 존재하는가?", () => {
    expect(typeof myTodoController.todoCreate).toBe("function");
  });

  it("사용자 정보가 없다면", async () => {
    await expect(async () => {
      User.findOne.mockReturnValue();
      await myTodoController.todoCreate(todoId, userId);
    }).rejects.toThrowError(new Error("사용자 정보가 없습니다."));
  });

  it("사용자 정보에 mbti정보가  없다면", async () => {
    await expect(async () => {
      User.findOne.mockReturnValue(returnUserData[0]);
      await myTodoController.todoCreate(todoId, userId);
    }).rejects.toThrowError(new Error("mbti 정보를 등록후 작성바랍니다."));
  });

  it("todo제안할때 필용한 사용자 정보가 다 있다면 transactiont 시작 ", async () => {
    User.findOne.mockReturnValue(returnUserData[1]);
    await myTodoController.todoCreate(todoId, userId);
    expect(sequelize.transaction).toBeCalled();
  });
});

describe("todoDelete", () => {
  beforeEach(() => {
    todoId = userData.todoId;
    userId = userData.userId;
  });

  it("todoCreate function이 존재하는가?", () => {
    expect(typeof myTodoController.todoDelete).toBe("function");
  });

  it("사용자가 제안한 오늘의 제안한 todo가  없다면", async () => {
    await expect(async () => {
      Todo.findOne.mockReturnValue();
      await myTodoController.todoDelete(todoId, userId);
    }).rejects.toThrowError(new Error("이미 삭제되었거나 없는 todo입니다."));
  });

  it("todo제안할때 필용한 사용자 정보가 다 있다면 transactiont 시작 ", async () => {
    User.findOne.mockReturnValue(returnTodoData[1]);
    await myTodoController.todoDelete(todoId, userId);
    expect(sequelize.transaction).toBeCalled();
  });



});

describe("getMyTodo", () => {
  beforeEach(() => {
    todoId = userData.todoId;
    userId = userData.userId;
  });

  it("todoCreate function이 존재하는가?", () => {
    expect(typeof myTodoController.todoDelete).toBe("function");
  });

  it("사용자가 제안한 오늘의 제안한 todo가  없다면", async () => {
    await expect(async () => {
      Todo.findOne.mockReturnValue();
      await myTodoController.todoDelete(todoId, userId);
    }).rejects.toThrowError(new Error("이미 삭제되었거나 없는 todo입니다."));
  });

  it("todo제안할때 필용한 사용자 정보가 다 있다면 transactiont 시작 ", async () => {
    User.findOne.mockReturnValue(returnTodoData[1]);
    await myTodoController.todoDelete(todoId, userId);
    expect(sequelize.transaction).toBeCalled();
  });



});
