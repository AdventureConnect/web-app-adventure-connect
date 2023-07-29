iconst { createErr } = require("../utils/errorCreator");
// const Images = require("../models/imageModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config;

// const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cookieParser = require('cookie-parser');

const User = require("../models/userModel");

const userController = {};

// const cloudStorage = new Storage({
//   keyFilename: `${__dirname}/../web-app-adventure-connect-39d349a3f0d5.json`,
//   projectId: "web-app-adventure-connect",
// });
// const bucketName = "adventure-connect-image-bucket";
// const bucket = cloudStorage.bucket(bucketName);

//verifying user upon logging in, to be put in route for post to /api/login. if route is successful, redirect to show user page

userController.verifyLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
  
      res.locals.user = user;
      //add something that adds the JWT here
      const currentUser = { user: user._id};
      const accessToken = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s'});
      res.locals.accessToken = accessToken;
      res.cookie('access_token', accessToken, {
        httpOnly: true, 
        maxAge: 1800000, 
        sameSite: 'lax',
        path: '/',
        secure: false,
      });
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

    console.log("new user saved to database");
    // console.log(newUser);

    res.locals.user = newUser;

    const currentUser = { user: newUser._id};
    const accessToken = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s'});
    console.log(accessToken);
    res.locals.accessToken = accessToken;
    res.cookie('access_token', accessToken, {
      httpOnly: true, 
      maxAge: 1800000, 
      sameSite: 'lax',
      path: '/',
      secure: false,
    });

    return next();
  } catch (error) {
    return next({ message: { err: "Email is already in use" } });
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

// verify user route to give information to state in the redux store
userController.verifyUser = async (req, res, next) => {
  const { user_id } = req.body;
  const _id = user_id;

  try {
    const user = await User.findOne({ _id });

    if (user) {
      // res.locals.loginStatus = true;
      res.locals.user = user;
      return next();
    } else {
      res.status(401).json({ message: "User not found!" });
    }
  } catch (error) {
    return next(error);
  }
};

userController.getProfiles = async (req, res, next) => {
//grab id from req query params
console.log('get profiles middleware ran, token authenticated');
const userId = req.params.id;
console.log('user id is', userId);

try {
  // try to find a user that has the id that's sent on the query
  const currentUser = await User.findById(userId);
  console.log('current user is', currentUser);
 //send 404 if can't find current user in database 
 if (!currentUser) {
   return res.status(404).json({ error: 'User not found' });
 }
//grab that user's zipcode and interests and save them in variables 
const zipCode = currentUser.zipCode;
const interests = currentUser.interests;
//grab all other user's with a different id, the same zipcode, and at least one activity in common 
const users = await User.find({
 //how to make sure different 
 _id: { $ne: userId },
 zipCode,
 interests: { $in: interests },
})
//put similar users on res.locals
res.locals.users = users;
console.log(users);
return next();
} catch (error) {
console.error('Error finding similar users:', error);
res.status(500).json({ error: 'Internal Server Error' });
}
};

//then put this into every api route
userController.authenticateToken = (req, res, next) => {
  console.log('authenticate token middleware ran');
  const token = req.cookies.access_token; // extract the token from cookies
  console.log('token is', token)
  console.log('token is', token)
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })

}

module.exports = userController;


