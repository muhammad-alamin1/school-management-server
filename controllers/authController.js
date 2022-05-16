const connection = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// user register post controller
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
  const codeInt = parseInt(school_code);
  const randomUser = Math.floor(Math.random() * 10000099 + 10);

  try {
    // password encrypted
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // sql query
    const sqlQuery =
      "INSERT INTO `student_register_info`(`_id`, `full_name`, `user_name`, `email`, `phone`, `school_code`, `user_password`, `confirm_password`) VALUES ('" +
      randomUser +
      "','" +
      full_name +
      "','" +
      user_name +
      "','" +
      email +
      "'," +
      numberInt +
      "," +
      codeInt +
      ",'" +
      hashedPassword +
      "','" +
      hashedPassword +
      "')";

    // user save to database
    connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log("One row inserted.!");
        res.status(200).json({
          success: true,
          message: `Student register successfully.!`,
        });
      }
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
  const { email, password } = req.body;
  console.log(req.body);

  // sqlQuery
  const sqlQuery = "SELECT * FROM student_register_info WHERE email=";
  console.log(sqlQuery);

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
};

// create token
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = {
  userAuthRegisterController,
  userAuthLoginController,
};

// if (error) {
//   return res.status(400).json({
//     success: false,
//     message: `Error ocurred.`,
//   });
// } else {
//   if (results.length > 0) {
//     const comparePassword = await bcrypt.compare(
//       password,
//       results[0].user_password
//     );

//     if (comparePassword) {
//       res.send(apiResponse(results));
//     } else {
//       return res.status(204).json({
//         success: false,
//         message: `Email and password does not match.!`,
//       });
//     }
//   } else {
//     return res.status(206).json({
//       success: false,
//       message: `Email does not exits.!`,
//     });
//   }
// }
