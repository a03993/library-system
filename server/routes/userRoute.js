const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

console.log("PASSPORT_SECRET:", process.env.PASSPORT_SECRET);

router.use((req, res, next) => {
  console.log("It's receiving a request at auth route");
  next();
});

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) return res.status(400).send("User already exists");

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

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    return res.status(401).send("cannot find the user, please check the email");
  }

  try {
    const isMatch = await foundUser.comparePassword(req.body.password);
    if (isMatch) {
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.status(200).send({
        msg: "Successfully logged in!",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("password is wrong");
    }
  } catch (err) {
    console.log("Error login in: ", err);
    return res.status(500).send("Failed to login...");
  }
});

router.post("/wishlist/add", async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.wishlist.includes(bookId)) {
      return res.status(400).send("Book is already in your wishlist");
    }

    user.wishlist.push(bookId);
    await user.save();

    res.status(200).send({
      msg: "Book added to wishlist!",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).send("Failed to add to wishlist");
  }
});

router.get("/wishlist/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("wishlist");

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({ wishlist: user.wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).send("Failed to fetch wishlist");
  }
});

router.post("/wishlist/remove", async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: bookId } },
      { new: true }
    ).populate("wishlist");

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({
      msg: "Book removed from wishlist!",
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).send("Failed to remove from wishlist");
  }
});

module.exports = router;
