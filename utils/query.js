class Query {
  // user.service - 회원 정보 조회, mytodo.service - 나의 todo 피드 조회, 타인의 todo 피드 조회
  getFollowingCountsQuery = `SELECT COUNT(*) AS followingCount
    FROM follows 
    WHERE userIdFollower = $userId
    GROUP BY userIdFollower`;

  // user.service - 회원 정보 조회, mytodo.service - 나의 todo 피드 조회, 타인의 todo 피드 조회
  getFollowerCountsQuery = `SELECT COUNT(*) AS followerCount
    FROM follows 
    WHERE userIdFollowing = $userId
    GROUP BY userIdFollowing`;

  // mytodo.service - 타인의 todo 피드 조회
  getChallengedTodosQuery = `SELECT *, 
    (SELECT commentCounts FROM todos WHERE challengedTodos.originTodoId = todos.todoId) AS commentCounts,     
    (SELECT challengedCounts FROM todos WHERE challengedTodos.originTodoId = todos.todoId) AS challengedCounts
    FROM challengedTodos 
    WHERE userId = $userId 
    ORDER BY createdAt DESC
    LIMIT 20`;

  // comment.service - 댓글 작성, 댓글 삭제
  getCommentCountsQuery = `SELECT COUNT(*) AS commentCounts
    FROM comments 
    WHERE todoId = $todoId
    GROUP BY todoId`;

  // todolist.service - 상세 todo 조회
  getTodoQuery = `SELECT todos.*, users.nickname, users.profile, users.todoCounts, users.challengeCounts
    FROM todos
    INNER JOIN users ON todos.userId = users.userId
    WHERE todoId = $todoId`;

  // todolist.service - 상세 todo 조회
  getCommentsQuery = `SELECT comments.*, users.nickname, users.profile, users.todoCounts, users.challengeCounts
    FROM comments
    LEFT OUTER JOIN users ON comments.userId = users.userId
    WHERE todoId = $todoId`;
}

module.exports = Query;
