"use strict";
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MBTI extends Model {
  }
  MBTI.init(
    {
      mbtiId:{
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      mbti: DataTypes.STRING,
      INFP: DataTypes.INTEGER,
      ENFP: DataTypes.INTEGER,
      INFJ: DataTypes.INTEGER,
      ENFJ: DataTypes.INTEGER,
      INTJ: DataTypes.INTEGER,
      ENTJ: DataTypes.INTEGER,
      INTP: DataTypes.INTEGER,
      ENTP: DataTypes.INTEGER,
      ISFP: DataTypes.INTEGER,
      ESFP: DataTypes.INTEGER,
      ISTP: DataTypes.INTEGER,
      ESTP: DataTypes.INTEGER,
      ISFJ: DataTypes.INTEGER,
      ESFJ: DataTypes.INTEGER,
      ISTJ: DataTypes.INTEGER,
      ESTJ: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MBTI",
    }
  );
  return MBTI;
};
