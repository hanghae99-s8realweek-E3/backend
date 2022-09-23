class Query {
  // todolist.service 상세 todo 조회 - todoInfo
  todoInfoQuery = (todoId) => {
    return `SELECT *, 
    (SELECT nickname FROM users WHERE users.userId = todos.userId) AS nickname, 
    (SELECT profile FROM users WHERE users.userId = todos.userId) AS profile
    FROM todos
    WHERE todoId = ${todoId}`;
  };

  // todolist.service 상세 todo 조회 - comments
  commentsQuery = (todoId) => {
    return `SELECT *, 
    (SELECT nickname FROM users WHERE users.userId = comments.userId) AS nickname, 
    (SELECT profile FROM users WHERE users.userId = comments.userId) AS profile
    FROM comments
    WHERE todoId = ${todoId}`;
  };

  // mytodo.service 나의 todo 피드 조회
  myTodosQuery = (user, date) => {
    return `SELECT users.userId AS id, nickname, profile, users.mbti AS userMbti,
    (SELECT COUNT(*) FROM follows WHERE follows.userIdFollower = users.userId ) AS followingCount,
    (SELECT COUNT(*) FROM follows WHERE follows.userIdFollowing = users.userId ) AS followerCount, 
    todos.*, challengedTodos.*
    FROM users
    LEFT OUTER JOIN todos ON users.userId = todos.userId AND DATE_FORMAT(todos.createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d')
    LEFT OUTER JOIN challengedTodos ON users.userId = challengedTodos.userId AND DATE_FORMAT(challengedTodos.createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d')
    WHERE users.userId = ${user.userId}`;
  };

  // mytodo.service 타인의 todo 피드 조회 - challengedTodos
  challengedTodosQuery = (userId) => {
    return `SELECT *, 
    (SELECT commentCounts FROM todos WHERE challengedTodos.originTodoId = todos.todoId) AS commentCounts,     
    (SELECT challengedCounts FROM todos WHERE challengedTodos.originTodoId = todos.todoId) AS challengedCounts
    FROM challengedTodos 
    WHERE userId = ${userId} LIMIT 20`;
  };

  //mytodo.service 오늘 도전한 todo 등록 -challengedTodo
  challengedTodoSelectQuery = (localDate, userId) => {
    return `SELECT *
      FROM challengedTodos
      WHERE userId = ${userId} AND DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT( '${localDate}', '%Y-%m-%d');`;
  };

  //mytodo.service 오늘 도전한 todo 진행 완료 또는 진행중 -challengedTodo
  todayMyChallengedTodoSelectQuery = (localDate, userId) => {
    return `SELECT isCompleted
  FROM challengedTodos
  WHERE DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT('${localDate}', '%Y-%m-%d') 
  AND userId = ${userId};`;
  };

  //mytodo.service 오늘 도전한 todo 진행 완료 또는 진행중 -challengedTodo
  updateIsCompletedQuery = (challengedTodoId, localDate, userId) => {
    return `UPDATE challengedTodos 
  SET isCompleted = IF (isCompleted = true ,false ,true) 
  WHERE challengedTodoId = ${challengedTodoId} 
  AND DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT('${localDate}', '%Y-%m-%d') 
  AND userId = ${userId};`;
  };

  //mytodo.service 오늘 도전한 todo 등록 -Todos
  todosSelectquery = (localDate, userId) => {
    return `SELECT *
   FROM todos
   WHERE userId = ${userId} AND DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT( '${localDate}', '%Y-%m-%d');`;
  };
}

module.exports = Query;
