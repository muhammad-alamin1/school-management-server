const classTimeTableRouter = require("express").Router({ caseSensitive: true });
const {
  classTimeTablePostController,
  getAllTimeTable,
  deleteClassTimeSchedule,
} = require("../controllers/classTimeTableController");
const isAdmin = require("../middleware/isAdmin");
const isAuthenticate = require("../middleware/isAuthenticate");
const pdfUpload = require("../middleware/pdfFileUpload");

classTimeTableRouter.post(
  "/add-time-table",
  isAdmin,
  pdfUpload.single("file"),
  classTimeTablePostController
);
classTimeTableRouter.get("/all-time-table", isAuthenticate, getAllTimeTable);
classTimeTableRouter.delete("/delete/:id", isAdmin, deleteClassTimeSchedule);

module.exports = classTimeTableRouter;
