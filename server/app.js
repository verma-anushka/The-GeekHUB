// PACKAGES
const express = require("express");
const app = express();

const db = require("./db");

// GENERAL SETTINGS

// HANDLERS

// MODELS

// ROUTES
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

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
