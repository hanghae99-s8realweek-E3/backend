const Sequelize = require("sequelize");

module.exports = class Todo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        todoId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
        isTodo: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Todo",
        tableName: "todos",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Todo.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "userId",
    });
    db.Todo.hasMany(db.Comment, {
      foreignKey: "todoId",
      sourceKey: "todoId",
      onDelete: "CASCADE",
    });
    db.Todo.hasMany(db.ChallengedTodo, {
      foreignKey: "challengedTodo",
      sourceKey: "todoId",
    });
  }
};
