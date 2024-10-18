const mongoose = require("mongoose");
const { Schema } = mongoose;

// Book schema
const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  subtitle: {
    type: String,
    trim: true,
  },
  authors: [
    {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      _id: false,
    },
  ],
  publisher: {
    type: String,
    trim: true,
  },
  publishedDate: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  industryIdentifiers: [
    {
      type: { type: String, required: true },
      identifier: { type: String, required: true },
      _id: false,
    },
  ],
  imageLinks: {
    smallThumbnail: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  language: {
    type: String,
    trim: true,
  },
});

// Book model
const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
