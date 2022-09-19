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
}

module.exports = Query;
