const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: true,
          unique: true,
        },
        nickname: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(150),
          allowNull: true,
        },
        mbti: {
          type: Sequelize.STRING(4),
          allowNull: true,
        },
        profile: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        isUser: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Todo, {
      foreignKey: "userId",
      sourceKey: "userId",
    });
    db.User.hasMany(db.ChallengedTodo, {
      foreignKey: "userId",
      sourceKey: "userId",
      onDelete: "CASCADE",
    });
    db.User.hasMany(db.Comment, {
      foreignKey: "userId",
      sourceKey: "userId",
    });
    // db.User.belongsToMany(db.User, {
    //   foreignKey: "userIdFollowing",
    //   as: "Followers",
    //   through: "Follow",
    // });
    // db.User.belongsToMany(db.User, {
    //   foreignKey: "userIdFollower",
    //   as: "Followings",
    //   through: "Follow",
    // });
  }
};
