const authRouter = require("express").Router({ caseSensitive: true });
const {
  userAuthRegisterController,
  userAuthLoginController,
  allUserGetController,
  getSingleStudentDataController,
  deleteStudentController,
  updateStudentController,
  changePasswordController,
} = require("../controllers/authController");
const isAdmin = require("../middleware/isAdmin");
const isAuthenticate = require("../middleware/isAuthenticate");
const {
  authValidationErrorHandler,
  authValidator,
} = require("../validator/authValidator");
const {
  passwordValidator,
  passwordUpdateErrorHandler,
} = require("../validator/passwordUpdateValidator");

authRouter.post(
  "/register",
  authValidator,
  authValidationErrorHandler,
  userAuthRegisterController
);
authRouter.post("/login", userAuthLoginController);
authRouter.get("/all-student", isAdmin, allUserGetController);
authRouter.get(
  "/single-student/:id",
  isAuthenticate,
  getSingleStudentDataController
);
authRouter.delete(
  "/delete/single-student/:id",
  isAdmin,
  deleteStudentController
);
authRouter.put("/update/single-student/:id", isAdmin, updateStudentController);
authRouter.put(
  "/user/change-password",
  isAuthenticate,
  passwordValidator,
  passwordUpdateErrorHandler,
  changePasswordController
);

module.exports = authRouter;
