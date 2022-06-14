const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

// teacher validator
const topStudentValidator = [
  check("fullName")
    .isLength({ min: 1 })
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet.!")
    .trim(),
  check("registerId")
    .isLength({ min: 10 })
    .withMessage("Register code is not valid.!"),
  check("roll").isLength({ min: 5 }).withMessage("Roll number is not valid.!"),
  check("board").isLength({ min: 1 }).withMessage("Board name is required.!"),
  check("exam").custom((exam, { req }) => {
    if (exam == "") {
      return Promise.reject("Exam is required.!");
    }
    return true;
  }),
  check("examYear")
    .isLength({ min: 4, max: 4 })
    .withMessage("Year format 2020"),
  check("cgpa").isLength({ min: 3 }).withMessage("CGPA is not valid.!").trim(),
];

// teacher validator handler
const topStudentValidatorErrorHandler = (req, res, next) => {
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
  topStudentValidator,
  topStudentValidatorErrorHandler,
};
