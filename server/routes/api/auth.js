// USER AUTHENTICATION

// DEPENDENCIES
const express = require("express");
const router = express.Router();

// const gravatar = require("gravatar");
const _ = require("lodash");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALTROUNDS = 10;

const keys = require("../../config/keys.js");
const passport = require("passport");

const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");

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
  User.findOne({ email })
    .then(user => {
      // console.log(user);
      if (user) {
        // the email entered by the user already exists, send error
        errors.email =
          "Email Already exists! Please choose another email address.";
        return res.status(400).json(errors);
      } else {
        // the email entered by the user already is unique
        const payload = {
          firstname,
          lastname,
          username,
          email,
          password
        };

        const jwtToken = jwt.sign(payload, keys.JWT_ACCOUNT_ACTIVATION, {
          expiresIn: "12h" //  12 hours
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
              message: `An email has been sent to ${email}. Follow the instructions provided in the mail to activate your account.`
            });
          })
          .catch(err => {
            errors.message = err.message;
            return res.status(400).json(errors);
          });
      }
    })
    .catch(err => {
      // console.log(err);
      errors.message = err.message;
      return res.status(400).json(errors);
    });
});

// @route       : /api/users/activate-account
// @method      : POST
// @access      : public
// @description : route to register new user (SIGNUP)
router.post("/activate-account", (req, res) => {
  const errors = {};
  const token = req.body.token;
  if (token) {
    jwt.verify(token, keys.JWT_ACCOUNT_ACTIVATION, function(err, decodedToken) {
      // console.log(decodedToken);
      if (err) {
        // console.log(err);
        errors.message =
          "Link has expired. Please signup again to generate aother activation link.";
        return res.status(401).json(errors);
      }

      // Create the avatar - user profile image
      // const avatar = gravatar.url(req.body.email, {
      //   s: "200", // image size
      //   r: "pg", // rating
      //   d: "mm" // default image
      // });

      const { firstname, lastname, username, email, password } = jwt.decode(
        token
      );

      // Create new user
      const newUser = new User({
        firstname,
        lastname,
        username,
        email,
        password
      });

      // Password encryption
      bcrypt.genSalt(SALTROUNDS, (err, salt) => {
        if (err) {
          // console.log(err);
          errors.message = "Something went wrong. Try again!";
          return res.status(401).json(errors);
        }
        // Password hashing
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            // console.log("Save User in DB error");
            errors.message = "Error occurred! Please sign up again";
            return res.status(401).json(errors);
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user)) // registration successful
            .catch(err => {
              // registration unsuccessful
              // console.log(err);
              errors.message = err.message;
              return res.status(401).json(errors);
            });
        });
      });
    });
  } else {
    errors.message = "Invalid Token! Try again!";
    return res.status(401).json(errors);
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
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "User not found!";
        // the user is not registred
        return res.status(404).json(errors);
      }
      // Check for password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // password matches
          // jwt payload
          const payload = {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            avatar: user.avatar
          };
          jwt.sign(
            payload,
            keys.JWT_SECRET,
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
    })
    .catch(err => {
      // console.log(err);
      errors.message = err.message;
      return res.status(400).json(errors);
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
    const payload = {
      id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      avatar: user.avatar
    };
    jwt.sign(
      payload,
      keys.JWT_SECRET,
      {
        expiresIn: 12 * 3600
      },
      (err, token) => {
        res.json({
          success: true,
          payload,
          token: "Bearer " + token
        });
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
      subject: `Password reset request from ${user.firstname} ${user.lastname}`,
      text: "...",
      html: `<h4> Hello Admin </h4>
      <p>some text</p>
      `
    };

    return user.updateOne({ resetPasswordToken: jwtToken }, (err, success) => {
      if (err) {
        errors.message =
          "Database connection error on reset password request by user.";
        return res.status(400).json(errors);
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
            errors.message = err.message;
            return res.status(400).json(errors);
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
  const { resetPasswordToken, password } = req.body;
  if (resetPasswordToken) {
    jwt.verify(resetPasswordToken, keys.JWT_RESET_PASSWORD, function(
      err,
      decodedToken
    ) {
      if (err) {
        errors.message = "Link has expired. Try again!";
        return res.status(400).json(errors);
      }
      User.findOne({ resetPasswordToken }, (err, user) => {
        if (err || !user) {
          errors.message = "Something went wrong. Try again!";
          return res.status(400).json(errors);
        }
        // Password encryption
        bcrypt.genSalt(SALTROUNDS, (err, salt) => {
          if (err) {
            // console.log(err);
            errors.message = "Something went wrong. Try again!";
            return res.status(401).json(errors);
          }
          // Password hashing
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              // console.log("Save User in DB error");
              errors.message = "Error occurred! Please try again.";
              return res.status(401).json(errors);
            }

            const updatedFields = {
              password: hash,
              resetPasswordToken: ""
            };

            user = _.extend(user, updatedFields);

            user.save(err => {
              if (err) {
                // console.log(err);
                errors.message = "Error resetting user password!";
                return res.status(400).json(errors);
              } else {
                return res.status(200).json({
                  message: `Password has been changed. You can now login with your new password.`
                });
              }
            });
          });
        });
      });
    });
  } else {
    errors.message = "Invalid Token. Please try again!";
    return res.status(401).json(errors);
  }
});

// @route       : /api/users/google-login
// @method      : POST
// @access      : public
// @description : route to register new user using Google Authentication
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
router.post("/google-login", (req, res) => {
  const errors = {};
  const { idToken } = req.body;
  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then(response => {
      const { email_verified, email } = response.payload;
      const firstname = response.payload.given_name;
      const lastname = response.payload.family_name;
      const username = response.payload.name;

      if (email_verified) {
        User.findOne({ email }).then(user => {
          if (user) {
            const payload = {
              id: user._id,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              avatar: user.avatar
            };
            jwt.sign(
              payload,
              keys.JWT_SECRET,
              {
                expiresIn: 12 * 3600
              },
              (err, token) => {
                res.json({
                  success: true,
                  payload,
                  token: "Bearer " + token
                });
              }
            );
            // const { _id, email, username, firstname, lastname } = user;
            // return res.json({
            //   token,
            //   user: { _id, email, username, firstname, lastname }
            // });
            // const token = jwt.sign(
            //   { _id: user._id },
            //   keys.JWT_SECRET,
            //   {
            //     expiresIn: "12h"
            //   },
            //   (err, token) => {
            //     res.json({ success: true, payload, token: "Bearer " + token });
            //   }
            // );
            //  const { _id, email, username, firstname, lastname } = user;
            // return res.json({
            //   token,
            //   user: { _id, email, username, firstname, lastname }
            // });
          } else {
            let password = email + keys.JWT_SECRET;
            user = new User({ username, firstname, lastname, email, password });
            // Password encryption
            bcrypt.genSalt(SALTROUNDS, (err, salt) => {
              if (err) {
                // console.log(err);
                errors.message = "Something went wrong. Try again!";
                return res.status(401).json(errors);
              }
              // Password hashing
              bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                  // console.log("Save User in DB error");
                  errors.message = "Error occurred! Please sign up again";
                  return res.status(401).json(errors);
                }
                user.password = hash;
                user.save((err, userData) => {
                  // console.log(userData);
                  if (err) {
                    // console.log(err);
                    errors.message = "Sign up with Google failed!";
                    return res.status(400).json(errors);
                  }
                  const payload = {
                    id: userData._id,
                    username: userData.username,
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    avatar: userData.avatar
                  };
                  jwt.sign(
                    payload,
                    keys.JWT_SECRET,
                    {
                      expiresIn: 12 * 3600 //  12 hours
                    },
                    (err, token) => {
                      res.json({
                        success: true,
                        payload,
                        token: "Bearer " + token
                      });
                    }
                  );
                });
              });
            });
            // user.save((err, userData) => {
            //   if (err) {
            //     console.log(err);
            //     return res.status(400).json({
            //       error: "User signup failed with google!"
            //     });
            //   }
            //   const payload = {
            //     _id: user._id,
            //     username: user.username,
            //     lastname: user.lastname,
            //     firstname: user.firstname,
            //     email: user.email
            //   };
            //   jwt.sign(
            //     { _id: userData._id },
            //     keys.JWT_SECRET,
            //     {
            //       expiresIn: 12 * 3600 //  12 hours
            //     },
            //     (err, token) => {
            //       res.json({
            //         success: true,
            //         user: payload,
            //         token: "Bearer " + token
            //       });
            //     }
            //   );
            //   // const token = jwt.sign(
            //   //   { _id: userData._id },
            //   //   keys.JWT_SECRET,
            //   //   {
            //   //     expiresIn: "12h"
            //   //   },
            //   //   (err, token) => {
            //   //     res.json({
            //   //       success: true,
            //   //       payload,
            //   //       token: "Bearer " + token
            //   //     });
            //   //   }
            //   // );
            //   // // console.log(userData);
            //   // const { _id, email, username, firstname, lastname } = userData;
            //   // return res.json({
            //   //   token,
            //   //   user: { _id, email, username, firstname, lastname }
            //   // });
            // });
          }
        });
      } else {
        errors.message = "Google Authentication failed. Try again!";
        return res.status(400).json(errors);
      }
    })
    .catch(err => {
      // console.log(err);
      errors.message = err.message;
      return res.status(400).json(errors);
    });
});

// @route       : /api/users/facebook-login
// @method      : POST
// @access      : public
// @description : route to register new user using facebook Authentication
router.post("/facebook-login", (req, res) => {
  // console.log(req.body.response);
  const errors = {};
  const { userID, firstname, lastname, accessToken } = req.body;
  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return (
    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      // .then(res => {
      //   console.log("res");
      //   console.log(res);
      // })
      .then(response => {
        // console.log(response);
        const email = response.email;
        const username = response.name;

        if (email) {
          User.findOne({ email }).then(user => {
            // console.log(user);
            if (user) {
              const payload = {
                id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                avatar: user.avatar
              };
              jwt.sign(
                payload,
                keys.JWT_SECRET,
                {
                  expiresIn: 12 * 3600 //  12 hours
                },
                (err, token) => {
                  res.json({
                    success: true,
                    payload,
                    token: "Bearer " + token
                  });
                }
              );
            } else {
              let password = email + keys.JWT_SECRET;
              user = new User({
                username,
                firstname,
                lastname,
                email,
                password
              });
              // Password encryption
              bcrypt.genSalt(SALTROUNDS, (err, salt) => {
                if (err) {
                  // console.log(err);
                  errors.message = "Something went wrong. Try again!";
                  return res.status(401).json(errors);
                }
                // Password hashing
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) {
                    // console.log("Save User in DB error");
                    errors.message = "Error occurred! Please sign up again";
                    return res.status(401).json(errors);
                  }
                  user.password = hash;
                  user.save((err, userData) => {
                    console.log(userData);
                    if (err) {
                      // console.log(err);
                      errors.message = "Sign up with Facebook failed!";
                      return res.status(400).json(errors);
                    }
                    const payload = {
                      id: userData._id,
                      username: userData.username,
                      firstname: userData.firstname,
                      lastname: userData.lastname,
                      avatar: userData.avatar
                    };
                    jwt.sign(
                      payload,
                      keys.JWT_SECRET,
                      {
                        expiresIn: 12 * 3600 //  12 hours
                      },
                      (err, token) => {
                        res.json({
                          success: true,
                          payload,
                          token: "Bearer " + token
                        });
                      }
                    );
                  });
                });
              });
            }
          });
        } else {
          // console.log("No email id provided. Please provide a valid email id!");
          errors.message =
            "No email id provided. Please provide a valid email id!";
          return res.status(400).json(errors);
        }
      })
      .catch(error => {
        res.json({
          error: "Facebook Authentication failed. Try later!"
        });
      })
  );
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
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
);

module.exports = router;
