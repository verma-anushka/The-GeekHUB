// USER AUTHENTICATION

const express = require("express");
const router = express.Router();

// @route       : /api/users/test
// @method      : GET
// @access      : public
// @description : route to test the users auth
router.get("/test", (req, res) => {
  res.json({
    message: "USER AUTHENTICATED!"
  });
});

module.exports = router;
