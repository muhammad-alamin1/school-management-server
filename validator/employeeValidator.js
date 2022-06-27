const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");
const Employee = require("../model/EmployeeModel");

// validator
const employeeValidator = [
  check("name")
    .isLength({ min: 1 })
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet.!")
    .trim(),
  check("phone")
    .isLength({ min: 1 })
    .withMessage("Number is required")
    .isMobilePhone("bn-BD", {
      strictMode: false,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number.!")
    .custom(async (phone, { req }) => {
      try {
        const user = await Employee.findOne({
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
  check("position")
    .isLength({ min: 1 })
    .withMessage("Position name is required.!")
    .trim(),
  check("salary")
    .isLength({ min: 1 })
    .withMessage("Salary is required.!")
    .trim(),
  check("avatar").custom((avatar, { req }) => {
    if (avatar === null) {
      return Promise.reject("Employee Avatar is required.!");
    }
    return true;
  }),
  check("joinDate")
    .isLength({ min: 1 })
    .withMessage("Join Date is required.!")
    .trim(),
  check("nationalIDCard").custom((nationalIDCard, { req }) => {
    if (nationalIDCard === null) {
      return Promise.reject("ID Card Avatar is required.!");
    }
    return true;
  }),
  check("address")
    .isLength({ min: 1 })
    .withMessage("Address is required.!")
    .trim(),
];

// validation handler
const employeeValidatorErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if (req.files) {
      const avatar = req.files["avatar"][0]?.filename;
      const nationalIdCard = req.files["nationalIDCard"][0]?.filename;

      // remove student avatar
      unlink(
        path.join(path.dirname(__dirname), `/public/uploads/${avatar}`),
        (error) => {
          console.log(error);
        }
      );

      // remove guardian avatar
      unlink(
        path.join(path.dirname(__dirname), `/public/uploads/${nationalIdCard}`),
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
  employeeValidator,
  employeeValidatorErrorHandler,
};
