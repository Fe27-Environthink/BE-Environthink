import Sequelize from "sequelize";
import db from "../config/database.js";
import userModel from "./userModel.js";
import roleModel from "./roleModel.js";

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: "mysql",
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const User = new userModel(sequelize, Sequelize);
const Role = new roleModel(sequelize, Sequelize);

Role.associate = (models) => {
  Role.belongsToMany(User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
  });
};
User.associate = (models) => {
  User.belongsToMany(Role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
  });
};

const dbs = {
  User,
  Role,
  sequelize,
  Sequelize,
  ROLES: ["user", "admin", "moderator"],
};

export default dbs;
