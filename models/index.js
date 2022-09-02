const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const User = require("./user");
const Follow = require("./follow");
const Todo = require("./todo");
const MyTodo = require("./mytodo");
const Comment = require("./comment");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Follow = Follow;
db.Todo = Todo;
db.MyTodo = MyTodo;
db.Comment = Comment;

User.init(sequelize);
Follow.init(sequelize);
Todo.init(sequelize);
MyTodo.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Todo.associate(db);
MyTodo.associate(db);
Comment.associate(db);



module.exports = db;
