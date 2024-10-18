const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("It's receiving a request at auth route");
  next();
});

router.post("/register", async (req, res) => {
  // check if the user already exists
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) return res.status(400).send("User already exists");

  // create a new user
  let { name, email, password } = req.body;
  let newUser = new User({ name, email, password });
  try {
    let savedUser = await newUser.save();
    res
      .status(200)
      .send({ msg: "Successfully registered the user!", savedUser });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Failed to register the user...");
  }
});

module.exports = router;
