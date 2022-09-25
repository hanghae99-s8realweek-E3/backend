const { ChallengedTodo, Todo, User, Follow, sequelize } = require("../models");
const Boom = require("@hapi/boom");
const { Op } = require("sequelize");
const date = require("../utils/date");

class myTodoController {
  // 오늘의 도전 todo 등록 [POST] /:todoId/challenged
  challengedTodoCreate = async (todoId, userId) => {
    const today = date.calculateToday();
    //todoId가 Todos테이블에 존재하는건지 유효성 체크
    const todoData = await Todo.findOne({ where: { todoId: todoId } });
    console.log("도전 todo 등록 dateModule " + "+ " + todayDate);
    if (!todoData) {
      throw Boom.badRequest("존재하지 않는 todo 입니다.");
    }
    if (!todoData.mbti) {
      console.log(todoData.mbti);
      throw Boom.badRequest("MBTI 정보 등록바랍니다.");
    }
    if (todoData.userId === userId) {
      throw Boom.badRequest("본인 글은 도전할 수 없습니다.");
    }

    //오늘 날짜 + userId(todayDate, userId),
    const challengedTodoData = await ChallengedTodo.findOne({
      where: {
        [Op.and]: [{ date: todayDate }, { userId }],
      },
    });

    //이미 오늘 도전을 담았는지 challengedtodo 데이터 체크
    if (challengedTodoData) {
      throw Boom.badRequest("오늘의 todo가 이미 등록되었습니다.");
    }

    // 도전 생성하고 도전 개수 update하는 과정 트렌젝션 설정
    const onTranscation = await sequelize.transaction();
    try {
      //ChallengedTodo애 들어갈내용(userId,mbti,challengedTodo,originTodoId)생성
      await ChallengedTodo.create(
        {
          userId: userId,
          mbti: todoData.mbti,
          challengedTodo: todoData.todo,
          originTodoId: todoId,
          date: todayDate,
        },
        { transaction: onTranscation }
      );
      //Todos의 todoId가 몇번 도전되었는지 체크 하여 업데이트
      const challengedTodo = await ChallengedTodo.findAll({
        where: { originTodoId: todoId },
        transaction: onTranscation,
      });
      const challengCount = challengedTodo.length;

      await Todo.update(
        { challengedCounts: challengCount },
        { where: { todoId: todoId }, transaction: onTranscation }
      );
      await onTranscation.commit();
    } catch (err) {
      await onTranscation.rollback();
    }
  };

  // 오늘의 도전 todo 등록 취소 [DELETE] /:challengedTodoId/challenged
  challengedTodoDelete = async (challengedTodoId) => {
    const onTranscation = await sequelize.transaction();
    try {
      const challengedTodoData = await ChallengedTodo.findOne({
        where: { challengedTodoId: challengedTodoId },
        transaction: onTranscation,
      });
      if (challengedTodoData === null) {
        throw Boom.badRequest("삭제되었거나 존재하지 않는 todo 입니다.");
      }

      //삭제되어지는 todoId
      const deletedTodoId = challengedTodoData.originTodoId;

      //challengedTodoId를 기준으로 데이터 삭제
      await ChallengedTodo.destroy({
        where: { challengedTodoId: challengedTodoId },
        transaction: onTranscation,
      });

      //삭제된 todoId의 갯수
      const deletedTodoData = await ChallengedTodo.findAll({
        where: { originTodoId: deletedTodoId },
        transaction: onTranscation,
      });
      const deletedTodoIdCount = deletedTodoData.length;

      //Todos테이블에 도전갯수 업데이트
      await Todo.update(
        { challengedCounts: deletedTodoIdCount },
        { where: { todoId: deletedTodoId }, transaction: onTranscation }
      );
      await onTranscation.commit();
    } catch (err) {
      await onTranscation.rollback();
    }
  };

  // 오늘의 도전 todo 완료/진행중 처리 [PUT] /:challengedTodoId/challenged
  challengedTodoComplete = async (challengedTodoId, userId) => {
    //이용자가 오늘 등록한 challengedTodoId를 진행완료 했는지 못했는지 반영
    //isCompleted boolean값을 변경시켜주어야함
    //이용자가 오늘 도전한 todo가 있는 없는지 체크
    //오늘 날짜 + userId(todayDate, userId),
    const todaychallengedTodoData = await ChallengedTodo.findOne({
      where: {
        [Op.and]: [{ date: todayDate }, { userId }],
      },
    });

    if (!todaychallengedTodoData) {
      throw Boom.badRequest("오늘 도전한 todo가 없습니다.");
    }

    const isCompletedCheck = todaychallengedTodoData.isCompleted;

    //오늘 도전한 todo가 있다면 isCompleted의 값을 바꿔 준다.
    await ChallengedTodo.update(
      { isCompleted: isCompletedCheck ? false : true },
      { where: { challengedTodoId } }
    );

    //이용자가 오늘 작성한 todo는 있지만 프론트에서 보낸 challengedTodoId가 올바르지 않는경우 에러처리
    //params는 문자열로 들어오기에 숫자열로 변경후 비교
    if (Number(challengedTodoId) !== todaychallengedTodoData.challengedTodoId) {
      throw Boom.badRequest("challengedTodoId가 올바르지 않습니다.");
    }

    const updatedChallengedTodoData = await ChallengedTodo.findOne({
      where: {
        [Op.and]: [{ date: todayDate }, { userId }],
      },
    });

    const isCompleted = updatedChallengedTodoData.isCompleted;
    return isCompleted;
  };

  // 오늘의 제안 todo 작성 [POST] /api/mytodos
  todoCreate = async (todo, userId) => {
    //todo 테이블에 todo, user의mbti,nickname,userId,를 넣어야함
    //mytodo테이블에도 동시에 담기(서버단에서 작성된 날짜기준으로 넣는다.)
    console.log("todo 작성 dateModule " + "+ " + todayDate);
    const userData = await User.findOne({ where: { userId } });
    if (!userData) {
      throw Boom.badRequest("사용자 정보가 없습니다.");
    }
    if (!userData.mbti) {
      throw Boom.badRequest("mbti 정보를 등록후 작성바랍니다.");
    }

    const checkTodoData = await Todo.findOne({
      where: {
        [Op.and]: [{ date: todayDate }, { userId }],
      },
    });

    console.log(checkTodoData);
    if (checkTodoData) {
      throw Boom.badRequest("오늘의 todo 작성을 이미 하셨습니다.");
    }

    await Todo.create({
      todo,
      mbti: userData.mbti,
      nickname: userData.nickname,
      userId,
      date: todayDate,
    });
  };

  // todo 삭제 [DELETE] /api/mytodos/:todoId
  todoDelete = async (todoId, userId) => {
    const todoData = await Todo.findOne({
      where: { todoId, userId },
    });

    if (todoData === null) {
      throw Boom.badRequest("이미 삭제되었거나 없는 todo입니다.");
    }

    await Todo.destroy({
      where: { todoId: todoId },
    });
  };

  // 나의 todo 피드 조회 [GET] /api/mytodos
  getMyTodo = async (userId, date) => {
    const [userInfo, followingCount, followerCount] = await Promise.all([
      User.findOne({
        where: { userId },
        include: [
          { model: Todo, where: { userId, date }, required: false },
          { model: ChallengedTodo, where: { userId, date }, required: false },
        ],
      }),
      Follow.count({
        where: { userIdFollower: userId },
      }),
      Follow.count({
        where: { userIdFollowing: userId },
      }),
    ]);

    return {
      userInfo: {
        userId: userInfo.userId,
        nickname: userInfo.nickname,
        profile: userInfo.profile,
        mbti: userInfo.userMbti,
        followingCount,
        followerCount,
      },
      challengedTodo: userInfo.ChallengedTodos[0]
        ? {
            challengedTodoId: userInfo.ChallengedTodos[0].challengedTodoId,
            challengedTodo: userInfo.ChallengedTodos[0].challengedTodo,
            isCompleted: userInfo.ChallengedTodos[0].isCompleted,
            originTodoId: userInfo.ChallengedTodos[0].originTodoId,
          }
        : [],
      createdTodo: userInfo.Todos[0]
        ? {
            todoId: userInfo.Todos[0].todoId,
            todo: userInfo.Todos[0].todo,
            commentCounts: userInfo.Todos[0].commentCounts,
            challengedCounts: userInfo.Todos[0].challengedCounts,
          }
        : [],
      date,
    };
  };

  // 타인의 todo 피드 조회 [GET] /api/mytodos/:userId
  getUserTodo = async (user, userId) => {
    const [userInfo, followings, followers, challengedTodos] =
      await Promise.all([
        User.findOne({
          where: { userId },
          include: [{ model: Todo, limit: 20 }],
        }),
        Follow.findAll({
          where: { userIdFollower: userId },
        }),
        Follow.findAll({
          where: { userIdFollowing: userId },
        }),
        sequelize.query(
          `SELECT *, 
          (SELECT commentCounts FROM todos WHERE challengedTodos.originTodoId = todos.todoId) AS commentCounts,     
          (SELECT challengedCounts FROM todos WHERE challengedTodos.originTodoId = todos.todoId) AS challengedCounts
          FROM challengedTodos 
          WHERE userId = $userId LIMIT 20`,
          { bind: { userId }, type: sequelize.QueryTypes.SELECT }
        ),
      ]);

    if (!userInfo) {
      throw Boom.badRequest("존재하지 않거나 탈퇴한 회원입니다.");
    }

    return {
      userInfo: {
        userId,
        nickname: userInfo.nickname,
        profile: userInfo.profile,
        mbti: userInfo.mbti,
        followingCount: followings.length,
        followerCount: followers.length,
        isFollowed:
          followers.findIndex(
            (follower) => follower.userIdFollower === user.userId
          ) !== -1
            ? true
            : false,
      },
      challengedTodos,
      createdTodos: userInfo.Todos,
    };
  };
}

module.exports = myTodoController;
