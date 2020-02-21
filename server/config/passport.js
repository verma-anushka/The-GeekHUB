const jwtStrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const keys = require("../config/keys.js");

const options = {};
options.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.JWT_SECRET;

module.exports = passport => {
  passport.use(
    new jwtStrategy(
      options,
      // {
      //   jwtFromRequest: extractJWT.fromAuthHeaderWithScheme("Bearer"),
      //   secretOrKey: keys.JWT_SECRET
      // },
      (payload, done) => {
        User.findById(payload.id)
          .then(user => {
            if (user) {
              // current user is found in db
              return done(null, user); // null -> no error
            }
            return done(null, false); // current user is not found in db
          })
          .catch(err => console.log(`Error: ${err}`));
      }
    )
  );
};
