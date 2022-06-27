const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require("../database");

const Employee = database.define(
  "employee",
  {
    _id: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    salary: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    position: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    joinDate: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    nationalIdCard: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Employee;
