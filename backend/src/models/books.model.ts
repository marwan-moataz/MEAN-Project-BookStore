import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  photo: { type: String, required: true },
  shelve: { type: String, required: true },
});

export const Books = mongoose.model("Book", bookSchema);
