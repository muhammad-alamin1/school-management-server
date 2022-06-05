const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

// profile validator
const profileValidator = [
  check("fullName")
    .isLength({ min: 1 })
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet.!")
    .trim(),
  check("phone")
    .isLength({ min: 1 })
    .withMessage("Phone number is required.!")
    .isMobilePhone("bn-BD", {
      strictMode: false,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number.!"),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Provide valid email address.!"),
  check("userClass").custom((userClass, { req }) => {
    if (userClass == "") {
      return Promise.reject("Class is required.!");
    }
    return true;
  }),
  check("roll")
    .isLength({ min: 1 })
    .withMessage("Class roll number is required.!")
    .trim(),
  check("gender").custom((gender, { req }) => {
    if (gender == "") {
      return Promise.reject("Gender is required.!");
    }
    return true;
  }),
  check("religion")
    .isLength({ min: 1 })
    .withMessage("Religion is required.!")
    .trim(),
  check("dob")
    .isLength({ min: 1 })
    .withMessage("Date of birth is required.!")
    .trim(),
  check("avatar").custom((avatar, { req }) => {
    if (avatar === null) {
      return Promise.reject("Avatar is required.!");
    }
    return true;
  }),
  check("currentAddress")
    .isLength({ min: 1 })
    .withMessage("Current address is required.!")
    .trim(),
  check("permanentAddress")
    .isLength({ min: 1 })
    .withMessage("Permanent address is required.!")
    .trim(),
  check("fatherName")
    .isLength({ min: 1 })
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet.!")
    .trim(),
  check("fatherPhone")
    .isLength({ min: 1 })
    .withMessage("Phone number is required.!")
    .isMobilePhone("bn-BD", {
      strictMode: false,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number.!"),
  check("fatherOccupation")
    .isLength({ min: 1 })
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Father Occupation is required.!")
    .trim(),
];

// profile validator handler
const profileValidatorErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if (req.file) {
      const filename = req.file?.filename;
      unlink(
        path.join(path.dirname(__dirname), `/public/uploads/${filename}`),
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
  profileValidator,
  profileValidatorErrorHandler,
};
