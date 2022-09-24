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
        mbti: {
          type: Sequelize.STRING(4),
          allowNull: false,
        },
        date: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        todo: {
          type: Sequelize.STRING(140),
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
      onDelete: "CASCADE",
    });
    db.Todo.hasMany(db.Comment, {
      foreignKey: "todoId",
      sourceKey: "todoId",
      onDelete: "CASCADE",
    });
  }
};
