"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "challengedTodos",
      {
        challengedTodoId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",  
            key: "userId",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        mbti: {
          type: Sequelize.STRING(4),
          allowNull: false,
        },
        challengedTodo: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        isCompleted: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        originTodoId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        underscored: false,
        modelName: "ChallengedTodo",
        tableName: "challengedTodos",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("challengedTodos");
  },
};
