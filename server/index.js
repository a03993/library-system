const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const userRoute = require("./routes/userRoute");

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

app.use("/api/user", userRoute);

// test
app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
