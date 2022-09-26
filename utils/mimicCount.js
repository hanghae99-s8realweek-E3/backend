// const { sequelize } = require("../models");

// await sequelize.query(
//   `SELECT * FROM (SELECT userId, count(userId) as COUNT FROM todos AS Todo GROUP BY userId) as count
//        WHERE userId = $userId `,
//   { bind: { userId: userId }, type: sequelize.QueryTypes.SELECT }
// );
// //값이 있다면 그 카운터를 반영 없다면 0으a로

// let todoCounts = 0;

// //값이 있는 경우에만 배열에서 count를 사용해서 반영
// if (userTodoData.length) {
//   todoCounts = userTodoData[0].COUNT;
// }

// await User.update(
//   { todoCounts },
//   { where: { userId }, transaction: onTransaction }
// );





// ///____________================dfklasdjlfasjdklfjakl;wdfjl;asdjflkasjdklfjas;ld
// const onTransaction = await sequelize.transaction();
// try {
//   await Todo.create(
//     {
//       todo,
//       mbti: userData.mbti,
//       nickname: userData.nickname,
//       userId,
//       date: todayDate,
//     },
//     { transaction: onTransaction }
//   );

//   // 쿼리문 사용했을때
//   const [userTodoData, userChallengedTodoData] = await Promise.all([
//     await sequelize.query(
//       `SELECT * FROM (SELECT userId, count(userId) as COUNT FROM todos AS Todo GROUP BY userId) as count
//        WHERE userId = $userId `,
//       { bind: { userId: userId }, type: sequelize.QueryTypes.SELECT }
//     ),
//     await sequelize.query(
//       `SELECT * FROM (SELECT userId, count(userId) as COUNT FROM challengedTodos AS Todo GROUP BY userId) as count
//        WHERE userId = $userId `,
//       { bind: { userId: userId }, type: sequelize.QueryTypes.SELECT }
//     ),
//   ]);
//   //값이 있다면 그 카운터를 반영 없다면 0으로
//   let userTodoCount = 0;
//   let userChallengedTodoCount = 0;

//   //값이 있는 경우에만 배열에서 count를 사용해서 반영
//   if (userTodoData.length) {
//     userTodoCount = userTodoData[0].COUNT;
//   } else if (userTodoData.length) {
//     userChallengedTodoCount = userChallengedTodoData[0].COUNT;
//   }
//   const mimicCounts = userTodoCount + userChallengedTodoCount;

//   await User.update({ mimicCounts }, { where: { userId }, transaction: onTransaction });
//   await onTransaction.commit();
// } catch (error) {
//   await onTransaction.rollback();