const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require("../database");

const Register = database.define(
  "student_register",
  {
    full_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 30],
      trim: true,
    },
    user_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 15],
      trim: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      trim: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      trim: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirm_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Register;
