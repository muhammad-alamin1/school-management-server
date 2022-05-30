const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const Teacher = require("../model/TeacherModel");
const path = require("path");
const { unlink } = require("fs");

// teacher validator
const teacherValidator = [
  check("firstName")
    .isLength({ min: 1 })
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet.!")
    .trim(),
  check("lastName")
    .isLength({ min: 1 })
    .withMessage("Last name is required.")
    .trim(),
  check("phone")
    .isLength({ min: 1 })
    .withMessage("Number is required")
    .isMobilePhone("bn-BD", {
      strictMode: false,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .custom(async (phone, { req }) => {
      try {
        const user = await Teacher.findOne({
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
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Provide valid email address.!")
    .custom(async (email, { req }) => {
      try {
        const user = await Teacher.findOne({
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
  check("gender").custom((gender, { req }) => {
    if (gender == "") {
      return Promise.reject("Gender is required.!");
    }
    return true;
  }),
  check("dob").custom((dob, { req }) => {
    if (dob == "") {
      return Promise.reject("Date of birth is required.!");
    }
    return true;
  }),
  check("address").isLength({ min: 2 }).withMessage("Address is required.!"),
  check("subject").custom((subject, { req }) => {
    if (subject == "") {
      return Promise.reject("Subject is required.!");
    }
    return true;
  }),
  check("religion").isLength({ min: 1 }).withMessage("Religion is required.!"),
  check("joinDate").custom((dob, { req }) => {
    if (dob == "") {
      return Promise.reject("Join Date is required.!");
    }
    return true;
  }),
  check("avatar").custom((avatar, { req }) => {
    if (avatar === null) {
      return Promise.reject("Avatar is required.!");
    }
    return true;
  }),
  check("degree")
    .isLength({ min: 1 })
    .withMessage("Degree is required.!")
    .trim(),
  check("institution")
    .isLength({ min: 1 })
    .withMessage("Institute is required.!")
    .trim(),
  check("cgpa").isLength({ min: 3 }).withMessage("CGPA is not valid.!").trim(),
  check("salary")
    .isLength({ min: 1 })
    .withMessage("Institute is required.!")
    .trim(),
];

// teacher validator handler
const teacherValidatorErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if (req.file) {
      const filename = req.file?.filename;
      unlink(
        path.join(path.dirname(__dirname), `../public/uploads/${filename}`),
        (error) => {
          console.log(error);
        }
      );
    }

    // response errors
    res.status(500).json({
      errors: mappedErrors,
      data: req.body,
    });
  }
};

module.exports = {
  teacherValidator,
  teacherValidatorErrorHandler,
};
