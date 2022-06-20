const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

// validator
const contactUsValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required.")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet.!")
    .trim(),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Provide valid email address.!"),
  check("subject").isLength({ min: 1 }).withMessage("Subject is required."),
  check("description")
    .isLength({ min: 100 })
    .withMessage("Description must be 100 character long."),
];

// validation handler
const contactUsValidatorErrorHandler = (req, res, next) => {
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
  contactUsValidator,
  contactUsValidatorErrorHandler,
};
