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
  const { email, user_password } = req.body;
  console.log(req.body);

  try {
    const user = await Register.findOne({
      where: { email },
    });
    console.log(user);
    // check user is valid
    if (!user) {
      return res.status(401).json({
        success: false,
        user: 1,
        message: `Invalid credential.!`,
      });
    }

    // matched password
    const isMatched = await bcrypt.compare(user_password, user.password);
    if (!isMatched) {
      return res.status(401).json({
        success: false,
        user: 2,
        message: `Invalid credential.!`,
      });
    }

    // create token
    const userData = {
      _id: user.id,
      role: user.role,
      user_name: user.full_name,
      email: user.email,
      phone: user.phone,
    };

    // access token
    const access_token = createAccessToken(userData);

    // response token
    res.json({
      success: true,
      access_token,
      userData,
      message: `Login successfully.!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// user logout
const userLogOutController = async (req, res, next) => {};

// create token
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = {
  userAuthRegisterController,
  userAuthLoginController,
  userLogOutController,
};
