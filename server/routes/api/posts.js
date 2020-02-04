// USERS POSTS AND COMMENTS

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// MODELS
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// INPUT VALIDATIONS
const validatePostInputs = require("../../validation/posts/post");

// @route       : /api/posts
// @method      : POST
// @access      : private
// @description : route to create posts
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // ------------------------validations
    const { errors, isValid } = validatePostInputs(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // ------------------------validations

    // Create new post
    const newPost = new Post({
      content: req.body.content,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    // Save the post in the schema
    newPost.save().then(post => {
      res.json(post);
    });
  }
);

// @route       : /api/posts
// @method      : GET
// @access      : public
// @description : route to get all posts
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 }) // descending order- most recent posts on top
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(404).json({ nopostsfound: "No posts found!" });
    });
});

// @route       : /api/posts/:id
// @method      : GET
// @access      : public
// @description : route to get a single post
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "Post does not exist!" })
    );
});

// @route       : /api/posts/:id
// @method      : DELETE
// @access      : private
// @description : route to delete a single post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }) // find the user profile (author of the post)
      .then(profile => {
        Post.findById(req.params.id) // find the post to be deleted
          .then(post => {
            // check the post author
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: "User not authorized!" });
            }
            // post author found, delete post
            post.remove().then(() => {
              res.json({ success: true });
            });
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found!" })
          );
      });
  }
);

// @route       : /api/posts/like/:id
// @method      : POST
// @access      : private
// @description : route to like a single post
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }) // find the user profile
      .then(profile => {
        Post.findById(req.params.id) // find the post to be liked
          .then(post => {
            if (
              // if the current user has already liked the post (user id present in the likes array)
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: "User has already liked this post!" });
            }

            // else -> add user id to the likes array
            post.likes.unshift({ user: req.user.id });

            // save user's like in the db
            post.save().then(post => {
              res.json(post);
            });
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found!" })
          );
      });
  }
);

// @route       : /api/posts/unlike/:id
// @method      : POST
// @access      : private
// @description : route to unlike a single post
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }) // find the user profile
      .then(profile => {
        Post.findById(req.params.id) // find the post to be un-liked
          .then(post => {
            if (
              // if the current user hasn't already liked the post (user id not present in the likes array)
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0
            ) {
              return res
                .status(400)
                .json({ notliked: "User has not yet liked this post yet!" });
            }

            // the index of the like to be reversed
            const idx = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            // splice the experience to be deleted out of the array
            post.likes.splice(idx, 1);

            // save user's un-like in the db
            post.save().then(post => {
              res.json(post);
            });
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      });
  }
);

// @route       : /api/posts/comment/:id
// @method      : POST
// @access      : private
// @description : route to comment on a post
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // ------------------------validations

    const { errors, isValid } = validatePostInputs(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // ------------------------validations

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          content: req.body.content,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // add user id to the likes array
        post.comments.unshift(newComment);
        // save user's like in the db
        post.save().then(post => {
          res.json(post);
        });
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found!" }));
  }
);

// @route       : /api/posts/comment/:id/:comment_id
// @method      : DELETE
// @access      : private
// @description : route to delete a comment on single post
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          // if the current user hasn't commented on the post (user id not present in the comments array)
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist!" });
        }
        // the index of the comment to be deleted
        const idx = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        // splice the experience to be deleted out of the array
        post.comments.splice(idx, 1);
        // save user's un-like in the db
        post.save().then(post => {
          res.json(post);
        });
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
