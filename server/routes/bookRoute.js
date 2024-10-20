const router = require("express").Router();
const Book = require("../models/Book");
const BorrowingRecord = require("../models/BorrowingRecord");
const User = require("../models/User");
const { addBookValidation } = require("../validation");

router.use((req, res, next) => {
  console.log("It's receiving a request at book route");
  next();
});

router.post("/addBook", async (req, res) => {
  const { error } = addBookValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingBook = await Book.findOne({
    industryIdentifiers: req.body.industryIdentifiers,
  });

  if (existingBook) {
    return res.status(400).send("This book already exists.");
  }

  let {
    title,
    subtitle,
    authors,
    publisher,
    publishedDate,
    description,
    industryIdentifiers,
    imageLinks,
    language,
  } = req.body;
  let newBook = new Book({
    title,
    subtitle,
    authors,
    publisher,
    publishedDate,
    description,
    industryIdentifiers,
    imageLinks,
    language,
  });
  try {
    let savedBook = await newBook.save();
    res.status(200).send({ msg: "Successfully created the book!", savedBook });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).send("Failed to create the book...");
  }
});

router.get("/list", async (req, res) => {
  try {
    const { searchedTitle } = req.query;
    let query = {};
    if (searchedTitle) {
      query = {
        title: { $regex: searchedTitle, $options: "i" },
      };
    }
    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).send("Failed to fetch book details");
  }
});

router.post("/borrow", async (req, res) => {
  const { userId, bookId } = req.body;

  const user = await User.findById(userId);
  const book = await Book.findById(bookId);

  if (!user || !book) {
    return res.status(404).send("User or book not found.");
  }

  const newBorrowingRecord = new BorrowingRecord({
    userId,
    bookId,
  });

  try {
    await newBorrowingRecord.save();
    res.status(201).json(newBorrowingRecord);
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).send("Failed to borrow book.");
  }
});

router.get("/borrowings/:userId", async (req, res) => {
  try {
    const records = await BorrowingRecord.find({
      userId: req.params.userId,
    }).populate("bookId");

    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching borrowing records:", error);
    res.status(500).send("Failed to fetch borrowing records.");
  }
});

module.exports = router;
