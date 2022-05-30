const teacherRouter = require("express").Router({ caseSensitive: true });
const {
  registerTeacherPostController,
  getAllTeacherController,
  getSingleTeacherController,
  deleteTeacherController,
  updateTeacherController,
} = require("../controllers/teacherController");
const isAuthenticate = require("../middleware/isAuthenticate");
const upload = require("../middleware/singleFileUpload");
const {
  teacherValidator,
  teacherValidatorErrorHandler,
} = require("../validator/teacherValidator");

teacherRouter.post(
  "/add-teacher",
  isAuthenticate,
  upload.single("avatar"),
  teacherValidator,
  teacherValidatorErrorHandler,
  registerTeacherPostController
);
teacherRouter.get("/all-teacher", getAllTeacherController);
teacherRouter.get(
  "/single-teacher/:id",
  isAuthenticate,
  getSingleTeacherController
);
teacherRouter.delete("/delete/:id", isAuthenticate, deleteTeacherController);
teacherRouter.put(
  "/update/:id",
  isAuthenticate,
  upload.single("avatar"),
  updateTeacherController
);

module.exports = teacherRouter;
