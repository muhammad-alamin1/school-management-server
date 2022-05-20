const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const Register = require("../model/RegisterModel");

// validator
const authValidator = [
  check("full_name")
    .isLength({ min: 1 })
    .withMessage("Full name is required.")
    .trim(),
  check("user_name")
    .isLength({ min: 1 })
    .withMessage("Username is required.")
    .trim()
    .custom(async (user_name, { req }) => {
      try {
        const user = await Register.findOne({
          where: { user_name: req.body.user_name },
        });

        if (user !== null) {
          throw createError("Username already taken.!");
        } else {
          console.log("Not found.!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Provide valid email address.!")
    .custom(async (email, { req }) => {
      try {
        const user = await Register.findOne({
          where: { email: req.body.email },
        });

        if (user !== null) {
          throw createError("Email already used.!");
        } else {
          console.log("Not found.!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("phone")
    .isLength({ min: 1 })
    .withMessage("Number is required")
    .isMobilePhone("bn-BD", {
      strictMode: false,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .custom(async (phone, { req }) => {
      try {
        const user = await Register.findOne({
          where: { phone: req.body.phone },
        });

        if (user !== null) {
          throw createError("Phone number already used.!");
        } else {
          console.log("Not found.!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("school_code")
    .isLength({ min: 6 })
    .withMessage("School code is required.")
    .custom(async (school_code, { req }) => {
      if (req.body.school_code !== "792303") {
        throw createError("School code doesn't match.!");
      }
    }),
  check("user_password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
  check("confirm_password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    )
    .custom((confirm_password, { req }) => {
      if (confirm_password !== req.body.user_password) {
        return Promise.reject(
          "Password confirmation does not match password.!"
        );
      }
      return true;
    }),
];

// validation handler
const authValidationErrorHandler = (req, res, next) => {
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
  authValidator,
  authValidationErrorHandler,
};
