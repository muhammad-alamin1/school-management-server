const eventRouter = require("express").Router({ caseSensitive: true });
const {
  addEventPostController,
  getAllEvents,
  deleteEvent,
  singleEvent,
  updateEvent,
} = require("../controllers/eventController");
const isAdmin = require("../middleware/isAdmin");

eventRouter.post("/post-event", isAdmin, addEventPostController);
eventRouter.get("/all", getAllEvents);
eventRouter.get("/single/:id", isAdmin, singleEvent);
eventRouter.delete("/delete/:id", isAdmin, deleteEvent);
eventRouter.put("/update/:id", isAdmin, updateEvent);

module.exports = eventRouter;
