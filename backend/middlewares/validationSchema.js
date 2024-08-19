const {body} = require("express-validator");

const validationSchema = () => {
    return [
        body('photo')
        .notEmpty(),
        body('firstName')
        .notEmpty()
        .withMessage('title is required')
        .isLength({min:2})
        .withMessage("title at least 2 letters")
        .isString()
        .withMessage('has to be string'),
        body('lastName')
        .notEmpty()
        .withMessage('title is required')
        .isLength({min:2})
        .withMessage("title at least 2 letters")
        .isString()
        .withMessage('has to be string'),
        body('dateOfBirth')
        .notEmpty()
        .withMessage('title is required')
        .withMessage("title at least 2 letters")
        .isString()
        .withMessage('has to be string')
    ]
}

module.exports = {validationSchema};
