const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  photo: { type: String, required: true },
  averageRating: { type: Number },
  reviews: [
    {
      reviewerName: String,
      rating: Number,
      comment: String,
    },
  ],
});

module.exports = mongoose.model("Book", bookSchema);
