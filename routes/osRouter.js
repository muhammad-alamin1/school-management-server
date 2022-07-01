const osRouter = require("express").Router({ caseSensitive: true });
const {
  osDetected,
  osDetectionController,
} = require("../controllers/osController");
const isAuthenticate = require("../middleware/isAuthenticate");

osRouter.post("/detected", isAuthenticate, osDetectionController);

module.exports = osRouter;
