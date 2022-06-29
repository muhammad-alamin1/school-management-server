const noticeRouter = require("express").Router({ caseSensitive: true });
const isAuthenticate = require("../middleware/isAuthenticate");
const isAdmin = require("../middleware/isAdmin");

const {
  addNoticePostController,
  getAllNotice,
  deleteNotice,
  singleNotice,
  updateNotice,
} = require("../controllers/noticeController");

noticeRouter.post("/post-notice", isAdmin, addNoticePostController);
noticeRouter.get("/all-notice", getAllNotice);
noticeRouter.get("/single-notice/:id", isAuthenticate, singleNotice);
noticeRouter.delete("/delete-notice/:id", isAdmin, deleteNotice);
noticeRouter.put("/update-notice/:id", isAdmin, updateNotice);

module.exports = noticeRouter;
