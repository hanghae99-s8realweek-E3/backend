const Sequelize = require("sequelize");

const User = require("./user");
const Comment = require("./user");
const Childcomment = require("./user");
const like = require("./user");
const Post = require("./user");
const Posthashtag = require("./user");
const Hashtag = require("./user");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Comment = Comment;
db.Childcomment = Childcomment;
db.like = like;
db.Post = Post;
db.Posthashtag = Posthashtag;
db.Hashtag = Hashtag;

User.init(sequelize);
Comment.init(sequelize);
Childcomment.init(sequelize);
like.init(sequelize);
Post.init(sequelize);
Posthashtag.init(sequelize);
Hashtag.init(sequelize);

User.associate(sequelize);
Comment.associate(sequelize);
Childcomment.associate(sequelize);
like.associate(sequelize);
Post.associate(sequelize);
Posthashtag.associate(sequelize);
Hashtag.associate(sequelize);

module.exports = db;
