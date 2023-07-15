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
const bucketName = "adventure-connect-user-image-bucket";
const bucket = cloudStorage.bucket(bucketName);

const userController = {};

//verifying user upon logging in, to be put in route for post to /api/login. if route is successful, redirect to show user page

userController.verifyLogin = async (req, res, next) => {
  const { username, password } = req.body

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
      res.cookie('currentUsername', user.username, { httpOnly: false, overwrite: true });
      res.cookie('currentInterests', JSON.stringify(user.interests), { httpOnly: false, overwrite: true });
      res.cookie('zipCode', JSON.stringify(user.zip_code), { httpOnly: false, overwrite: true});
      res.status(200).json({ message: 'Login successful!' });
      res.locals.loginStatus = true;
      return next();
    } else {
      // If the user is not found, send an error response
      return next(
        createErr({
          method: "userController.verifyLogin",
          type: "user does not exist in database",
          err: "user was not found using provided credentials",
        })
      );
    }
  } catch (error) {
    // If an error occurs, send an error response
    return next(
      createErr({
        method: "userController.verifyLogin",
        type: "could not verify",
        err: error,
      })
    );
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

<<<<<<<<< Temporary merge branch 1
    console.log("saved the user to the db");
    return next();
=========
  userController.createNewUser = async (req, res, next) => {
    console.log(Users);
    //set all the values for no user from req.body
    // console.log(JSON.stringify(req.body));
    // const {username, firstName, lastName, email, interests, zipCode, password} = req.body
    console.log('before inserting new document to db');

    const newUser = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode,
      interests: req.body.interests,
      bio: req.body.bio,
    });
    console.log('made the document')
    try {
      //save the new user to the database
      const savedUser = await Users.create(newUser)
      res.cookie('currentEmail', savedUser.email, { httpOnly: false, overwrite: true });
      res.cookie('currentInterests', JSON.stringify(savedUser.interests), { httpOnly: false, overwrite: true });
      res.cookie('zipCode', JSON.stringify(savedUser.zipCode), { httpOnly: false, overwrite: true});
    console.log(JSON.stringify(savedUser.interests), `\nthis is JSON interests`, `\n`, JSON.stringify(savedUser.zipCode), `\n this is JSON zip code`, savedUser.email, `\n this is email`);
    console.log('saved the user to the db');
    return next()
>>>>>>>>> Temporary merge branch 2
  } catch (error) {
    return next(
      createErr({
        method: "userController.createNewUser",
        type: "Method Failed",
        err: error,
      })
    );
  }
};

userController.uploadImages = (req, res) => {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
    onError: function (err, next) {
      console.log("error", err);
      next(err);
    },
  }).array("image");

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error uploading Files" });
    }
    const email = req.params.userEmail;
    console.log(req.file);
    if (!req.files) {
      res.status(400).send("No file uploaded.");
      return;
    }
    try {
      req.files.forEach((file) => {
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();
        blobStream.on("error", (err) => {
          // next(err);
          console.log(err);
        });
        blobStream.on("finish", async () => {
          // The public URL can be used to directly access the file via HTTP.
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
          Images.create({ email: email, image: publicUrl });
        });
        // urls.push(publicUrl);
        blobStream.end(file.buffer);
      });
      res.status(200).send("Images uploaded");
    } catch (err) {
      res.status(500).send("Error uploading images");
    }
  });
};

//Jay's old version
// userController.updateUser = async (req, res, next) => {
//   try {
//     // grab email from the currentUser cookie
//     const email = req.cookies.currentemail;
//     //find document by email and update it with the values from req.body
//     const updatedUser = await Users.findOneAndUpdate({ email }, req.body, {
//       new: true,
//     });

//     if (updatedUser) {
//       // Document found and updated successfully
//       console.log(updatedUser);
//       return next();
//     } else {
//       //if user not found then forward error to error handler
//       return next(
//         createErr({
//           method: "userController.updateUser",
//           type: "Method Failed",
//           err: "no document with the specified email was found",
//         })
//       );
//     }
//     return next();
//   } catch (error) {
//     return next(
//       createErr({
//         method: "userController.updateUser",
//         type: "Method Failed",
//         err: error,
//       })
//     );
//   }
// };

//Julia's updated version
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
      return res.status(200).json({ message: "User updated successfully" });
    } else {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

userController.getProfiles = async (req, res, next) => {
  console.log('get profiles middleware ran');
  try {
    //grab zipCode from the cookie and convert to number to match schema
    const zipcode = Number(req.cookies.zipCode);
    //grab email from the cookie
    const email = req.cookies.currentEmail;
    console.log(req.cookies.currentEmail, 'this is the email we are looking for in the db');
    //fetch current user's interests from the database
    const currentUser = await Users.findOne({ email: 'aiden130@yahoo.com' });
    console.log(currentUser, 'this is current user');
    const interests = currentUser.interests;
    //find users with same zipcode and at least one interest in common
    const users = await Users.find({
      // zipCode: zipcode,
      interests: { $in: interests },
    });

    // Array of users with matching zipCode and at least one common interest
    // console.log(users);

    //store users on res.locals
    res.locals.matchingUsers = users;

    return next();
  } catch (error) {
    return next(
      createErr({
        method: "userController.getProfiles",
        type: "Method Failed",
        err: error,
      })
    );
  }
  return next();
<<<<<<<<< Temporary merge branch 1
};
=========
}

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
}

>>>>>>>>> Temporary merge branch 2

module.exports = userController;

// this searches the matches array for any emails
// await Users.find({matches:{$in:'ajmattus@gmail.com'}})

// this searches the interests array for any interests
// await Users.find({interests:{$in:'Rafting'}})

// this searches the interests array that at least have both Rafting and Camping
// const foundMatch = await Users.find({interests:{$all:['Rafting', 'Camping']}})

// use this for decoding email addresses encoded on cookies
// await Users.find({matches:{$in:decodeURIComponent(req.cookies.currentEmail)}})