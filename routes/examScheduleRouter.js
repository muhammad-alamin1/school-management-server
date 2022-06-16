const examScheduleRouter = require("express").Router({ caseSensitive: true });
const {
  examSchedulePostController,
  getAllExamSchedule,
  deleteExamSchedule,
} = require("../controllers/examScheduleController");
const isAdmin = require("../middleware/isAdmin");
const isAuthenticate = require("../middleware/isAuthenticate");
const pdfUpload = require("../middleware/pdfFileUpload");

examScheduleRouter.post(
  "/add-exam",
  isAdmin,
  pdfUpload.single("file"),
  examSchedulePostController
);
examScheduleRouter.get(
  "/get-all-exam-schedule/",
  isAuthenticate,
  getAllExamSchedule
);
examScheduleRouter.delete("/delete/:id", isAdmin, deleteExamSchedule);

module.exports = examScheduleRouter;
