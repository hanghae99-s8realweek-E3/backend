const Sequelize = require("sequelize");

module.exports = class Count extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        countId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        date: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Count",
        tableName: "counts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
};
