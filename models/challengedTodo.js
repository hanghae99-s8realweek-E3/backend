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
        challengedTodo: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        isCompleted: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ChallengedTodo",
        tableName: "challengedTodos",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.ChallengedTodo.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onDelete: "CASCADE",
    });
    // db.ChallengedTodo.belongsTo(db.Todo, {
    //   foreignKey: "challengedTodo",
    //   targetKey: "todoId",
    // });
  }
};
