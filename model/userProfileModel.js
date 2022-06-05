const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require("../database");

const UserProfile = database.define(
  "user_profile",
  {
    _id: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    full_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    phone: {
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
    gender: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    religion: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    dob: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    current_address: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    permanent_address: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    father_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    father_phone: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    father_occupation: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserProfile;
