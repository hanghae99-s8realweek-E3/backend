'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Todo);
      this.hasMany(models.ChallengedTodo);
      this.hasMany(models.Comment);
    }
  }
  User.init({
    userId: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    profile: DataTypes.STRING,
    snsId: DataTypes.STRING,
    mbti: DataTypes.STRING,
    provider: DataTypes.STRING,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};