const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    type: Date,
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
  status: {
    isReturned: { type: Boolean, default: true },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
