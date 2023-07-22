const Users = require("../models/userModel");
const { createErr } = require("../utils/errorCreator");
const Images = require("../models/imageModel");
require("dotenv").config();

const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const multer = require("multer");
const nodemailer = require("nodemailer");

// const upload =  multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
//   },
//   onError : function(err, next) {
//     console.log('error', err);
//     next(err);
//   }
// });

const cloudStorage = new Storage({
  keyFilename: `${__dirname}/../web-app-adventure-connect-39d349a3f0d5.json`,
  projectId: "web-app-adventure-connect",
});
const bucketName = "adventure-connect-image-bucket";
const bucket = cloudStorage.bucket(bucketName);

const userController = {};

//verifying user upon logging in, to be put in route for post to /api/login. if route is successful, redirect to show user page

userController.verifyLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //find a user that has a matching email and password
    const user = await Users.findOne({ email, password });

    const cookieHeaders = {
      httpOnly: false,
      overwrite: true,
    };

    if (user) {
      console.log("successful log in");
      //maybe just make a cookie for activities and zipcode? so don't have to query the database again later when finding similar users?

      // remopve cookies with user info and then send on res.local object
      res.cookie("currentemail", user.email, cookieHeaders);
      res.cookie("currentInterests", user.interests, cookieHeaders);
      res.cookie("zipCode", user.zip_code, cookieHeaders);
      res.locals.loginStatus = true;
      // store user information on res.locals object to have access to user information in react
      res.locals.user = user;
    } else {
      // If the user is not found, send an error response
      res.locals.errorStatus = "Invalid login credentials"
    }
    return next()
  } catch (error) {
    // If an error occurs, send an error response
    return next(error);
  }
};

userController.createNewUser = async (req, res, next) => {
  console.log(
    "usercontroller.createNewUser before inserting new document to db"
  );

  const newUser = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    zipCode: req.body.zipCode,
    interests: req.body.interests,
    bio: req.body.bio,
  });
  console.log("usercontroller.createNewUser made the document");
  try {
    //save the new user to the database
    const savedUser = await Users.create(newUser);
    const cookieHeaders = {
      httpOnly: false,
      overwrite: true,
    };

    // save new user information to res.locals object instead of res.cookies
    res.cookie("currentEmail", savedUser.email, cookieHeaders);
    res.cookie("currentInterests", savedUser.interests, cookieHeaders);
    res.cookie("zipCode", savedUser.zipCode, cookieHeaders);

    console.log("usercontroller.createNewUser saved the user to the db");
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

userController.updateUser = async (req, res, next) => {
  try {
    // grab email from the currentUser cookie
    const email = req.cookies.currentemail;
    //find document by email and update it with the values from req.body
    const updatedUser = await Users.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

    if (updatedUser) {
      console.log(updatedUser);
      res.status(200);
      // Document found and updated successfully
    } else {
      console.log("User not found");
      // No document with the specified email was found
    }
  } catch (error) {
    console.error(error);
  }
  return next();
};

userController.getProfiles = async (req, res, next) => {
  try {
    //grab zipCode from the cookie and convert to number to match schema
    const zipCode = Number(req.cookies.zipCode);
    //grab interests from the cookie, parse it from JSON format
    const interests = JSON.parse(req.cookies.currentInterests);

    //find users with same zipcode and at least one interest in common
    const users = await Users.find({
      zip_code: zipCode,
      interests: { $in: interests },
    });

    console.log(users);
    // Array of users with matching zipCode and at least one common interest

    res.status(200);
    //store users on res.locals
    res.locals.matchingUsers = users;
  } catch (error) {
    console.error(error);
    // An error occurred while querying the database
    res.status(500).json({ message: "Server error!" });
  }
  return next();
};

module.exports = userController;
