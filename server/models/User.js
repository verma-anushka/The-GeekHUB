const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  // User's first name
  firstname: {
    type: String,
    maxlength: 50
  },
  // User's last name
  lastname: {
    type: String,
    maxlength: 50
  },
  // User's username
  username: {
    type: String,
    required: true,
    unique: true
  },
  // User's email address
  email: {
    type: String,
    required: true,
    unique: true
  },
  // User's account password
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  // User's profile image
  avatar: {
    type: String,
    required: true
  },
  // User's signup date
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
