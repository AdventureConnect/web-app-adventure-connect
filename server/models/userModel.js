const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI; //replace with new URI
console.log(MONGO_URI);

// call this function inside server.js
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      // options for the connect method to parse the URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // sets the name of the DB that our collections are part of
      dbName: "adventureConnect", //change to correct DB
    })
    .then(() => console.log("Connected to Mongo DB."))
    .catch((err) => console.log(err));
};

// Users
const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  interests: { type: Array },
  zip_code: { type: Number, required: true },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = {
  connectDB,
  Users,
};
