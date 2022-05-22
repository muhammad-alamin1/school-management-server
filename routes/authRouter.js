const authRouter = require("express").Router({ caseSensitive: true });
const {
  userAuthRegisterController,
  userAuthLoginController,
  allUserGetController,
  getSingleStudentDataController,
  deleteStudentController,
} = require("../controllers/authController");
const {
  authValidationErrorHandler,
  authValidator,
} = require("../validator/authValidator");

authRouter.post(
  "/register",
  authValidator,
  authValidationErrorHandler,
  userAuthRegisterController
);
authRouter.post("/login", userAuthLoginController);
authRouter.get("/all-student", allUserGetController);
authRouter.get("/single-student/:id", getSingleStudentDataController);
authRouter.delete("/delete/single-student/:id", deleteStudentController);

module.exports = authRouter;
