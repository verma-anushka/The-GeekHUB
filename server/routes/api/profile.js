// USER PROFILE

const express = require("express");
const router = express.Router();

// @route       : /api/profile/test
// @method      : GET
// @access      : public
// @description : route to test the users auth
router.get("/test", (req, res) => {
  res.json({
    message: "PROFILE ROUTE!"
  });
});

module.exports = router;
