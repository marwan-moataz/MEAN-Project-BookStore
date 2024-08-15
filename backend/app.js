require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const booksRouter = require("./Routes/books.route");

const app = express();

mongoose
  .connect(process.env.CONNECTION_STRING)
  .catch(() => console.log("Something went wrong with connection to database"))
  .then(console.log("connection established successfully"));

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
