// const { ChallengedTodo, Todo, User, Follow, sequelize } = require("../models");
// const { calculateToday } = require("../utils/date");
// class MytodoRepository {
//   //Todos테이블에서 todoId를 기준으로 데이터 조회
//   getTodoByTodoId = async (todoId) => {
//     const todoData = await Todo.findOne({ where: { todoId: todoId } });
//     return todoData;
//   };

//   //ChallengedTodo테이블에서 userId & todayDate룰 기준으로 데이터 조회
//   getChallengedTodoByDateAndUserid = async (todayDate, userId) => {
//     const todayDate = calculateToday();
//     const todayChallengedTodoData = await ChallengedTodo.findOne({
//       where: {
//         [Op.and]: [{ date: todayDate }, { userId }],
//       },
//     });
//     return todayChallengedTodoData;
//   };

//   //challengedTodoData에서 originTodoId의 갯수 가져오기
//   getChallengedTodoByoriginTodoId = async (todoId) => {
//     const updateCommentData = await sequelize.query(
//       this.query.getChallengedTodoGroupByoriginTodoId,
//       { bind: { originTodoId: todoId }, type: sequelize.QueryTypes.SELECT }
//     );

//     return updateCommentData;
//   };

//   //댓글 삭제
//   deleteComment = async (commentId, comment) => {
//     const deleteComment = await Comments.destroy({
//       where: { commentId },
//     });

//     return deleteComment;
//   };


//   //댓글 삭제
//   deleteComment = async (commentId, comment) => {
//     const deleteComment = await Comments.destroy({
//       where: { commentId },
//     });

//     return deleteComment;
//   };


//   //댓글 삭제
//   deleteComment = async (commentId, comment) => {
//     const deleteComment = await Comments.destroy({
//       where: { commentId },
//     });

//     return deleteComment;
//   };


//   //댓글 삭제
//   deleteComment = async (commentId, comment) => {
//     const deleteComment = await Comments.destroy({
//       where: { commentId },
//     });

//     return deleteComment;
//   };

  
// }

// module.exports = MytodoRepository;
