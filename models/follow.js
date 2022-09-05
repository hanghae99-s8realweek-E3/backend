const Sequelize = require("sequelize");

module.exports = class Follow extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        followId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userIdFollowing: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        userIdFollower: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Follow",
        tableName: "follows",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
