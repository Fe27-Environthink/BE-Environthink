const { Sequelize } = require("sequelize");

// const db = new Sequelize("sql12623387", "sql12623387", "dTlBZL8F4e", {
//   host: "sql12.freemysqlhosting.net",
//   dialect: "mysql",
// });

// const db = new Sequelize("sql12630004", "sql12630004", "Q3bCn417uP", {
//   host: "sql12.freemysqlhosting.net",
//   dialect: "mysql",
// });
const db = new Sequelize(
  "mikofirn_fahmi_test",
  "mikofirn_fahmi_ajeh",
  "fahmi.123.123",
  {
    host: "testfahmi.mikofirnando.my.id",
    dialect: "mysql",
  }
);

module.exports = db;
