const { body } = require("express-validator");

const addNewBookValidation = [
  body("name")
    .notEmpty()
    .withMessage("Book Name is required")
    .isLength({ min: 5 })
    .withMessage("Book Name min length is 5 chars "),
  body("author")
    .notEmpty()
    .withMessage("Book author is required")
    .isLength({ min: 5 })
    .withMessage("Book author min length is 5 chars "),
  body("category")
    .notEmpty()
    .withMessage("Book category is required")
    .isLength({ min: 5 })
    .withMessage("Book category min length is 5 chars "),
  body("photo")
    .notEmpty()
    .withMessage("Book photo is required")
    .isLength({ min: 5 })
    .withMessage("Book photo min length is 5 chars "),
];

module.exports = { addNewBookValidation };
