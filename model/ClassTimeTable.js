const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require("../database");

const ClassTimeTable = database.define(
  "class_time_table",
  {
    _id: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    user_class: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    file: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ClassTimeTable;
