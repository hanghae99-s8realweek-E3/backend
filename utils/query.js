class Query {
  // mytodo.service - 타인의 todo 피드 조회
  getChallengedTodosQuery = `SELECT *, 
    (SELECT ifnull(max(commentCounts), 0) FROM todos WHERE challengedTodos.originTodoId = todos.todoId) AS commentCounts,     
    (SELECT ifnull(max(challengedCounts), 0) FROM todos WHERE challengedTodos.originTodoId = todos.todoId) AS challengedCounts
    FROM challengedTodos 
    WHERE userId = $userId 
    ORDER BY createdAt DESC
    LIMIT 20`;

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

  // follow.service -follower팔로우 목록조회
  getFollwerlist = `SELECT userId, nickname, profile, mbti 
    FROM users 
    INNER JOIN (SELECT userIdFollower AS myFollowerUserId FROM follows WHERE userIdFollowing =$userIdFollowing ) as followerData
    ON users.userId = followerData.myFollowerUserId`;

  // follow.service- following팔로우 목록조회
  getFollwinglist = `SELECT userId, nickname, profile, mbti 
    FROM users 
    INNER JOIN (SELECT userIdFollowing AS myFollowingUserId FROM follows WHERE userIdFollower =$userIdFollower ) as followingData
    ON users.userId = followingData.myFollowingUserId`;
}

module.exports = Query;
