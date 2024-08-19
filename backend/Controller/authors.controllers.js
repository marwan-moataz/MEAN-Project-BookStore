const asyncWrapper = require('../middlewares/asyncWrapper');
const Author = require('../Model/authors.model');
const httpStatusText = require('../utils/httpStatusText')
const appError = require('../utils/appError')
const { validationResult } = require('express-validator');



const getAllAuthors = asyncWrapper(async (req,res) =>{
    //handel pagination
    const query = req.query //query has value of limit and page
    const limit = query.limit || 20;
    const page = query.page || 1;
    const skip = (page - 1) * limit;   //calculate the skip 
    //end pagination
        const authors = await Author.find({} , {"__v":false}).limit(limit).skip(skip);
        res.json({status:httpStatusText.SUCCESS , data:{authors}});
})



const getSingleAuthor = asyncWrapper(async (req,res,next) => {
    const author = await Author.findById(req.params.authorId)
    if(!author){
        const error = appError.create('author not found', 404 , httpStatusText.FAIL);
        return next(error);
    }
    return res.json({status:httpStatusText.SUCCESS , data:{author}}); //jsend in action  
})



const createAuthor = asyncWrapper(async (req,res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newAuthor = new Author(req.body);
        await newAuthor.save();

        res.status(201).json({status:httpStatusText.SUCCESS  , data:{author:newAuthor}});
})



const updateAuthor = asyncWrapper(async (req,res) => {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.authorId,{$set:{...req.body}});
    return res.status(200).json({status:httpStatusText.SUCCESS , data:{author:updatedAuthor}})
    
})


const deleteAuthor = asyncWrapper(async (req,res) =>{
    await Author.findByIdAndDelete(req.params.authorId);
    res.status(200).json({status:httpStatusText.SUCCESS  , data:null}); //jsend in action  
})




module.exports = {
    getAllAuthors,
    createAuthor,
    getSingleAuthor,
    updateAuthor,
    deleteAuthor
}