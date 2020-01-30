// PACKAGES
const express = require("express");

const bodyParser = require("body-parser");

// ROUTES
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const app = express();

// GENERAL SETTINGS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// DATABASE CONNECTION
const db = require("./db");

// USE ROUTES
app.use("/api/users", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// PORT SETTINGS
app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});

// "start": "node app.js", // npm start
// "server": "nodemon app.js" // npm run server
