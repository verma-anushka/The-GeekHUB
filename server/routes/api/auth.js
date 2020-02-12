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
const sgMail = require("@sendgrid/mail");
// console.log(keys.SENDGRID_API_KEY);
sgMail.setApiKey(keys.SENDGRID_API_KEY);
// INPUT VALIDATIONS
const validateSignUpInputs = require("../../validation/auth/signup");
const validateSignInInputs = require("../../validation/auth/signin");

// MODEL
const User = require("../../models/User");

// @route       : /api/users/signup
// @method      : POST
// @access      : public
// @description : route to register new user (SIGNUP)
router.post("/signup", (req, res) => {
  // Destructuring the errors and validations
  const { errors, isValid } = validateSignUpInputs(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors); // error
  }

  console.log(req.body);
  const { firstname, lastname, username, email, password } = req.body;
  // Check if the email id already exists
  User.findOne({ email }).then(user => {
    // console.log(user);
    if (user) {
      // the email entered by the user already exists, send error
      errors.email =
        "Email Already exists! Please choose another email address.";
      return res.status(400).json(errors);
    } else {
      // the email entered by the user already is unique

      // console.log(req.body);
      const payload = {
        // id: user.id,
        firstname,
        lastname,
        username,
        email,
        password
      };
      const jwtToken = jwt.sign(payload, keys.JWT_ACCOUNT_ACTIVATION, {
        expiresIn: "1d" //  1 hour
      });

      const msgToUser = {
        to: email,
        from: keys.EMAIL_FROM,
        subject: "Account activation Link",
        text: "Mail from Go Geeks for account activation!",
        html: `<h4> Hello ${firstname} ${lastname} </h4>
                  <p>Please use the following link to activate your account.</p>
                  <p>http://localhost:3000/activate/${jwtToken}</p>
                  `
      };
      const msgToAdmin = {
        to: keys.EMAIL_TO,
        from: keys.EMAIL_FROM,
        subject: "Sign Up request at Go Geeks!",
        text: "...",
        html: `<h4> Hello Admin </h4>
        <p>some text</p>
        `
      };

      sgMail
        .send(msgToUser)
        .then(sentMail => {
          // console.log(sentMail);
          return res.json({
            message: `Email has been sent to ${email}.Follow the instructions provided in the mail to activate your account.`
          });
        })
        .catch(err => {
          return res.status(400).json({
            message: err.message
          });
        });
    }
  });
});

// @route       : /api/users/activate-account
// @method      : POST
// @access      : public
// @description : route to register new user (SIGNUP)
router.post("/activate-account", (req, res) => {
  const token = req.body.token;
  // console.log(req.body);
  // console.log(token);

  if (token) {
    jwt.verify(token, keys.JWT_ACCOUNT_ACTIVATION, function(err, decodedToken) {
      if (err) {
        console.log(err);
        return res.status(401).json({
          error:
            "Link has expired. Please signup again to generate aother activation link."
        });
      }
      // Create the avatar - user profile image
      const avatar = gravatar.url(req.body.email, {
        s: "200", // image size
        r: "pg", // rating
        d: "mm" // default image
      });

      const { firstname, lastname, username, email, password } = jwt.decode(
        token
      );
      // Create new user
      const newUser = new User({
        firstname,
        lastname,
        username,
        email,
        password,
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
            // console.log("Save User in DB error");
            return res.status(401).json({
              error: "Error occurred! Please sign up again."
            });
            // throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user)) // registration successful
            .catch(err => console.log(`Error: ${err}`)); // registration unsuccessful
        });
      });
    });
  } else {
    return res.status(401).json({
      error: "Something went wrong. Try again!"
    });
  }
});

// @route       : /api/users/signin
// @method      : POST
// @access      : public
// @description : route to login user (SIGNIN)
router.post("/signin", (req, res) => {
  // Destructuring the errors and validations
  const { errors, isValid } = validateSignInInputs(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors); // error
  }
  // Destructuring the required properties
  const { email, password } = req.body;

  // Find the user (email)
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found!";
      // the user is not registred
      return res.status(404).json(
        // 404 error -> not found
        errors
      );
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
            expiresIn: 12 * 3600 //  12 hours
          },
          (err, token) => {
            res.json({ success: true, payload, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Incorrect password!";
        return res.status(400).json(errors);
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
