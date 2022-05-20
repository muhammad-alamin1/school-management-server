const connection = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const Sequelize = require("sequelize");
const Register = require("../model/RegisterModel");

// register
const userAuthRegisterController = async (req, res, next) => {
  const {
    full_name,
    user_name,
    email,
    phone,
    school_code,
    user_password,
    confirm_password,
  } = req.body;
  const numberInt = parseInt(phone);

  // password encrypted
  const hashedPassword = await bcrypt.hash(user_password, 10);

  try {
    const test = await Register.create({
      full_name,
      user_name,
      email,
      numberInt,
      phone,
      password: hashedPassword,
      confirm_password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: `Student register successfully.!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// user login post controller
const userAuthLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    connection.query(
      "SELECT * FROM student_register_info WHERE email='" + email + "'",
      (error, results) => {
        if (error) {
          console.log(error);
        }
        console.log(results);
        res.send(results);
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// create token
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = {
  userAuthRegisterController,
  userAuthLoginController,
};
