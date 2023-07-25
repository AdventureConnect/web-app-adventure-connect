const { createErr } = require("../utils/errorCreator");
const Images = require("../models/imageModel");
require("dotenv").config();
const bcrypt = require("bcrypt");

const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const multer = require("multer");
const nodemailer = require("nodemailer");


const User = require("../models/userModel");

const userController = {};



const cloudStorage = new Storage({
  keyFilename: `${__dirname}/../web-app-adventure-connect-39d349a3f0d5.json`,
  projectId: "web-app-adventure-connect",
});
const bucketName = "adventure-connect-image-bucket";
const bucket = cloudStorage.bucket(bucketName);



//verifying user upon logging in, to be put in route for post to /api/login. if route is successful, redirect to show user page

userController.verifyLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      // res.locals.loginStatus = true;
      res.locals.user = user;
      return next();
    } else {
      res.status(401).json({ message: "Invalid login credentials!" });
    }
  } catch (error) {
    return next(error);
  }
};

userController.createNewUser = async (req, res, next) => {
  const { name, email, password, zipCode, interests, bio } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password,
      zipCode,
      interests,
      bio,
    });

    console.log('new user saved to database');
    console.log(newUser);

    res.locals.user = newUser;
    return next();
  } catch (error) {
    return next({ message: { err: "Email is already taken" }});
  }
};

userController.updateUser = async (req, res, next) => {
  try {
    const { email } = req.cookies.currentEmail;
    const updatedUser = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

    if (updatedUser) {
      console.log(updatedUser);
      res.status(200);
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error(error);
  }
  return next();
};

userController.getProfiles = async (req, res, next) => {
  try {
    const zipCode = Number(req.cookies.zipCode);
    const interests = JSON.parse(req.cookies.currentInterests);

    const users = await User.find({
      zipCode,
      interests: { $in: interests },
    });

    console.log(users);
    res.locals.matchingUsers = users;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
  return next();
};

module.exports = userController;


module.exports = userController;
