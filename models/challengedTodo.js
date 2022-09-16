const Sequelize = require("sequelize");

module.exports = class ChallengedTodo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        challengedTodoId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ChallengedTodo",
        tableName: "challengedTodos",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.ChallengedTodo.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onDelete: "CASCADE",
    });
  }
};
