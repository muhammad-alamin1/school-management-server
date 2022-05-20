const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require("../database");

const Test = database.define("Test", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    len: [1, 30],
    trim: true,
  },
});

module.exports = Test;
