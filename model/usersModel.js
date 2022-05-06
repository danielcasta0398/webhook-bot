const { DataTypes } = require("sequelize");
const { db } = require("../utils/databases");
db
//Users
const User = db.define("user", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
});

module.exports = { User };
