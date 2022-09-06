const Sequelize = require("sequelize");

module.exports = class MBTI extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        mbtiId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        mbti: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        INFP: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ENFP: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        INFJ: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ENFJ: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        INTJ: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ENTJ: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        INTP: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ENTP: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ISFP: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ESFP: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ISTP: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ESTP: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ISFJ: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ESFJ: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ISTJ: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ESTJ: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "MBTI",
        tableName: "mbtis",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
