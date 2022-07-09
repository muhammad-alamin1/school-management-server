const sequelize = require("../database");
const { Sequelize, DataTypes } = require("sequelize");

const ExamResult = sequelize.define(
  "exam_result",
  {
    _id: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    user_class: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    section: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    roll: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    exam_title: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    bangla_first: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    bangla_second: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    english_first: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    english_second: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    mathematics: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    ict: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    cgpa: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ExamResult;
