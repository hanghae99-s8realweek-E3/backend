'use strict';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailAuth extends Model {
  }
  EmailAuth.init({
    emailAuthId: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    email: DataTypes.STRING,
    authNumber: DataTypes.INTEGER,
    authCheck: DataTypes.BOOLEAN,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'EmailAuth',
  });
  return EmailAuth;
};