const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  resetPasswordToken: String, // for password reset functionality
  resetPasswordExpires: Date,
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ], // Array of books the user has added to their wishlist
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (err) {
    throw err;
  }
};

// Pre-save middleware to hash passwords before saving
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    const hashValue = await bcrypt.hash(user.password, 10);
    user.password = hashValue;
  }
  next();
});

// User model
const User = mongoose.model("User", UserSchema);
module.exports = User;
