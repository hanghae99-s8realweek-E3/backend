"use strict";
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
  }
  Follow.init(
    {
      followId:{
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      userIdFollowing: DataTypes.INTEGER,
      userIdFollower: DataTypes.INTEGER,
      createdAt:DataTypes.DATE,
      updatedAt:DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Follow",
    }
  );
  return Follow;
};
