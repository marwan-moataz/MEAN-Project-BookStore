const express = require("express");

const booksController = require("../Controller/books.controller");
const bookValidation = require("../middlewares/books.validationSchema");

const router = express.Router();

router
  .route("/")
  .post(bookValidation.addNewBookValidation, booksController.addNewBook)
  .get(booksController.getAllBooks);

router
  .route("/:bookId")
  .get(booksController.getBookById)
  .patch(booksController.updateBookById)
  .delete(booksController.deleteBookById);

router.route("/review/:bookId").post(booksController.insertReview);

router.route("/byCategory/:category").get(booksController.getBookByCategory);
router.route("/byAuthor/:authorId").get(booksController.getBookByAuthorId);

module.exports = router;
