// PACKAGES
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const passport = require("passport");
const path = require("path");

// ROUTES
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();
app.use(cors());

// GENERAL SETTINGS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DATABASE CONNECTION
const db = require("./db");

// PASSPORT MIDDLEWARE
app.use(passport.initialize());

// PASSPORT CONFIG
require("./config/passport.js")(passport);

// USE ROUTES
app.use("/api/users", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// PRODUCTION MODE SETTINGS
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../client/build")));
  // app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
  });
}

// PORT SETTINGS
app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});

// "start": "node app.js", // npm start
// "server": "nodemon app.js" // npm run server
// "client-install": "npm install --prefix client",
// "client": "npm start --prefix client",
// "heroku-postbuild": "cd client && npm install && npm run build"
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
