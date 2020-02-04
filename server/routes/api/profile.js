// USER PROFILE

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// MODELS
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// INPUT VALIDATIONS
const validateProfileInputs = require("../../validation/profile/profile");
const validateEducationInputs = require("../../validation/profile/education");
const validateExperienceInputs = require("../../validation/profile/experience");

// @route       : /api/profile
// @method      : GET
// @access      : private
// @description : route to show the current user's profile
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    // req.user -> current logged in user from token(payload)
    Profile.findOne({ user: req.user.id })
      .populate("user", ["username", "email", "avatar"]) // populate fields from users into the response
      .then(profile => {
        if (!profile) {
          // profile not found
          errors.noprofile = "The current user doesn't have a profile!";
          return res.status(404).json(errors);
        }
        res.json(profile); // return the profile found
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

// @route       : /api/profile/handle/:handle (Backend Route)
// @method      : GET
// @access      : public
// @description : route to show the current user's profile using their username
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle }) // find a userhandle in the db matching the userhandle provided in the url
    .populate("user", ["name", "email", "avatar"]) // populate fields from users into the response
    .then(profile => {
      if (!profile) {
        // profile not found
        errors.noprofile = "The current user doesn't have a profile!";
        return res.status(404).json(errors);
      }
      res.json(profile); // return the profile found
    })
    .catch(err =>
      res
        .status(404)
        .json({ profile: "The current user doesn't have a profile!!" })
    );
});

// @route       : /api/profile/user/:user_id (Backend Route)
// @method      : GET
// @access      : public
// @description : route to show the current user's profile using the user id
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id }) // find a userhandle in the db matching the userhandle provided in the url
    .populate("user", ["name", "email", "avatar"]) // populate fields from users into the response
    .then(profile => {
      if (!profile) {
        // profile not found
        errors.noprofile = "The current user doesn't have a profile!";
        return res.status(404).json(errors);
      }
      res.json(profile); // return the profile found
    })
    .catch(err =>
      res
        .status(404)
        .json({ profile: "The current user doesn't have a profile!!" })
    );
});

// @route       : /api/profile/all
// @method      : GET
// @access      : public
// @description : route to show all users profiles
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find() // find all the available profiles
    .populate("user", ["name", "email", "avatar"]) // populate fields from users into the response
    .then(profiles => {
      if (!profiles) {
        // no profiles found
        errors.noprofile = "There are no profiles to display!";
        return res.status(404).json(errors);
      }
      res.json(profiles); // return the profile found
    })
    .catch(err =>
      res.status(404).json({ profile: "There are no profiles to display!" })
    );
});

// @route       : /api/profile
// @method      : POST
// @access      : private
// @description : route to create user profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {}; // object to store all the profile information
    profileFields.user = req.user.id; // req.user -> current logged in user from token(payload)

    // check if any handle is provided by user
    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }
    // check if any organization is provided by user
    if (req.body.organization) {
      profileFields.organization = req.body.organization;
    }
    // check if any website link is provided by user
    if (req.body.websiteLink) {
      profileFields.websiteLink = req.body.websiteLink;
    }
    // check if any location is provided by user
    if (req.body.location) {
      profileFields.location = req.body.location;
    }
    // check if any description is provided by user
    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }
    // check if any employment status is provided by user
    if (req.body.status) {
      profileFields.status = req.body.status;
    }
    // check if any github username is provided by user
    if (req.body.githubUsername) {
      profileFields.githubUsername = req.body.githubUsername;
    }

    // Skills (input type- CSV(comma seperated values))
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(","); // CSV -> array
    }

    // Social networking links
    profileFields.socialLinks = {}; // socialLinks -> array of objects

    // check if a linkedin profile link is provided by user
    if (req.body.linkedin) {
      profileFields.social.linkedin = req.body.linkedin;
    }
    // check if a medium profile link is provided by user
    if (req.body.medium) {
      profileFields.social.medium = req.body.medium;
    }
    // check if a behance profile link is provided by user
    if (req.body.behance) {
      profileFields.social.behance = req.body.behance;
    }
    // check if a github link is provided by user
    if (req.body.github) {
      profileFields.social.github = req.body.github;
    }
    // check if a youtube channel link is provided by user
    if (req.body.youtube) {
      profileFields.social.youtube = req.body.youtube;
    }
    // check if a twitter channel link is provided by user
    if (req.body.twitter) {
      profileFields.social.twitter = req.body.twitter;
    }
    // check if a facebook link is provided by user
    if (req.body.facebook) {
      profileFields.social.facebook = req.body.facebook;
    }
    // check if an instagram link is provided by user
    if (req.body.instagram) {
      profileFields.social.instagram = req.body.instagram;
    }

    // Creating/Updating the profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      // find user by id
      if (profile) {
        // if user profile exists - Update
        Profile.findOneAndUpdate(
          { user: req.user.id }, // the user to be updated
          { $set: profileFields }, // update all respective profile fields
          { new: true }
        ).then(profile => {
          res.json(profile); // return the profile after updating
        });
      } else {
        // if user profile does not exist - Create
        Profile.findOne({ handle: profileFields.handle }) // check for a unique userhandle
          .then(profile => {
            if (profile) {
              // profile with the given user handle
              errors.handle = "The given userhandle already exists!";
              res.status(400).json(errors);
            }
            // unique user handle
            new Profile(profileFields) // create the new user profile
              .save()
              .then(profile => {
                res.json(profile); // return the profile after creation
              });
          });
      }
    });
  }
);

// @route       : /api/profile/
// @method      : DELETE
// @access      : private
// @description : route to delete the user profile
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }) // to delete the profile
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }) // to delete the user
          .then(() => {
            res.json({ success: true });
          });
      });
  }
);
module.exports = router;
