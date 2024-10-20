const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");

mongoose
  .connect("mongodb://localhost:27017/library")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/books", bookRoute);

// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
