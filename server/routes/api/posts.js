// USERS POSTS AND COMMENTS

const express = require("express");
const router = express.Router();

// @route       : /api/posts/test
// @method      : GET
// @access      : public
// @description : test the post route
router.get("/test", (req, res) => {
  res.json({
    message: "POSTS ROUTE"
  });
});

module.exports = router;
