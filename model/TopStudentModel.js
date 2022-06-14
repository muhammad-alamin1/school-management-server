const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require("../database");

const TopStudent = database.define(
  "top_student",
  {
    _id: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    full_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 30],
      trim: true,
    },
    registration_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    roll_no: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    board: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 20],
      trim: true,
    },
    exam: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 10],
      trim: true,
    },
    exam_year: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    cgpa: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    avatar: {
      type: DataTypes.TEXT,
      defaultValue: "nophoto.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = TopStudent;
