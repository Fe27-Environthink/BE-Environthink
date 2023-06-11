import Sequelize from "sequelize";
import db from "../config/database.js";
import User from "./userModel.js";
import Role from "./roleModel.js";

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: "mysql",
});

const dbs = {};

dbs.Sequelize = Sequelize;
dbs.sequelize = sequelize;

const userModel = new User(sequelize, Sequelize);
const roleModel = new Role(sequelize, Sequelize);

User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
Role.belongsToMany(User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

dbs.user = userModel;
dbs.role = roleModel;

dbs.ROLES = ["user", "admin"];

export default dbs;
