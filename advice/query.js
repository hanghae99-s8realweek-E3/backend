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

  // mytodo.service 나의 todo 피드 조회 - createdTodo
  createdTodoQuery = (user, date) => {
    return `SELECT *,
    (SELECT nickname FROM users WHERE users.userId = todos.userId) AS nickname, 
    (SELECT profile FROM users WHERE users.userId = todos.userId) AS profile
    FROM todos
    WHERE userId = ${user.userId} AND DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d');`;
  };

  // mytodo.service 나의 todo 피드 조회 - challengedTodo
  challengedTodoQuery = (user, date) => {
    return `SELECT *,
    (SELECT nickname FROM users WHERE users.userId = challengedTodos.userId) AS nickname, 
    (SELECT profile FROM users WHERE users.userId = challengedTodos.userId) AS profile
    FROM challengedTodos 
    WHERE userId = ${user.userId} AND DATE_FORMAT(challengedTodos.createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d');`;
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
