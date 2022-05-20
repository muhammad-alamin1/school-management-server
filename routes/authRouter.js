const authRouter = require("express").Router({ caseSensitive: true });
const {
  userAuthRegisterController,
  userAuthLoginController,
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

module.exports = authRouter;
