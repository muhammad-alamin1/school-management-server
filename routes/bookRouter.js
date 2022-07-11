const bookRouter = require("express").Router({ caseSensitive: true });

const {
  addBookPostController,
  allBooksGetController,
  deleteBookController,
  changeCategoryController,
} = require("../controllers/bookController");
const isAdmin = require("../middleware/isAdmin");
const isAuthenticate = require("../middleware/isAuthenticate");
const pdfUpload = require("../middleware/pdfFileUpload");
const {
  bookValidator,
  bookValidatorErrorHandler,
} = require("../validator/bookValidator");

bookRouter.post(
  "/add-book",
  isAdmin,
  pdfUpload.single("pdfFile"),
  bookValidator,
  bookValidatorErrorHandler,
  addBookPostController
);
bookRouter.get("/all-books", isAuthenticate, allBooksGetController);
bookRouter.delete("/delete/:id", isAdmin, deleteBookController);
bookRouter.put("/update/:id", isAdmin, changeCategoryController);

module.exports = bookRouter;
