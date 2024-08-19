require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const booksRouter = require("./Routes/books.route");
const categoriesRouter = require("./Routes/categories.route");
const userRouter = require("./Routes/user.route");
const adminRouter = require("./Routes/admin.route");
const authorRouter = require('./Routes/authors.route');

//ezz
const httpStatusText = require('./utils/httpStatusText');

const app = express();


mongoose
  .connect(process.env.CONNECTION_STRING)
  .catch(() => console.log("Something went wrong with connection to database"))
  .then(console.log("connection established successfully"));

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/categories", categoriesRouter);
app.use("/", userRouter);
app.use("/", adminRouter);
app.use('/api/authors' , authorRouter);


app.all('*' , (req,res,next) => {
  return res.status(404).json({status:httpStatusText.ERROR  , message:'this resourse isn\'t available'})
})

//global error handling
app.use((error,req,res,next) => {
  res.status(error.statusCode || 500).json({status:error.statusText || httpStatusText.ERROR , message:error.message , code:error.statusCode || 500})
})


app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});


