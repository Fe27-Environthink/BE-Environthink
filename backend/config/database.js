import { Sequelize } from "sequelize";

const db = new Sequelize('sql12630004', 'sql12630004', 'Q3bCn417uP', {
  host: 'sql12.freemysqlhosting.net',
  dialect: 'mysql',
});

export default db;
