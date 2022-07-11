const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require("../database");

const Book = database.define(
  "books",
  {
    _id: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    book_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
    book_code: {
      type: DataTypes.TEXT,
      trim: true,
    },
    user_class: {
      type: DataTypes.TEXT,
      trim: true,
    },
    category: {
      type: DataTypes.TEXT,
      defaultValue: `Academic`,
      trim: true,
    },
    bookFile: {
      type: DataTypes.TEXT,
      allowNull: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Book;
