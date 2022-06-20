const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require("../database");

const ContactUs = database.define(
  "contact_us",
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
    subject: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ContactUs;
