const { Todo } = require("../models");
const { User } = require("../models");
const { MyTodo } = require("../models");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models/index");

const KoreanTime = require("../advice/date");
const date = KoreanTime; //YYYYMMDD

class TodoService {
  challengedTodoCreate = async (todoId, userId) => {
    //my todo테이블 ChallengeTodo에 <userId+ 날짜 date + todoId >입력
    //todo테이블 challengcount count +1
    await MyTodo.create({
      userId: userId,
      todoId: todoId,
    });
  };

  challengedTodoDelete = async (date, userId) => {
    //my todo 테이블에서 <userId + 날짜 date>에 맞는  todoId 삭제
    // todo테이블 challengcount count -1
    const query = `SELECT * FROM ${MyTodo} WHERE DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d');`;
    const mytodoDateData = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    await mytodoDateData.destroy({
      where: { userId: userId },
    });
  };

  challengedTodoComplete = async (date, userId) => {
    //my todo테이블에서 <userId +날짜 date>에 맞는 isComplete true\\flase로
    const selectQuery = `SELECT * FROM ${MyTodo} WHERE DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d');`;
    const mytodoDateData = await sequelize.query(selectQuery, {
      type: QueryTypes.SELECT,
    });

    const mytodoData = await mytodoDateData.findOne({
      where: { userId: userId },
    });

    let changeComplete = !mytodoData.isComplete; //ture || false 값으로 변환
    const updateQuery = `UPDATE ${MyTodo} SET isComplete ='${changeComplete}' 
    WHERE DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d') OR userId ='${userId}';`;
    // await MyTodo.update( 
    //   { isComplete: !changeComplete },
    //   {
    //     where: {
    //       [Op.and]: [{ userId: userId }, { date: date }],
    //     },
    //   }
    // );
  };

  postTodo = async (todo, userId) => {
    //todo 테이블에 todo, user의mbti,nickname,userId,를 넣어야함
    //mytodo테이블에도 동시에 담기(서버단에서 작성된 날짜기준으로 넣는다.)
    const UserData = await User.findOne({ where: { userId: userId } });
    await Todo.create({
      todo: todo,
      mbti: UserData.mbti,
      nickname: User.nickname,
      userId: userId,
      date: date,
    });

    await MyTodo.create({
      todoId: todoId,
      userId: userId,
      date: date,
    });
  };

  deleteTodo = async (todoId) => {
    await Todo.update({ isTodo: false }, { where: { todoId: todoId } });
    //todo테이블에 istodo false로 변경
  };
}

module.exports = TodoService;
