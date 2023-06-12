import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Kontribusi = db.define(
  "Kontribusi",
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true,
      },
    aksi_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    email: {
      type: DataTypes.STRING,
      allowNull: true,    
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telepon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
  },
  {
    freezeTableName: true,
  }
);

export default Kontribusi;

(async () => {
  await db.sync();
})();
