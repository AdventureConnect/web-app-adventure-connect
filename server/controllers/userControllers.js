const Users = require("../models/userModel");

const userController = {};

//put all the necessary user shit in here as middleware, then put them into routes in api.js, then put that all together in server.js

//verifying user upon logging in, to be put in route for post to /api/login. if route is successful, redirect to show user page 

userController.verifyLogin = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await Users.findOne({ username, password });

    if (user) {
      console.log('successful log in');
      //maybe just make a cookie for activities and zipcode? so don't have to query the database again later when finding similar users?
      res.cookie('currentUsername', user.username, { httpOnly: false, overwrite: true });
      res.cookie('currentInterests', JSON.stringify(user.interests), { httpOnly: false, overwrite: true });
      res.cookie('zipCode', JSON.stringify(user.zip_code), { httpOnly: false, overwrite: true});
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
  }


  userController.createNewUser = async (req, res, next) => {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const interests = req.body.interests;
    const zipCode = req.body.zipCode;
    const password = req.body.password;

    const newUser = new Users({
      username,
      firstName,
      lastName,
      email,
      password,
      interests,
      zipCode
    });
    res.cookie('currentUsername', user.username, { httpOnly: false, overwrite: true });
    res.cookie('currentInterests', JSON.stringify(user.interests), { httpOnly: false, overwrite: true });
    res.cookie('zipCode', JSON.stringify(user.zip_code), { httpOnly: false, overwrite: true});

  newUser.save()
  .then(() => {
    console.log('User saved to the database');
  })
  .catch(error => {
    console.error('Error saving user:', error);
  });
    return next();
}

module.exports = userController;
