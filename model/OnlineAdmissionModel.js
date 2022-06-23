const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require("../database");

const OnlineAdmission = database.define(
  "online_admission",
  {
    _id: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    student_class: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    religion: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    student_phone: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    student_email: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    student_avatar: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    guardian_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    guardian_relation: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    guardian_phone: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    guardian_email: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    guardian_avatar: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    guardian_occupation: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    guardian_address: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    national_id_number: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    prev_school_details: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    status: {
      type: DataTypes.TEXT,
      defaultValue: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = OnlineAdmission;
