const examResultRouter = require("express").Router({ caseSensitive: true });

const {
  sendResultController,
  getAllDataController,
  getSingleDataController,
  getExamTitle,
  deleteExam,
  deleteExamById,
} = require("../controllers/examResultController");
const isAdmin = require("../middleware/isAdmin");
const isAuthenticate = require("../middleware/isAuthenticate");

examResultRouter.post("/send-result", isAdmin, sendResultController);
examResultRouter.get("/all-result", isAdmin, getAllDataController);
examResultRouter.get(
  "/single-result/:id",
  isAuthenticate,
  getSingleDataController
);
examResultRouter.delete("/delete/:id", isAdmin, deleteExam);
examResultRouter.delete("/delete-by-user-id/:id", isAdmin, deleteExamById);

module.exports = examResultRouter;
