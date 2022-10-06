const {
  Follow,
  ChallengedTodo,
  Todo,
  sequelize,
  User,
} = require("../../models");

const MyTodoController = require("../../services/mytodo.service");
const myTodoController = new MyTodoController();

Todo.findOne = jest.fn();
ChallengedTodo.findOne = jest.fn();
sequelize.transaction = jest.fn();
sequelize.query = jest.fn();
ChallengedTodo.create = jest.fn();
User.findOne = jest.fn();
Follow.findAll = jest.fn();

describe("challengedTodoCreate", () => {
  it("challengedTodoCreate function이 존재하는가?", () => {
    expect(typeof myTodoController.challengedTodoCreate).toBe("function");
  });

  it("Todos 테이블에 입력된 todoId와 일치하는 데이터가 없다면", async () => {
    const todoId = 1;
    const userId = 1;
    await expect(async () => {
      Todo.findOne.mockReturnValue(); //일치하는 데이터가 없음으로 return값없음
      await myTodoController.challengedTodoCreate(todoId, userId);
    }).rejects.toThrowError(new Error("존재하지 않는 todo 입니다."));
  });

  it("Todos 테이블에 입력된 todo데이터에 mbti정보가 없다면", async () => {
    const todoId = 1;
    const userId = 1;
    await expect(async () => {
      Todo.findOne.mockReturnValue({
        userI: 2,
      });
      await myTodoController.challengedTodoCreate(todoId, userId);
    }).rejects.toThrowError(new Error("MBTI 정보 등록바랍니다."));
  });

  it("작성자가 같다면", async () => {
    const todoId = 1;
    const userId = 1;
    await expect(async () => {
      Todo.findOne.mockReturnValue({
        mbti: "ESTJ",
        userId: 1,
      });
      await myTodoController.challengedTodoCreate(todoId, userId);
    }).rejects.toThrowError(new Error("본인 글은 도전할 수 없습니다."));
  });

  it("오늘 등록한 도전이 이미 있다면", async () => {
    const todoId = 1;
    const userId = 1;
    await expect(async () => {
      Todo.findOne.mockReturnValue({
        mbti: "ESTJ",
        userId: 2,
      });
      ChallengedTodo.findOne.mockReturnValue({}); //도전한 데이터가 있을경우 값 return 한 상황
      await myTodoController.challengedTodoCreate(todoId, userId);
    }).rejects.toThrowError(new Error("오늘의 todo가 이미 등록되었습니다."));
  });

  it("예외사항을 다 통과할경우 오늘의 도전 todo 등록가능 ", async () => {
    const todoId = 1;
    const userId = 1;
    Todo.findOne.mockReturnValue({
      mbti: "ESTJ",
      userId: 2,
    });
    ChallengedTodo.findOne.mockReturnValue(); //도전한 데이터가 없는 경우
    await myTodoController.challengedTodoCreate(todoId, userId);
    expect(sequelize.transaction).toBeCalled();
  });
});

describe("challengedTodoDelete", () => {
  beforeEach(() => {
    challengedTodoId = 1;
    userId = 1;
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
    ChallengedTodo.findOne.mockReturnValue({
      challengedTodoId: 721,
      date: "2022-10-02",
      challengedTodo: "미믹 작성",
      isCompleted: false,
      originTodoId: 32088,
      createdAt: "2022-10-02 00:04:21",
      updatedAt: "2022-10-02 00:04:21",
      userId: 2,
    });
    await myTodoController.challengedTodoDelete(challengedTodoId, userId);
    expect(sequelize.transaction).toBeCalled();
  });
});

describe("challengedTodoComplete", () => {
  beforeEach(() => {
    challengedTodoId = 1;
    userId = 1;
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
    ChallengedTodo.findOne.mockReturnValue({
      challengedTodoId: 721,
      date: "2022-10-02",
      challengedTodo: "미믹 작성",
      isCompleted: false,
      originTodoId: 32088,
      createdAt: "2022-10-02 00:04:21",
      updatedAt: "2022-10-02 00:04:21",
      userId: 2,
    });
    await myTodoController.challengedTodoDelete(challengedTodoId, userId);
    expect(sequelize.transaction).toBeCalled();
  });
});

describe("todoCreate", () => {
  beforeEach(() => {
    todoId = 1;
    userId = 1;
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
      User.findOne.mockReturnValue({
        userI: 2,
        email: "dyswns22@kakao.com",
        password:
          "$2b$09$VsgtZ4HaDNwdcCUBYk7IGOMZYKCbZLM9Md/fGI3lg59ZBKX12MolK",
        nickname: "서우혁2",
        profile: "none",
        todoCounts: 1,
        challengeCount: 0,
        snsId: null,
        provider: "local",
        createdAt: "2022-09-27 02:52:48",
        updatedAt: "2022-10-02 00:46:45",
      });
      await myTodoController.todoCreate(todoId, userId);
    }).rejects.toThrowError(new Error("mbti 정보를 등록후 작성바랍니다."));
  });

  it("사용자가 오늘의 todo작성을 이미 했다면 ", async () => {
    await expect(async () => {
      User.findOne.mockReturnValue({
        userI: 2,
        email: "dyswns22@kakao.com",
        password:
          "$2b$09$VsgtZ4HaDNwdcCUBYk7IGOMZYKCbZLM9Md/fGI3lg59ZBKX12MolK",
        nickname: "서우혁2",
        mbti: "ESTJ",
        profile: "none",
        todoCounts: 1,
        challengeCount: 0,
        snsId: null,
        provider: "local",
        createdAt: "2022-09-27 02:52:48",
        updatedAt: "2022-10-02 00:46:45",
      });
      Todo.findOne.mockReturnValue({});
      await myTodoController.todoCreate(todoId, userId);
    }).rejects.toThrowError(new Error("오늘의 todo 작성을 이미 하셨습니다."));
  });

  it("사용자가 오늘의 todo작성을 하지 않았다면", async () => {
    User.findOne.mockReturnValue({
      userI: 2,
      email: "dyswns22@kakao.com",
      password: "$2b$09$VsgtZ4HaDNwdcCUBYk7IGOMZYKCbZLM9Md/fGI3lg59ZBKX12MolK",
      nickname: "서우혁2",
      mbti: "ESTJ",
      profile: "none",
      todoCounts: 1,
      challengeCount: 0,
      snsId: null,
      provider: "local",
      createdAt: "2022-09-27 02:52:48",
      updatedAt: "2022-10-02 00:46:45",
    });
    Todo.findOne.mockReturnValue();
    await myTodoController.todoCreate(todoId, userId);
    expect(sequelize.transaction).toBeCalled();
  });
});

describe("todoDelete", () => {
  beforeEach(() => {
    todoId = 1;
    userId = 1;
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
    Todo.findOne.mockReturnValue({
      todoId: 32089,
      mbti: "ESTJ",
      date: "2022-10-02",
      todo: "미믹 작성",
      commentCounts: 0,
      challengedCounts: 0,
      createdAt: "2022-10-02 01:32:02",
      updatedAt: "2022-10-02 01:32:02",
      userId: 2,
    });
    await myTodoController.todoDelete(todoId, userId);
    expect(sequelize.transaction).toBeCalled();
  });
});

describe("getMyTodo", () => {
  beforeEach(() => {
    userId = 1;
    date = 1;
  });

  it("todoCreate function이 존재하는가?", () => {
    expect(typeof myTodoController.getMyTodo).toBe("function");
  });
});

describe("getUserTodo", () => {
  it("todoCreate function이 존재하는가?", () => {
    expect(typeof myTodoController.getMyTodo).toBe("function");
  });
});
