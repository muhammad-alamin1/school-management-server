const userProfileRouter = require("express").Router({ caseSensitive: true });
const {
  userCreateProfileController,
  createProfileSingleGetDataController,
  userUpdateProfileController,
  adminDeleteUser,
  adminGetAllProfileController,
} = require("../controllers/userProfileController");
const isAdmin = require("../middleware/isAdmin");
const isAuthenticate = require("../middleware/isAuthenticate");
const upload = require("../middleware/singleFileUpload");
const {
  profileValidator,
  profileValidatorErrorHandler,
} = require("../validator/userProfileValidator");

userProfileRouter.post(
  "/create-profile/",
  isAuthenticate,
  upload.single("avatar"),
  profileValidator,
  profileValidatorErrorHandler,
  userCreateProfileController
);
userProfileRouter.get(
  "/single-user/:id",
  isAuthenticate,
  createProfileSingleGetDataController
);
userProfileRouter.put(
  "/update/profile/:id",
  isAuthenticate,
  upload.single("avatar"),
  userUpdateProfileController
);
userProfileRouter.delete("/delete/profile/:id", isAdmin, adminDeleteUser);
userProfileRouter.get(
  "/all-profile-data/",
  isAdmin,
  adminGetAllProfileController
);

module.exports = userProfileRouter;
