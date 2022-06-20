const contactUsRouter = require("express").Router({ caseSensitive: true });

const {
  contactUsPostController,
  getContactUsController,
  deleteContactUsInfoController,
} = require("../controllers/contactUsController");
const isAdmin = require("../middleware/isAdmin");
const {
  contactUsValidator,
  contactUsValidatorErrorHandler,
} = require("../validator/contactUsValidator");

contactUsRouter.post(
  "/add-contact",
  contactUsValidator,
  contactUsValidatorErrorHandler,
  contactUsPostController
);

contactUsRouter.get("/all-contact-info", isAdmin, getContactUsController);
contactUsRouter.delete("/delete/:id", isAdmin, deleteContactUsInfoController);

module.exports = contactUsRouter;
