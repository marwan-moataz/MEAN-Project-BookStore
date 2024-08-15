
const express = require('express');

const {body} = require('express-validator');

const router = express.Router();

const categorieController = require('../controllers/categories.controller');



router.route('/')
            .get(categorieController.getAllcategorie)
            .post( body('name').notEmpty().withMessage("name is required").isLength({min: 4}), categorieController.addCategorie);


router.route('/:categorieId')
            .get(categorieController.getCategorie)
            .delete(categorieController.deleteCategorie)
            .patch(categorieController.updateCategorie);



module.exports = router;
