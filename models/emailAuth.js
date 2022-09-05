const Sequelize = require("sequelize");

module.exports = class EmailAuth extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        emailAuthId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        authNumber: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "EmailAuth",
        tableName: "emailAuth",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
