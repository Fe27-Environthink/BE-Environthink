import sequelize from "sequelize";
import db from "../config/database.js";
import Role from "./roleModel.js";

const { DataTypes } = sequelize;

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// User.belongsToMany(Role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId",
// });

export default User;

(async () => {
  await db.sync();
})();
