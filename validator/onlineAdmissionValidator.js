const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");
const OnlineAdmission = require("../model/OnlineAdmissionModel");

// validator
const onlineAdmissionValidator = [
  check("studentClass").custom((studentClass, { req }) => {
    if (studentClass == "") {
      return Promise.reject("Class is required.!");
    }
    return true;
  }),
  check("firstName")
    .isLength({ min: 1 })
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet.!")
    .trim(),
  check("lastName")
    .isLength({ min: 1 })
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet.!")
    .trim(),
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
  check("religion")
    .isLength({ min: 1 })
    .withMessage("Religion is required.!")
    .trim(),
  check("studentPhone")
    .isLength({ min: 1 })
    .withMessage("Number is required")
    .isMobilePhone("bn-BD", {
      strictMode: false,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number.!")
    .custom(async (studentPhone, { req }) => {
      try {
        const user = await OnlineAdmission.findOne({
          where: { student_phone: req.body.studentPhone },
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
  check("studentAvatar").custom((avatar, { req }) => {
    if (avatar === null) {
      return Promise.reject("Avatar is required.!");
    }
    return true;
  }),
  check("guardianName")
    .isLength({ min: 1 })
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet.!")
    .trim(),
  check("guardianRelation").custom((studentClass, { req }) => {
    if (studentClass == "") {
      return Promise.reject("Guardian relation is required.!");
    }
    return true;
  }),
  check("guardianPhone")
    .isLength({ min: 1 })
    .withMessage("Number is required")
    .isMobilePhone("bn-BD", {
      strictMode: false,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number.!"),
  check("guardianAvatar").custom((avatar, { req }) => {
    if (avatar === null) {
      return Promise.reject("Avatar is required.!");
    }
    return true;
  }),
  check("guardianOccupation")
    .isLength({ min: 1 })
    .withMessage("Occupation is required.!")
    .trim(),
  check("guardianAddress")
    .isLength({ min: 1 })
    .withMessage("Address is required.!")
    .trim(),
  check("nationalIdCardNumber")
    .isLength({ min: 8 })
    .withMessage("Enter valid number.!")
    .trim(),
  check("prevSchoolDetails")
    .isLength({ min: 100 })
    .withMessage("Details must be 100 character long.!")
    .trim(),
];

// validation handler
const onlineAdmissionValidationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if (req.files) {
      const studentAvatar = req.files["studentAvatar"][0]?.filename;
      const guardianAvatar = req.files["guardianAvatar"][0]?.filename;

      // remove student avatar
      unlink(
        path.join(path.dirname(__dirname), `/public/uploads/${studentAvatar}`),
        (error) => {
          console.log(error);
        }
      );

      // remove guardian avatar
      unlink(
        path.join(path.dirname(__dirname), `/public/uploads/${guardianAvatar}`),
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
  onlineAdmissionValidator,
  onlineAdmissionValidationErrorHandler,
};
