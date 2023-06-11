import sequelize from "sequelize";
import db from "../config/database.js";
import User from "./userModel.js";

const { DataTypes } = sequelize;

const Role = db.define(
  "role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// db.sync().then(() => {
//   Role.belongsToMany(User, {
//     through: "user_roles",
//     foreignKey: "roleId",
//     otherKey: "userId",
//   });
// });

export default Role;
