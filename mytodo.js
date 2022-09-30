// # 나의 오늘의 도전 Todo 등록
// /api/mytodos/:todoId/challenged
// {
//     header: {
//         Authorization: “token”
//     },
// // }
// {
//     "userId": 6,
//     "nickname": "nickname",
//     “mbti”:”mbti”||“null”
//     “provider”:”locla”||“kakao”
// }

//도전 개수를 파악하는 방법
//도전 갯수를 좀더 효율화..?

// todo 테이블에 도전 갯수 업데이트?

// describe('Order', () => {

//     it('주문 취소시 최소 주문이 생성된다', () => {
//       //given
//       const sut = createOrder();

//       // when
//       const result = sut.cancel();

//       // then
//       expect(~~)
//     });
// });
const { ChallengedTodo, Todo, sequelize } = require("../models");
const { calculateToday } = require("../utils/date");
const { Op } = require("sequelize");
const Boom = require("@hapi/boom");
const Joi = require("../utils/joi");

// 오늘의 도전 todo 등록 [POST] /:todoId/challenged
exports.createChallengedTodo = async (req, res, next) => {
  joi = new Joi();

  const todayDate = calculateToday();
  const { todoId } = await this.joi.parameterSchema.validateAsync(req.params);
  const { userId } = res.locals.user;

  const todoData = await Todo.findOne({ where: { todoId: todoId } });

  if (!todoData) {
    throw Boom.badRequest("존재하지 않는 todo 입니다.");
  }
  if (!todoData.mbti) {
    throw Boom.badRequest("MBTI 정보 등록바랍니다.");
  }

  if (todoData.userId === userId) {
    throw Boom.badRequest("본인 글은 도전할 수 없습니다.");
  }

  const todayChallengedTodoData = await ChallengedTodo.findOne({
    where: {
      [Op.and]: [{ date: todayDate }, { userId }],
    },
  });

  //이미 오늘 도전을 담았는지 challengedtodo 데이터 체크
  if (todayChallengedTodoData) {
    throw Boom.badRequest("오늘의 todo가 이미 등록되었습니다.");
  }

  //challengedTodoData에서 originTodoId의 갯수 가져오기
  const challengedTodoData =
    await this.mytodoRepository.getChallengedTodoByoriginTodoId(todoId);

  // 도전 생성하고 도전 개수 update하는 과정 트렌젝션 설정
  await sequelize.transaction(async (transaction) => {
    await ChallengedTodo.create(
      {
        userId,
        mbti: todoData.mbti,
        challengedTodo: todoData.todo,
        originTodoId: todoId,
        date: todayDate,
      },
      { transaction }
    );
    //challengedTodos에 있는 todo갯수 반영해주기
    await Todo.update(
      {
        challengedCounts: challengedTodoData[0]
          ? challengedTodoData[0].COUNT + 1
          : 1,
      },
      { where: { todoId: todoId } },
      { transaction }
    );
  });

  res.status(201).json({
    message: "success",
  });
};
