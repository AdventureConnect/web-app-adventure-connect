const Users = require("../models/userModel");
const Images = require('../models/imageModel');
require("dotenv").config();

const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const multer = require('multer');
const nodemailer = require('nodemailer');

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
  projectId: 'web-app-adventure-connect',
});
const bucketName = "adventure-connect-user-image-bucket";
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
      res.cookie("currentemail", user.email, cookieHeaders);
      res.cookie("currentInterests", user.interests, cookieHeaders);
      res.cookie("zipCode", user.zip_code, cookieHeaders);
      res.locals.loginStatus = true;
      return next();
    } else {
      // If the user is not found, send an error response
      res.status(401).json({ message: "Invalid login credentials!" });
    }
  } catch (error) {
    // If an error occurs, send an error response
    return next(error);
  }
};

userController.createNewUser = async (req, res, next) => {
  console.log("before inserting new document to db");

  const newUser = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    zipCode: req.body.zipCode,
    interests: req.body.interests,
    bio: req.body.bio,
  });
  console.log("made the document");
  try {
    //save the new user to the database
    const savedUser = await Users.create(newUser);
    const cookieHeaders = {
      httpOnly: false,
      overwrite: true,
    };
    res.cookie("currentEmail", savedUser.email, cookieHeaders);
    res.cookie("currentInterests", savedUser.interests, cookieHeaders);
    res.cookie("zipCode", savedUser.zipCode, cookieHeaders);

    console.log("saved the user to the db");
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

  // .then((data) => {
  //   Users.insertOne({data})
  //   console.log('User saved to the database');
  //   return next();
  // })
  // .catch(error => {
  //   console.log('Error saving user:', error);
  //   return next({error: error.message})
  // });
}

userController.uploadImages = (req, res) => {
  const upload =  multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
    onError : function(err, next) {
      console.log('error', err);
      next(err);
    }
  }).array('image');

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error uploading Files'});
    }
    const email = req.params.userEmail;
    console.log(req.file);
    if (!req.files) {
      res.status(400).send("No file uploaded.");
      return;
    }
    try {
      req.files.forEach(file => {
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();
        blobStream.on("error", (err) => {
          // next(err);
          console.log(err);
        });
        blobStream.on("finish", async () => {
          // The public URL can be used to directly access the file via HTTP.
          const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
          Images.create({email: email, image: publicUrl});
        });
        // urls.push(publicUrl);
        blobStream.end(file.buffer);
      });
      res.status(200).send('Images uploaded');
    }
    catch (err) {
      res.status(500).send('Error uploading images');
    }
  });
}

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
}

userController.checkemail = async (req, res) => {
  const email = req.query.email;
  console.log(email);
  try {
    const user = await Users.find({email: email});
    res.status(200).json({user: user});
  }
  catch (error) {
    console.error(error);
    // An error occurred while querying the database
    res.status(500).json({ message: "Server error!" });
  }
}

userController.sendEmail = async (req, res) => {
  // console.log(process.env.MY_EMAIL, process.env.APP_PASSWORD)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const { recipient_email, OTP } = req.body;

  const mailOptions = {
    from: 'adventureconnect_ptri11@codesmith.com',
    to: recipient_email,
    subject: 'AdventureConnect Password Reset',
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
      res.status(500).send({ message: "An error occurred while sending the email" });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send({ message: "Email sent successfully" });
    }
  });
}

userController.updatePassword = async (req, res) =>{
  const { email, newPassword } = req.body;
  try {
    const updatedUser = await Users.findOneAndUpdate({email: email}, { password: newPassword });
    res.status(200).json({updateUser: updatedUser});
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
}


module.exports = userController;
