const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const Register = require("../model/RegisterModel");
const bcrypt = require("bcrypt");

// validator
const passwordValidator = [
  check("oldPassword").custom(async (oldPassword, { req }) => {
    try {
      const user = await Register.findOne({
        where: { email: req.email },
      });

      if (user) {
        let isMatchedPassword = await bcrypt.compare(
          req.body.oldPassword,
          user.password
        );

        if (!isMatchedPassword) {
          throw createError("Invalid Password.!");
        }
      } else {
        console.log("Not found.!");
      }
    } catch (error) {
      throw createError(error.message);
    }
  }),
  check("newPassword")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
  check("confirmPassword")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    )
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.newPassword) {
        return Promise.reject("Password confirmation doesn't match password.!");
      }
      return true;
    }),
];

// validation handler
const passwordUpdateErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response errors
    res.status(500).json({
      errors: mappedErrors,
      data: req.body,
    });
  }
};

module.exports = {
  passwordValidator,
  passwordUpdateErrorHandler,
};
