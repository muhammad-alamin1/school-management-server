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
    const user = await Register.create({
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
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// user login post controller
const userAuthLoginController = async (req, res, next) => {
  const { email, user_password } = req.body;

  try {
    const user = await Register.findOne({
      where: { email },
    });

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

    // res.cookie("access_token", access_token, {
    //   httpOnly: true,
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    // });

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

// get student data
const allUserGetController = async (req, res, next) => {
  try {
    const allStudent = await Register.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: allStudent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// get single student data
const getSingleStudentDataController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const student = await Register.findOne({ where: { email: id } });

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete student
const deleteStudentController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteStudent = await Register.destroy({ where: { email: id } });

    res.status(200).json({
      success: true,
      data: deleteStudent,
      message: `Student deleted successfully.!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// update student
const updateStudentController = async (req, res, next) => {
  const { id } = req.params;
  const { full_name, user_name, email, phone, role } = req.body;

  const updatedValue = {
    full_name,
    user_name,
    email,
    phone,
    role,
  };

  try {
    await Register.update(updatedValue, { where: { email: id } }).then(
      (result) => {
        if (result) {
          res.status(200).json({
            success: true,
            message: `Updated successfully.!`,
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// change password
const changePasswordController = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await Register.findOne({ where: { email: req.email } });

    // match old pass
    let isMatchedPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isMatchedPassword) {
      return res.status(500).json({
        success: false,
        message: `Invalid Password.!`,
      });
    } else {
      let hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // update value
      const updatePassword = {
        password: hashedNewPassword,
        confirm_password: hashedNewPassword,
      };

      await Register.update(updatePassword, {
        where: { email: user.email },
      }).then((result) => {
        if (result) {
          return res.status(200).json({
            success: true,
            message: `Password Updated Successfully.!`,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
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
  userLogOutController,
  allUserGetController,
  getSingleStudentDataController,
  deleteStudentController,
  updateStudentController,
  changePasswordController,
};
