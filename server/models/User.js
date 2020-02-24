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
    required: true
    // unique: true
  },
  // User's email address
  email: {
    type: String,
    required: true
    // unique: true
  },
  // User's account password
  password: {
    type: String,
    required: true
    // minlength: 5
  },
  // User's profile image
  // avatar: {
  //   type: String
  // },
  // Forget Password Token
  resetPasswordToken: {
    data: String,
    default: ""
  },
  // User's signup date
  date: {
    type: Date,
    default: Date.now
  },
  // User's profile image
  avatar: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2014/04/02/16/26/figure-307268_960_720.png"
  },
  avatarId: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2014/04/02/16/26/figure-307268_960_720.png"
      .public_id
  },
  // User's banner image
  bannerImg: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2014/04/02/16/26/figure-307268_960_720.png"
  },
  bannerImgId: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2014/04/02/16/26/figure-307268_960_720.png"
      .public_id
  }
});

module.exports = mongoose.model("User", UserSchema);
