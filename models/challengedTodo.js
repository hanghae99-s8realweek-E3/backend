'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChallengedTodo extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  ChallengedTodo.init({
    challengedTodoId: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER,
    mbti: DataTypes.STRING,
    challengedTodo: DataTypes.STRING,
    isCompleted: DataTypes.BOOLEAN,
    originTodoId: DataTypes.INTEGER,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ChallengedTodo',
  });
  return ChallengedTodo;
};