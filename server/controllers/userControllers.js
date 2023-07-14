const Users = require('../models/userModel');

const userController = {};

//put all the necessary user shit in here as middleware, then put them into routes in api.js, then put that all together in server.js

//verifying user upon logging in, to be put in route for post to /api/login. if route is successful, redirect to show user page

userController.verifyLogin = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    //find a user that has a matching username and password
    const user = await Users.findOne({ username, password });

    if (user) {
      console.log('successful log in');
      //maybe just make a cookie for activities and zipcode? so don't have to query the database again later when finding similar users?
      res.cookie('currentUsername', user.username, { httpOnly: false, overwrite: true });
      res.cookie('currentInterests', JSON.stringify(user.interests), { httpOnly: false, overwrite: true });
      res.cookie('zipCode', JSON.stringify(user.zip_code), { httpOnly: false, overwrite: true });
      res.status(200).json({ message: 'Login successful!' });
      res.locals.loginStatus = true;
    } else {
      // If the user is not found, send an error response
      res.status(401).json({ message: 'Invalid credentials!' });
    }
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ message: 'Server error!' });
  }
  return next();
};

userController.createNewUser = async (req, res, next) => {
  //set all the values for no user from req.body
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

  console.log('made the document');
  try {
    //save the new user to the database
    const savedUser = await Users.create(newUser);
    res.cookie('currentEmail', savedUser.email, { httpOnly: false, overwrite: true });
    res.cookie('currentInterests', JSON.stringify(savedUser.interests), { httpOnly: false, overwrite: true });
    res.cookie('zipCode', JSON.stringify(savedUser.zipCode), { httpOnly: false, overwrite: true });
    console.log(
      JSON.stringify(savedUser.interests),
      `\nthis is JSON interests`,
      `\n`,
      JSON.stringify(savedUser.zipCode),
      `\n this is JSON zip code`,
      savedUser.email,
      `\n this is email`
    );

    console.log('saved the user to the db');
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

userController.updateUser = async (req, res, next) => {
  try {
    // grab username from the currentUser cookie
    const username = req.cookies.currentUsername;
    //find document by username and update it with the values from req.body
    const updatedUser = await Users.findOneAndUpdate({ username }, req.body, { new: true });

    if (updatedUser) {
      console.log(updatedUser);
      res.status(200);
      // Document found and updated successfully
    } else {
      console.log('User not found');
      // No document with the specified username was found
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
    res.status(500).json({ message: 'Server error!' });
  }
  return next();
};

module.exports = userController;
