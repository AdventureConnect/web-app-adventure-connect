const Users = require("../models/userModel");
const { createErr } = require("../utils/errorCreator");

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

    console.log("saved the user to the db");
    return next();
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

userController.updateUser = async (req, res, next) => {
  try {
    // grab email from the currentUser cookie
    const email = req.cookies.currentemail;
    //find document by email and update it with the values from req.body
    const updatedUser = await Users.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

    if (updatedUser) {
      // Document found and updated successfully
      console.log(updatedUser);
      return next();
    } else {
      //if user not found then forward error to error handler
      return next(
        createErr({
          method: "userController.updateUser",
          type: "Method Failed",
          err: "no document with the specified email was found",
        })
      );
    }
    return next();
  } catch (error) {
    return next(
      createErr({
        method: "userController.updateUser",
        type: "Method Failed",
        err: error,
      })
    );
  }
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
};

module.exports = userController;
