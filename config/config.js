require("dotenv").config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER_DEV2,
    password: process.env.MYSQL_PW_DEV2,
    database: process.env.MYSQL_DB_DEV2,
    host: process.env.MYSQL_HOST_DEV2,
    dialect: "mysql",
    logging: false,
    timezone: "+09:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
  },
  test: {
    username: process.env.MYSQL_USER_TEST,
    password: process.env.MYSQL_PW_TEST,
    database: process.env.MYSQL_DB_TEST,
    host: process.env.MYSQL_HOST_TEST,
    dialect: "mysql",
    logging: false,
    timezone: "+09:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
  },
  production: {
    username: process.env.MYSQL_USER_PD,
    password: process.env.MYSQL_PW_PD,
    database: process.env.MYSQL_DB_PD,
    host: process.env.MYSQL_HOST_PD,
    dialect: "mysql",
    logging: false,
    timezone: "+09:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
  },
};
