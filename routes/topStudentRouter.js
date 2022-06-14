const topStudentRouter = require("express").Router({ caseSensitive: true });
const {
  addTopStudentPostController,
  getAllTopStudentsDataController,
  deleteStudent,
} = require("../controllers/topStudentController");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/singleFileUpload");
const {
  topStudentValidator,
  topStudentValidatorErrorHandler,
} = require("../validator/topStudentValidator");

topStudentRouter.post(
  "/add-top-student/",
  isAdmin,
  upload.single("avatar"),
  topStudentValidator,
  topStudentValidatorErrorHandler,
  addTopStudentPostController
);
topStudentRouter.get("/all-top-student-data/", getAllTopStudentsDataController);
topStudentRouter.delete("/delete/:id", isAdmin, deleteStudent);

module.exports = topStudentRouter;
