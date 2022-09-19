'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      todoId: {
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
      todo: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      mbti: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      commentCounts: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      challengedCounts: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
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
      modelName: "Todo",
      tableName: "todos",
      paranoid: false,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Todos');
  }
};