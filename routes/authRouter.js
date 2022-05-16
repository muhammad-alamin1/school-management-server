const authRouter = require("express").Router({ caseSensitive: true });
const {
  userAuthRegisterController,
  userAuthLoginController,
} = require("../controllers/authController");

authRouter.post("/register", userAuthRegisterController);
authRouter.post("/login", userAuthLoginController);

module.exports = authRouter;
