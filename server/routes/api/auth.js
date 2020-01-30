// USER AUTHENTICATION

// DEPENDENCIES
const express = require("express");
const router = express.Router();

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const SALTROUNDS = 10;

const jwt = require("jsonwebtoken");
const keys = require("../../config/keys.js");
const passport = require("passport");

// MODEL
const User = require("../../models/User");

// @route       : /api/users/signup
// @method      : POST
// @access      : public
// @description : route to register new user (SIGNUP)
router.post("/signup", (req, res) => {
  // Check if the email id already exists
  User.findOne({ email: req.body.email }).then(user => {
    // console.log(user);
    if (user) {
      // the email entered by the user already exists, send error
      return res.status(400).json({
        email: "Email Already exists! Please choose another email address"
      });
    } else {
      // the email entered by the user already is unique

      // Create the avatar - user profile image
      const avatar = gravatar.url(req.body.email, {
        s: "200", // image size
        r: "pg", // rating
        d: "mm" // default image
      });

      // Create new user
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      // Password encryption
      bcrypt.genSalt(SALTROUNDS, (err, salt) => {
        // if (err) {
        //   throw err;
        // }
        // Password hashing
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user)) // registration successful
            .catch(err => console.log(`Error: ${err}`)); // registration unsuccessful
        });
      });
    }
  });
});

// @route       : /api/users/signin
// @method      : POST
// @access      : public
// @description : route to login user (SIGNIN)
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  // Find the user (email)
  User.findOne({ email }).then(user => {
    if (!user) {
      // the user is not registred
      return res.status(404).json({
        // 404 error -> not found
        email: "User not found"
      });
    }

    // Check for password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // password matches
        // jwt payload
        const payload = {
          id: user.id,
          username: user.username,
          avatar: user.avatar
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 360000 //  hours
          },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        return res.status(400).json({
          password: "Incorrect password!"
        });
      }
    });
  });
});

// @route       : /api/users/user
// @method      : GET
// @access      : private
// @description : route to return the current user
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      username: req.user.username,
      email: req.user.email
    });
  }
);

module.exports = router;
