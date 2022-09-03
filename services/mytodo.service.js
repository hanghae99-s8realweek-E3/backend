
const { ChallengedTodo,Todo, User, Follow } = require("../models");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models/index");

const KoreanTime = require("../advice/date");
const date = KoreanTime; //YYYYMMDD

class myTodoController {
  
  challengedTodoCreate = async (todoId, userId) => {
    //Todo 테이블에 isTodo가 false이면 이용불가===ok
    //my todo테이블 ChallengeTodo에 <userId+ 날짜 date + todoId >입력===ok
    //todo테이블 challengcount count는 mytodo 테이블에서 challengedtodo 갯수로 보내주기====ok
    const isTodo = await Todo.findOne({ where: { todoId: todoId } });

    if (!isTodo) {
      throw new Error("삭제된 todo 입니다.");
    }

    await ChallengedTodo.create({
      userId: userId,
      challengedTodo: todoId,
    });

    const challengedTodo = await ChallengedTodo.findAll({
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
    WHERE DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d')AND userId ='${userId}'`;
    ;
    //사용자별로 먼저 범위를 찾는게 찾는 법위를 줄여서
    await sequelize.query(updateQuery, {
      type: QueryTypes.DELETE,
    });

    const challengedTodo = await ChallengedTodo.findAll({
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
    WHERE DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d')AND userId ='${userId}'`;
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


  // 나의 todo 피드 조회 [GET] /api/mytodos
  getMyTodo = async (user, date) => {
    const userInfo = await User.findOne({
      where: { userId: user.userId },
      include: [ChallengedTodo],
    });
    const myfolloing = await Follow.findAll({
      where: { userIdFollower: user.userId },
    });
    const myfollower = await Follow.findAll({
      where: { userIdFollowing: user.userId },
    });

    const query = `SELECT *
      FROM todos
      WHERE isTodo = true AND userId = ${user.userId} AND DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d');`;
    const createdTodo = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    const query2 = `SELECT *
      FROM challengedTodos
      WHERE userId = ${user.userId} AND DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d');`;
    const challenge = await sequelize.query(query2, {
      type: QueryTypes.SELECT,
    });
    const challengedTodo = await Todo.findOne({
      where: { todoId: challenge },
      attributes: { exclude: ["isTodo"] },
    });

    return {
      userInfo: {
        userId: user.userId,
        nickname: userInfo.nickname,
        profile: userInfo.profile,
        mbti: userInfo.mbti,
        followingCount: myfolloing.length,
        followerCount: myfollower.length,
      },
      challengedTodo,
      createdTodo,
      date,
    };
  };

  // 타인의 todo 피드 조회 [GET] /api/mytodos/:userId
  getUserTodo = async (user, userId) => {
    const userInfo = await User.findOne({
      where: { userId },
      include: [ChallengedTodo],
    });
    const following = await Follow.findAll({
      where: { userIdFollower: userId },
    });
    const follower = await Follow.findAll({
      where: { userIdFollowing: userId },
    });
    // 제안 todo 최신 20개
    const createdTodo = await Todo.findAll({
      where: { isTodo: true, userId },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["isTodo"] },
      limit: 20,
    });
    // 도전 todo 최신 20개
    const challenges = await ChallengedTodo.findAll({
      where: { userId },
      attributes: [ChallengedTodo],
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    const challengedTodo = await Todo.findAll({
      where: { todoId: challenges },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["isTodo"] },
      limit: 20,
    });

    return {
      userInfo: {
        userId,
        nickname: userInfo.nickname,
        profile: userInfo.profile,
        mbti: userInfo.mbti,
        followingCount: following.length,
        followerCount: follower.length,
        isFollowed:
          follower.findIndex((f) => f.userIdFollower === user.userId) !== -1
            ? true
            : false,
      },
      challengedTodo,
      createdTodo,
    };
  };
}

module.exports = myTodoController;



