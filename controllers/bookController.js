const randomId = require("../common/randomIdGenerate");
const Book = require("../model/BookModel");
const { unlink } = require("fs");
const path = require("path");

// post controller
const addBookPostController = async (req, res, next) => {
  const { bookName, bookCode, userClass } = req.body;
  const file = req.file?.filename;

  try {
    if (req.file) {
      const book = await Book.create({
        _id: randomId(),
        book_name: bookName,
        book_code: bookCode,
        user_class: userClass,
        bookFile: file || "",
      });

      if (book) {
        res.status(200).json({
          success: true,
          message: `Book added successfully.!`,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// get all books
const allBooksGetController = async (req, res, next) => {
  try {
    const books = await Book.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (books) {
      res.status(200).json({
        success: true,
        data: books,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete book
const deleteBookController = async (req, res, next) => {
  const id = req.params.id;

  try {
    const book = await Book.findOne({ where: { _id: id } });

    if (book) {
      const deleteBook = await Book.destroy({ where: { _id: id } });

      if (deleteBook) {
        // delete prev file
        unlink(
          path.join(
            path.dirname(__dirname),
            `/public/uploads/pdf/${book.bookFile}`
          ),
          (err) => {
            if (err) console.log(err);
          }
        );

        return res.status(200).json({
          success: true,
          message: `Book deleted successfully.!`,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// change category controller
const changeCategoryController = async (req, res, next) => {
  try {
    await Book.update(
      { category: `Others` },
      { where: { _id: req.params.id } }
    ).then((result) => {
      if (result) {
        // success response
        res.status(200).json({
          success: true,
          message: `Book Category Updated successfully.!`,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

module.exports = {
  addBookPostController,
  allBooksGetController,
  deleteBookController,
  changeCategoryController,
};
