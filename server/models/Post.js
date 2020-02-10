const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  // Reference to User Schema
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  // Content of the post
  content: {
    type: String,
    required: true
  },
  // Author's name
  name: {
    type: String
  },
  // Author's profile image
  avatar: {
    type: String
  },
  // #likes on a comment
  likes: [
    // array of objects
    {
      // Reference to User Schema
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  // Comments on the post
  comments: [
    // array of objects
    {
      // Reference to User Schema
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      // Content of the comment
      content: {
        type: String,
        required: true
      },
      // Authore's name
      name: {
        type: String
      },
      // Author's profile image
      avatar: {
        type: String
      },
      // Date of comment
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  // Date of posts
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
