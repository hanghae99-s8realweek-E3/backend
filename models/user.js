const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      // super는 부모를 가리킴, 여기선 Sequelize.Model
      {
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true, // id 이름 userId로 설정.
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(40), // (40)은 글자수 제한한 것. STRING으로만 해줘도 됨.
          allowNull: false,
          unique: true,
        },
        nickname: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        provider: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },
        snsId: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },
        profileImg: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isUser: {
          type: Sequelize.BOOLEAN, // 비밀번호 hash화 하면 길이가 늘어나서 여유롭게 100으로 설정
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true, // true로 해놓으면 createdAt, updatedAt 자동추가
        underscored: false, // true면 created_At  // false면 createdAt
        modelName: "User", // sequelize의 모델 이름
        tableName: "user", // mysql의 테이블 이름
        paranoid: true, // true면 삭제 날짜 기록 (e.g.회원탈퇴 후 1년간 보관한다는 약정 있는 경우 사용)
        charset: "utf8", // 언어셋  // utf8 해줘야 한글 사용 가능  // utf8mb4는 이모티콘까지 가능
        collate: "utf8_general_ci", // utf8_general_ci  // utf8mb4_general_ci
      }
    );
  }

  static associate(db) {
    // 관계 설정
    // db.User.hasMany(db.Post, { foreignKey: "userId", sourceKey: "userId" });
    // db.User.hasMany(db.Comment, { foreignKey: "userId", sourceKey: "userId" });
    // db.User.hasMany(db.Childcomment, { foreignKey: "userId", sourceKey: "userId" });
    // db.User.hasMany(db.like, { foreignKey: "userId", sourceKey: "userId" });
  }
};
