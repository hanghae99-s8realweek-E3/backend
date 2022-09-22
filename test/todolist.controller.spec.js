//user.controller를 테스틑 하기위해 클래스 import
const TodoListController = require("../controllers/todolist.controller");

//가상의 객체를 생성해주는 모듈 import
// const httpMocks = require("node-mocks-http");

//테스트를 위해 클래스의 인스턴스 생성
const todoListService = new TodoListController();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest(); // 빈 리퀘스트 객체 생성
  res = httpMocks.createResponse(); // 빈 리스폰스 객체 생성
  next = jest.fn(); // mock 함수로 생성(데이터 수집)
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    // Mock 데이터 넣어주기
    userId, mbti, filter;
  });

  it("should call Product.create", () => {
    todoListService.getTodoLists(req, res, next); //productController.createProduct이 호출 될 때,
    expect(todoListService.todoListsGet).toBeCalledWith(newProduct);
  });
});

//describe는 서로 관련있는 test끼리 묶어준다.
// describe("UserController", () => {
//   const res = {
//     status: jest.fn(() => res),
//     json: jest.fn(),
//   };

//   const req = {
//     body: {
//       email: "test@naver.com",
//       password: "test1234",
//       confirmPassword: "test1234",
//       nickname: "tester",
//     },
//   };
//   const next = jest.fn();

//   test("로컬 회원가입 [POST] /api/accounts/signup 올바르게 작동될 경우", async () => {
//     await userController.signup(req, res, next);
//     expect(res.statusCode).toBe(201);
//   });

//   test("로컬 회원가입 [POST] /api/accounts/signup 실패할경우", async () => {
//     await userController.signup(req, res, next);
//     expect(next).toBeCalledWith(err);
//   });
// });

// test("기능테스트 : 제시된 예시데이터 기준으로 1개 이상 발견되어야 한다.  ", async () => {
//     // 테스트를 하고 있는 메소드를 둘러싼 이상적인 환경이 아래와 같다고 치자.
//     // 이 정상적인 상태에서 메소드를 호출하면
//     await searchService.videoSearchViaDB(req, res);

//     // 이러한 결과들을 expect 한다.
//     expect(res.statusCode).toBe(200);
//   });

// 테스트할 클래스&인스턴스 & 필요한 모델, 모듈, 데이터
