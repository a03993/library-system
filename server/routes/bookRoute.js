const router = require("express").Router();
const Book = require("../models/Book");
const { addBookValidation } = require("../validation");

router.use((req, res, next) => {
  console.log("It's receiving a request at book route");
  next();
});

router.post("/addBook", async (req, res) => {
  // check the info for register
  const { error } = addBookValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check for existing book by industryIdentifiers
  const existingBook = await Book.findOne({
    industryIdentifiers: req.body.industryIdentifiers,
  });

  if (existingBook) {
    return res.status(400).send("This book already exists.");
  }

  // create a new book
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
        title: { $regex: search, $options: "i" },
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

module.exports = router;
