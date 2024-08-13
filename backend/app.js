const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const booksRouter = require("./Routes/books.route");

const app = express();

const URI =
  "mongodb+srv://ITI-MEAM:MEAM-TEAM@mean-bookstore.u9dxp.mongodb.net/mean-bookStore?retryWrites=true&w=majority&appName=MEAN-bookStore";

mongoose
  .connect(URI)
  .catch(() => console.log("Something went wrong with connection to database"))
  .then(console.log("connection established successfully"));

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);

app.listen(3333, () => {
  console.log("listening on port " + "3333");
});
