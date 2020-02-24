// USER PROFILE

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const path = require("path");
const multer = require("multer");
var cloudinary = require("cloudinary");
const keys = require("../../config/keys.js");
const formData = require("express-form-data");

const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    console.log(
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
    callback(null, file.originalname);
  }
});
const imageFilter = function(req, file, callback) {
  // ACCEPT ONLY IMAGE FILES
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });
cloudinary.config({
  cloud_name: keys.CLOUDINARY_NAME,
  api_key: keys.CLOUDINARY_API_KEY,
  api_secret: keys.CLOUDINARY_API_SECRET
});
router.use(formData.parse());

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
    Profile.findOne({ user: req.query.id })
      .populate("user", [
        "username",
        "firstname",
        "lastname",
        "email",
        "avatar",
        "bannerImg"
      ]) // populate fields from users into the response
      .then(profile => {
        if (!profile) {
          // profile not found
          // console.log("no profile");
          errors.noprofile = "The current user doesn't have a profile!";
          return res.status(404).json(errors);
        }
        res.json(profile); // return the profile found
      })
      .catch(err => {
        console.log(err);
        errors.noprofile = "The current user doesn't have a profile!";
        return res.status(404).json(errors);
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
    .populate("user", [
      "username",
      "firstname",
      "lastname",
      "email",
      "avatar",
      "bannerImg"
    ]) // populate fields from users into the response
    .then(profile => {
      if (!profile) {
        // profile not found
        // console.log("no profile");
        errors.noprofile = "The current user doesn't have a profile!";
        return res.status(404).json(errors);
      }
      res.json(profile); // return the profile found
    })
    .catch(err => {
      console.log(err);
      errors.noprofile = "The current user doesn't have a profile!";
      return res.status(404).json(errors);
    });
});

// @route       : /api/profile/user/:user_id (Backend Route)
// @method      : GET
// @access      : public
// @description : route to show the current user's profile using the user id
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id }) // find a userhandle in the db matching the userhandle provided in the url
    .populate("user", [
      "username",
      "firstname",
      "lastname",
      "email",
      "avatar",
      "bannerImg"
    ]) // populate fields from users into the response
    .then(profile => {
      if (!profile) {
        // profile not found
        // console.log("no profile");
        errors.noprofile = "The current user doesn't have a profile!";
        return res.status(404).json(errors);
      }
      res.json(profile); // return the profile found
    })
    .catch(err => {
      console.log(err);
      errors.noprofile = "The current user doesn't have a profile!";
      return res.status(404).json(errors);
    });
});

// @route       : /api/profile/allprofiles
// @method      : GET
// @access      : public
// @description : route to show all users profiles
router.get("/allprofiles", (req, res) => {
  const errors = {};

  Profile.find() // find all the available profiles
    .populate("user", [
      "username",
      "firstname",
      "lastname",
      "email",
      "avatar",
      "bannerImg"
    ]) // populate fields from users into the response
    .then(profiles => {
      if (!profiles) {
        // no profiles found
        // console.log("no profiles");
        errors.noprofile = "There are no profiles to display!";
        return res.status(404).json(errors);
      }
      res.json(profiles); // return the profile found
    })
    .catch(err => {
      console.log(err);
      errors.noprofile = "There are no profiles to display!";
      return res.status(404).json(errors);
    });
});

// @route       : /api/profile
// @method      : POST
// @access      : private
// @description : route to create user profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Destructuring the errors and validations
    const { errors, isValid } = validateProfileInputs(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors); // error
    }

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
      profileFields.socialLinks.linkedin = req.body.linkedin;
    }
    // check if a medium profile link is provided by user
    if (req.body.medium) {
      profileFields.socialLinks.medium = req.body.medium;
    }
    // check if a behance profile link is provided by user
    if (req.body.behance) {
      profileFields.socialLinks.behance = req.body.behance;
    }
    // check if a github link is provided by user
    if (req.body.github) {
      profileFields.socialLinks.github = req.body.github;
    }
    // check if a youtube channel link is provided by user
    if (req.body.youtube) {
      profileFields.socialLinks.youtube = req.body.youtube;
    }
    // check if a twitter channel link is provided by user
    if (req.body.twitter) {
      profileFields.socialLinks.twitter = req.body.twitter;
    }
    // check if a facebook link is provided by user
    if (req.body.facebook) {
      profileFields.socialLinks.facebook = req.body.facebook;
    }
    // check if an instagram link is provided by user
    if (req.body.instagram) {
      profileFields.socialLinks.instagram = req.body.instagram;
    }

    // Creating/Updating the profile
    Profile.findOne({ user: req.user.id }) // find user by id
      .then(profile => {
        if (profile) {
          // if user profile exists - Update
          Profile.findOneAndUpdate(
            { user: req.user.id }, // the user to be updated
            { $set: profileFields }, // update all respective profile fields
            { new: true }
          )
            .then(profile => {
              res.json(profile); // return the profile after updating
            })
            .catch(err => {
              console.log(err);
              errors.message = "Profile update unsuccessful";
              return res.status(404).json(errors);
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
                })
                .catch(err => {
                  console.log(err);
                  errors.message = "Profile save in db unsuccessful";
                  return res.status(404).json(errors);
                });
            })
            .catch(err => {
              console.log(err);
              errors.message = "Profile creation unsuccessful";
              return res.status(404).json(errors);
            });
        }
      })
      .catch(err => {
        console.log(err);
        errors.message = "User not found!";
        return res.status(404).json(errors);
      });
  }
);

// @route       : /api/profile/uploadImg
// @method      : POST
// @access      : private
// @description : route to create user profile
router.post(
  "/uploadImg",
  // passport.authenticate("jwt", { session: false }),
  upload.single("photo"),
  (req, res) => {
    User.findOne({ user: req.params.id }).then(async user => {
      try {
        const values = Object.values(req.files);
        const promises = values.map(image =>
          cloudinary.uploader.upload(image.path)
        );

        Promise.all(promises).then(results => {
          if (req.files.banner) {
            // console.log("banner");
            user.bannerImgId = results[0].public_id;
            user.bannerImg = results[0].secure_url;
            console.log(user.bannerImg);
          } else {
            // console.log("avatar");
            user.avatarId = results[0].public_id;
            user.avatar = results[0].secure_url;
          }

          user.save();
          Profile.findOne({ profile: req.params.id })
            .populate("user", [
              "username",
              "firstname",
              "lastname",
              "email",
              "avatar",
              "bannerImg"
            ]) // find user using user id
            .then(profile => {
              return res.json(profile);
            })
            .catch(err => {
              console.log(err);
              res.status(404).json({ message: "Idk some error occurred!" });
            });
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Idk some error again!" });
      }
    });
  }
);

// @route       : /api/profile/education
// @method      : POST
// @access      : private
// @description : route to add education to profile
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Destructuring the errors and validations
    const { errors, isValid } = validateEducationInputs(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors); // error
    }

    Profile.findOne({ user: req.user.id }) // find user using user id
      .then(profile => {
        const newEducation = {
          name: req.body.name,
          degree: req.body.degree,
          fieldOfStudy: req.body.fieldOfStudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        profile.education.unshift(newEducation); // add new education to education array in the profile schema
        profile
          .save() // save the new education in the existing profile
          .then(profile => {
            // returns profile with the new education
            res.json(profile);
          })
          .catch(err => {
            console.log(err);
            errors.message = "Education update failed.";
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        console.log(err);
        errors.noprofile = "The current user doesn't have a profile!";
        return res.status(404).json(errors);
      });
  }
);

// @route       : /api/profile/education/:edu_id
// @method      : DELETE
// @access      : private
// @description : route to delete education from profile
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // the index of the user education to be deleted
        const idx = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);
        // splice the education to be deleted out of the array
        profile.education.splice(idx, 1);
        profile
          .save()
          .then(profile => {
            res.json(profile);
          })
          .catch(err => {
            console.log(err);
            errors.message =
              "Failed to delete education field from user profile!";
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        console.log(err);
        errors.noprofile = "The current user doesn't have a profile!";
        return res.status(404).json(errors);
      });
  }
);

// @route       : /api/profile/experience
// @method      : POST
// @access      : private
// @description : route to add experience to profile
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Destructuring the errors and validations
    const { errors, isValid } = validateExperienceInputs(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors); // error
    }

    Profile.findOne({ user: req.user.id }) // find user using user id
      .then(profile => {
        const newExperience = {
          title: req.body.title,
          organization: req.body.organization,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        profile.experience.unshift(newExperience); // add new experience to experience array in the profile schema
        profile
          .save() // save the new experience in the existing profile
          .then(profile => {
            // returns profile with the new experience
            res.json(profile);
          })
          .catch(err => {
            console.log(err);
            errors.message = "Experience update unsuccesful!";
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        console.log(err);
        errors.noprofile = "The current user doesn't have a profile!";
        return res.status(404).json(errors);
      });
  }
);

// @route       : /api/profile/experience/:exp_id
// @method      : DELETE
// @access      : private
// @description : route to delete experience from profile
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // the index of the user experience to be deleted
        const idx = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);
        // splice the experience to be deleted out of the array
        profile.experience.splice(idx, 1);
        profile
          .save()
          .then(profile => {
            res.json(profile);
          })
          .catch(err => {
            console.log(err);
            errors.noprofile =
              "Failed to delete education field from user profile!";
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        console.log(err);
        errors.noprofile = "The current user doesn't have a profile!";
        return res.status(404).json(errors);
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
          })
          .catch(err => {
            console.log(err);
            errors.noprofile = "User not found!";
            return res.status(404).json(errors);
          });
      })
      .catch(err => {
        console.log(err);
        errors.noprofile = "Profile not found!";
        return res.status(404).json(errors);
      });
  }
);

// @route       : /api/profile/follow/:id
// @method      : POST
// @access      : private
// @description : route to like a single post
router.post(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.params.id }) // find the user profile
      .then(profile => {
        if (
          // if the current user has already liked the post (user id present in the likes array)
          profile.followers.filter(
            follow => follow.user.toString() === req.user.id
          ).length > 0
        ) {
          errors.message = "User has already followed this user!";
          return res.status(400).json(errors);
        }

        // else -> add user id to the followers array
        profile.followers.unshift({ user: req.user.id });

        // save user's follow in the db
        profile.save().then(profile => {
          return res.json(profile);
        });
      })
      .catch(err => {
        console.log(err);
        errors.profilenotfound = "No profile found!";
        return res.status(404).json(errors);
      });
  }
);

// @route       : /api/profile/unfollow/:id
// @method      : POST
// @access      : private
// @description : route to unlike a single post
router.post(
  "/unfollow/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.params.id }) // find the user profile
      .then(profile => {
        if (
          // if the current user hasn't already followed the user (user id not present in the followers array)
          profile.followers.filter(
            follow => follow.user.toString() === req.user.id
          ).length === 0
        ) {
          errors.message = "User has not followed this profile yet!!";
          return res.status(400).json(errors);
        }

        // the index of the like to be reversed
        const idx = profile.followers
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        // splice the experience to be deleted out of the array
        profile.followers.splice(idx, 1);

        // save user's un-like in the db
        profile.save().then(profile => {
          // console.log(profile);
          return res.json(profile);
        });
      })
      .catch(err => {
        console.log(err);
        errors.profilenotfound = "No profile found!";
        return res.status(404).json(errors);
      });
  }
);

module.exports = router;
