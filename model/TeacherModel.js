const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require("../database");

const Teacher = database.define(
  "teachers",
  {
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 30],
      trim: true,
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 30],
      trim: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      trim: true,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      trim: true,
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    dob: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    religion: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    join_date: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    degree: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    institution: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    cgpa: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    salary: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Teacher;
