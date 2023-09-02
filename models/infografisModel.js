const Sequelize = require("sequelize");
const db = require("../config/database.js");

const DataTypes = Sequelize.DataTypes;

const Infografis = db.define(
  "infografis",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Infografis;

(async () => {
  await db.sync();
})();
