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
      references: {
        model: "Aksi",
        key: "id",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
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
Kontribusi.associate = function (models) {
  Kontribusi.belongsTo(models.Aksi, { foreignKey: "aksi_id" });
  console.log(models);
};

export default Kontribusi;

(async () => {
  await db.sync();
})();
