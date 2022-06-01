const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require("../database");

const Notice = database.define(
  "notice_board",
  {
    _id: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Notice;
