const Sequelize = require("sequelize");

module.exports = class MyTodo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        mytodoId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        challengedTodo: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        isComplete: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        createdTodo: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "MyTodo",
        tableName: "myTodos",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.MyTodo.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onDelete: "CASCADE",
    });
  }
};
