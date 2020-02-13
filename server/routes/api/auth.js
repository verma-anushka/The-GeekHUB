// USER AUTHENTICATION

// DEPENDENCIES
const express = require("express");
const router = express.Router();

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const SALTROUNDS = 10;

const jwt = require("jsonwebtoken");
const keys = require("../../config/keys.js");
const passport = require("passport");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(keys.SENDGRID_API_KEY);
// INPUT VALIDATIONS
const validateSignUpInputs = require("../../validation/auth/signup");
const validateSignInInputs = require("../../validation/auth/signin");
const validateForgotPasswordInputs = require("../../validation/auth/forgotPassword");
const validateResetPasswordInputs = require("../../validation/auth/resetPassword");

// MODEL
const User = require("../../models/User");

// @route       : /api/users/signup
// @method      : POST
// @access      : public
// @description : route to send the activation link to user (SIGNUP)
router.post("/signup", (req, res) => {
  // Destructuring the errors and validations
  const { errors, isValid } = validateSignUpInputs(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors); // error
  }

  // console.log(req.body);
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
  if (token) {
    jwt.verify(token, keys.JWT_ACCOUNT_ACTIVATION, function(err, decodedToken) {
      if (err) {
        // console.log(err);
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

// @route       : /api/users/forgot-password
// @method      : PUT
// @access      : public
// @description : route for forgot password
router.post("/forgot-password", (req, res) => {
  // Destructuring the errors and validations
  const { errors, isValid } = validateForgotPasswordInputs(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors); // error
  }
  // Destructuring the required properties
  const { email } = req.body;

  // Find the user (email)
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User with the given email id does not exist!";
      // the user is not registred
      return res.status(404).json(
        // 404 error -> not found
        errors
      );
    }
    const jwtToken = jwt.sign(
      { id: user._id, firstname: user.firstname },
      keys.JWT_RESET_PASSWORD,
      {
        expiresIn: "1h" //  1 hour
      }
    );

    const msgToUser = {
      to: email,
      from: keys.EMAIL_FROM,
      subject: "Password Reset Request",
      text: "Mail from Go Geeks for password reset!",
      html: `
              <h4> Hello ${user.firstname} ${user.lastname} </h4>
              <p>Please use the following link to reset your password.</p>
              <p>http://localhost:3000/password/reset/${jwtToken}</p>
              <hr />
              <p>This email contains sensitive information. Please do not share it with anyone.</p>
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

    return user.updateOne({ resetPasswordToken: jwtToken }, (err, success) => {
      if (err) {
        // console.log('Reset password error', err);
        return res.status(400).json({
          error:
            "userDatabase connection error on reset password request bby user."
        });
      } else {
        // console.log(user.resetPasswordToken);
        sgMail
          .send(msgToUser)
          .then(sentMail => {
            // console.log(sentMail);
            return res.json({
              message: `Email has been sent to ${email}. Follow the instructions provided in the mail to reset your account password.`
            });
          })
          .catch(err => {
            // console.log(err);
            return res.status(400).json({
              message: err.message
            });
          });
      }
    });
  });
});

// @route       : /api/users/reset-password
// @method      : PUT
// @access      : public
// @description : route for reset password
router.put("/reset-password", (req, res) => {
  // Destructuring the errors and validations
  const { errors, isValid } = validateResetPasswordInputs(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors); // error
  }

  // Destructuring the required properties
  const { resetPasswordToken, password, confirmPassword } = req.body;
  if (resetPasswordToken) {
    jwt.verify(resetPasswordToken, keys.JWT_RESET_PASSWORD, function(
      err,
      decodedToken
    ) {
      if (err) {
        return res.status(400).json({
          error: "Link has expired. Try again!"
        });
      }

      // console.log(resetPasswordToken);

      User.findOne({ resetPasswordToken }, (err, user) => {
        // console.log(user);
        if (err || !user) {
          // console.log(user);
          // console.log(err);

          return res.status(400).json({
            error: "Something went wrong. Try again!"
          });
        }

        let updatedFields = {};
        // Password encryption
        bcrypt.genSalt(SALTROUNDS, (err, salt) => {
          // if (err) {
          //   throw err;
          // }
          // Password hashing
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              // console.log("Save User in DB error");
              return res.status(401).json({
                error: "Error occurred! Please try again."
              });
              // throw err;
            }

            updatedFields = {
              password: hash,
              resetPasswordToken: ""
            };
            // password = hash;
            // newUser
            //   .save()
            //   .then(user => res.json(user)) // registration successful
            //   .catch(err => console.log(`Error: ${err}`)); // registration unsuccessful
          });
        });

        user = _.extend(user, updatedFields);

        user.save(err => {
          if (err) {
            // console.log(err);
            return res.status(400).json({
              error: "Error resetting user password!"
            });
          } else {
            return res.status(200).json({
              message: `Great! Now you can login with your new password`
            });
          }
        });
      });
    });
  }
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
