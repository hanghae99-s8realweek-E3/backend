const { Todo } = require("../models");
const { User } = require("../models");
const { MyTodo } = require("../models");
// const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models/index");

const KoreanTime = require("../advice/date");
const date = KoreanTime; //YYYYMMDD

class TodoService {
  challengedTodoCreate = async (todoId, userId) => {
    //Todo 테이블에 isTodo가 false이면 이용불가===ok
    //my todo테이블 ChallengeTodo에 <userId+ 날짜 date + todoId >입력===ok
    //todo테이블 challengcount count는 mytodo 테이블에서 challengedtodo 갯수로 보내주기====ok
    const isTodo = await Todo.findOne({ where: { todoId: todoId } });

    if (!isTodo) {
      throw new Error("삭제된 todo 입니다.");
    }

    await MyTodo.create({
      userId: userId,
      challengedTodo: todoId,
    });

    const challengedTodo = await MyTodo.findAll({
      where: { challengedTodo: todoId },
    });
    const challengCount = challengedTodo.length;

    await Todo.update(
      { challengedCounts: challengCount },
      { where: { todoId: todoId } }
    );
  };

  challengedTodoDelete = async (date, userId, todoId) => {
    //my todo 테이블에서 <userId + 날짜 date>에 맞는  ChallengedTodo 를 null 값으로 변경====ok
    //todo테이블 challengcount count는 mytodo 테이블에서 challengedtodo 갯수로 보내주기====ok
    //오늘 다은것만
    const updateQuery = `DELETE FROM myTodos
    WHERE userId ='${userId}' AND DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d')`;
    await sequelize.query(updateQuery, {
      type: QueryTypes.DELETE,
    });

    const challengedTodo = await MyTodo.findAll({
      where: { challengedTodo: todoId },
    });

    const challengCount = challengedTodo.length;
    await Todo.update(
      { challengedCounts: challengCount },
      { where: { todoId: todoId } }
    );
  };

  challengedTodoComplete = async (date, userId) => {
    const updateQuery = `UPDATE myTodos 
    SET isComplete = IF (isComplete = true ,false ,true) 
    WHERE userId ='${userId}' AND DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d')`;
    await sequelize.query(updateQuery, {
      type: QueryTypes.UPDATE,
    });
  };

  todoCreate = async (todo, userId) => {
    //todo 테이블에 todo, user의mbti,nickname,userId,를 넣어야함
    //mytodo테이블에도 동시에 담기(서버단에서 작성된 날짜기준으로 넣는다.)
    const UserData = await User.findOne({ where: { userId: userId } });
    if (!UserData) {
      throw new Error("사용자 정보가 없습니다.");
    }
    await Todo.create({
      todo: todo,
      mbti: UserData.mbti,
      nickname: UserData.nickname,
      userId: userId,
    });
  };

  todoDelete = async (todoId) => {
    //====ok
    //todo테이블에 istodo false로 변경
    await Todo.update({ isTodo: false }, { where: { todoId: todoId } });
  };
}

module.exports = TodoService;
