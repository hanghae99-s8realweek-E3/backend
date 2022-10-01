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
    (SELECT ifnull(max(commentCounts), 0) FROM todos WHERE challengedTodos.originTodoId = todos.todoId) AS commentCounts,     
    (SELECT ifnull(max(challengedCounts), 0) FROM todos WHERE challengedTodos.originTodoId = todos.todoId) AS challengedCounts
    FROM challengedTodos 
    WHERE userId = $userId 
    ORDER BY createdAt DESC
    LIMIT 20`;

  // // comment.service - 댓글 작성, 댓글 삭제====
  // getCommentCountsQuery = `SELECT COUNT(*) AS commentCounts
  //   FROM comments
  //   WHERE todoId = $todoId
  //   GROUP BY todoId`;

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

  // //mytodo.service - 오늘의 도전 todo 등록 취소, 오늘의 도전 todo 완료/진행중 처리========
  // getChallengedTodoGroupByuserId = `SELECT COUNT(*) AS COUNT
  //   FROM challengedTodos
  //   WHERE userId = $userId AND isCompleted = true
  //   GROUP BY userId`;

  // //mytodo.service - 오늘의 제안 todo 작성, 오늘의 제안 todo 삭제========
  // getTodoGroupByuserId = `SELECT COUNT(*) AS COUNT
  //   FROM todos AS Todo
  //   WHERE userId = $userId
  //   GROUP BY userId`;

  // //mytodo.service - 오늘의 도전 todo 등록, 오늘의 도전 todo 등록 취소========
  // getChallengedTodoGroupByoriginTodoId = `SELECT COUNT(*) AS COUNT
  //   FROM challengedTodos AS ChallengedTodo
  //   WHERE originTodoId = $originTodoId
  //   GROUP BY originTodoId`;

  //follow.service -follower팔로우 목록조회
  getFollwerlist = `SELECT userId, nickname ,profile ,mbti FROM users 
  INNER JOIN (SELECT userIdFollower AS myFollowerUserId FROM follows WHERE userIdFollowing =$userIdFollowing ) as followerData
  ON users.userId = followerData.myFollowerUserId`;

  //follow.service- following팔로우 목록조회
  getFollwinglist = `SELECT userId, nickname ,profile ,mbti FROM users 
  INNER JOIN (SELECT userIdFollowing AS myFollowingUserId FROM follows WHERE userIdFollower =$userIdFollower ) as followingData
  ON users.userId = followingData.myFollowingUserId`;
}

module.exports = Query;
