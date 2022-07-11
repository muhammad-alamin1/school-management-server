const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const Teacher = require("../model/TeacherModel");
const path = require("path");
const { unlink } = require("fs");

// teacher validator
const bookValidator = [
  check("bookName")
    .isLength({ min: 1 })
    .withMessage("Book name is required.")
    .trim(),

  check("pdfFile").custom((avatar, { req }) => {
    if (avatar === null) {
      return Promise.reject("File is required.!");
    }
    return true;
  }),
];

// teacher validator handler
const bookValidatorErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if (req.file) {
      const filename = req.file?.filename;
      unlink(
        path.join(path.dirname(__dirname), `/public/uploads/pdf/${filename}`),
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
  bookValidator,
  bookValidatorErrorHandler,
};
