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
    return `SELECT users.userId, nickname, profile, users.mbti,
    (SELECT COUNT(*) FROM follows WHERE follows.userIdFollower = users.userId ) AS followingCount,
    (SELECT COUNT(*) FROM follows WHERE follows.userIdFollowing = users.userId ) AS followerCount, 
    todos.*, challengedTodos.*
    FROM users
    LEFT OUTER JOIN todos ON users.userId = todos.userId AND DATE_FORMAT(todos.createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d')
    LEFT OUTER JOIN challengedTodos ON users.userId = challengedTodos.userId AND DATE_FORMAT(challengedTodos.createdAt, '%Y-%m-%d') = DATE_FORMAT( '${date}', '%Y-%m-%d')
    WHERE users.userId = ${user.userId}`;
  };
}

module.exports = Query;
