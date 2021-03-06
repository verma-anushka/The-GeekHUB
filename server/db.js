const mongoose = require("mongoose");

// DATABASE CONFIG
const uri = require("./config/keys").MONGO_URI;

mongoose
  .connect(uri, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connection error: ${err.message}`));
