const { Todo } = require("../models");
const { User } = require("../models");
const { MyTodo } = require("../models");
const { Op } = require("sequelize");
const KoreanTime = require("../advice/date");
const date = KoreanTime; //YYYYMMDD

class TodoService {
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

  postchallengeTodo = async (todoId, userId) => {
    //my todo테이블 ChallengeTodo에 <userId+ 날짜 date + todoId >입력
    //오늘 날짜로 서버단에서 yyyymmdd로 넣어주기
    //challengcount 반영
    await MyTodo.create({
      userId: userId,
      todoId: todoId,
      date: date,
    });
  };

  deletechallengeTodo = async (date, userId) => {
    //my todo 테이블에서 <userId + 날짜 date>에 맞는  todoId 삭제
    await MyTodo.destroy({
      where: {
        [Op.and]: [{ userId: userId }, { date: date }],
      },
    });
  };

  myTodoCheck = async (date, userId) => {
    //my todo테이블에서 <userId +날짜 date>에 맞는 isComplete true\\flase로
    let check = "";

    const MytodoData = await MyTodo.findOne({
      where: {
        [Op.and]: [{ userId: userId }, { date: date }],
      },
    });

    if (MytodoData.isComplete) {
      check = false;
    } else {
      check = false;
    }

    await MyTodo.update(
      { isComplete: check },
      {
        where: {
          [Op.and]: [{ userId: userId }, { date: date }],
        },
      }
    );
  };
}

module.exports = TodoService;
