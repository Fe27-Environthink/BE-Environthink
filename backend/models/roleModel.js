import sequelize from "sequelize";
import db from "../config/database.js";

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

export default Role;

// (async () => {
//   await db.sync();
// })();
