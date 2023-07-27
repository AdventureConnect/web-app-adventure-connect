const { createErr } = require("../utils/errorCreator");
// const Images = require("../models/imageModel");
require("dotenv").config();
const bcrypt = require("bcrypt");

// const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const multer = require("multer");
const nodemailer = require("nodemailer");

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

    console.log("new user saved to database");
    // console.log(newUser);

    res.locals.user = newUser;

    return next();
  } catch (error) {
    return next({ message: { err: "Email is already taken" } });
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

userController.checkemail = async (req, res) => {
  const email = req.query.email;
  console.log(email);
  try {
    const user = await Users.find({ email: email });
    res.status(200).json({ user: user });
  } catch (error) {
    console.error(error);
    // An error occurred while querying the database
    res.status(500).json({ message: "Server error!" });
  }
};

userController.sendEmail = async (req, res) => {
  // console.log(process.env.MY_EMAIL, process.env.APP_PASSWORD)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const { recipient_email, OTP } = req.body;

  const mailOptions = {
    from: "adventureconnect_ptri11@codesmith.com",
    to: recipient_email,
    subject: "AdventureConnect Password Reset",
    html: `<html>
             <body>
               <h2>Password Recovery</h2>
               <p>Use this OTP to reset your password. OTP is valid for 1 minute</p>
               <h3>${OTP}</h3>
             </body>
           </html>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "An error occurred while sending the email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send({ message: "Email sent successfully" });
    }
  });
};

userController.updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { email: email },
      { password: newPassword }
    );
    res.status(200).json({ updateUser: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = userController;
