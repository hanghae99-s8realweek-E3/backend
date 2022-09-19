'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.hasMany(models.Comment);
    }
  }
  Todo.init({
    todoId:{
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER,
    todo: DataTypes.STRING,
    mbti: DataTypes.STRING,
    commentCounts: DataTypes.INTEGER,
    challengedCounts: DataTypes.INTEGER,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};