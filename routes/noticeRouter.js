const noticeRouter = require("express").Router({ caseSensitive: true });
const isAuthenticate = require("../middleware/isAuthenticate");
const {
  addNoticePostController,
  getAllNotice,
  deleteNotice,
  singleNotice,
  updateNotice,
} = require("../controllers/noticeController");

noticeRouter.post("/post-notice", isAuthenticate, addNoticePostController);
noticeRouter.get("/all-notice", getAllNotice);
noticeRouter.get("/single-notice/:id", isAuthenticate, singleNotice);
noticeRouter.delete("/delete-notice/:id", isAuthenticate, deleteNotice);
noticeRouter.put("/update-notice/:id", isAuthenticate, updateNotice);

module.exports = noticeRouter;
