const mongoose = require("mongoose");
require("dotenv").config();

// move to MONGO_URIO variable to dotenv file
const MONGO_URI = process.env.MONGO_URI; //replace with new URI
// console.log(MONGO_URI);

// call this function inside server.js
const connectDB = () => {
  mongoose
    .connect(MONGO_URI, {
      // options for the connect method to parse the URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // sets the name of the DB that our collections are part of
      dbName: "adventureConnect", //change to correct DB
    })
    .then(() => console.log("Connected to Mongo DB."))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
