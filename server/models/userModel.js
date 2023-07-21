const mongoose = require("mongoose");

// Users
const usersSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  zipCode: { type: Number, required: true },
  interests: [{ type: String }],
  bio: { type: String },
  matches: [{ type: String }],
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
