const express = require('express');

const router = express.Router();

const authorController = require('../Controller/authors.controllers');
const {validationSchema} = require('../middlewares/validationSchema');


//crud operations
router.route('/')
                .get(authorController.getAllAuthors)
                .post(validationSchema(),authorController.createAuthor)



router.route('/:authorId')
                .get(authorController.getSingleAuthor)
                .patch(authorController.updateAuthor)
                .delete(authorController.deleteAuthor)


module.exports = router;