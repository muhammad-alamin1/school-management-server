const jwt = require("jsonwebtoken");
const Register = require("../model/RegisterModel");

const isAdmin = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { email } = decoded;
    req.email = email;

    const user = await Register.findOne({ where: { email: email } });
    if (
      user.email === "muhammad.alamindev01@gmail.com" &&
      user.role === "admin"
    ) {
      next();
    } else {
      res.status(400).json({
        success: false,
        message: `Invalid Authentication`,
      });
    }
  } catch (error) {
    console.log(error);
    next(`Authentication Failure.!`);
  }
};

module.exports = isAdmin;
