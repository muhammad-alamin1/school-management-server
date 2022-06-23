const onlineAdmissionRouter = require("express").Router({
  caseSensitive: true,
});
const {
  onlineAdmissionPostController,
  getAllRegisterDataController,
  updateStatusController,
  deleteStudentController,
  getSingleStudentData,
} = require("../controllers/onlineAdmissionController");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/singleFileUpload");
const {
  onlineAdmissionValidator,
  onlineAdmissionValidationErrorHandler,
} = require("../validator/onlineAdmissionValidator");

onlineAdmissionRouter.post(
  "/register",
  upload.fields([
    { name: "studentAvatar", maxCount: 1 },
    { name: "guardianAvatar", maxCount: 1 },
  ]),
  onlineAdmissionValidator,
  onlineAdmissionValidationErrorHandler,
  onlineAdmissionPostController
);
onlineAdmissionRouter.get(
  "/all-register-info",
  isAdmin,
  getAllRegisterDataController
);
onlineAdmissionRouter.put(
  "/update-status/:id",
  isAdmin,
  updateStatusController
);
onlineAdmissionRouter.delete(
  "/delete-user/:id",
  isAdmin,
  deleteStudentController
);
onlineAdmissionRouter.get("/single-student/:id", isAdmin, getSingleStudentData);

module.exports = onlineAdmissionRouter;
