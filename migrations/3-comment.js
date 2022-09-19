"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Comments",
      {
        commentId: {
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
        todoId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Todos",  
            key: "todoId",  
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        comment: {
          type: Sequelize.STRING(200),
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
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Comments");
  },
};
