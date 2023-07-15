const Users = require('../models/userModel');

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
      res.status(401).json({ message: "Invalid login credentials!" });
    }
  } catch (error) {
    // If an error occurs, send an error response
    console.log(error);
    return next(error);
  }
  return next();
  }

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
      bio: req.body.bio,
    });

    req.body.interests.forEach(email => {
      newUser.interests.push(email)
    });

    req.body.matches.forEach(email => {
      newUser.matches.push(email)
    });

    console.log(newUser.interests);
    console.log(newUser.matches);
    console.log('made the document')
    try {
      //save the new user to the database
      const savedUser = await Users.create(newUser)
      // res.cookie('currentEmail', savedUser.email, { httpOnly: false, overwrite: true });
      // res.cookie('currentInterests', JSON.stringify(savedUser.interests), { httpOnly: false, overwrite: true });
      // res.cookie('zipCode', JSON.stringify(savedUser.zipCode), { httpOnly: false, overwrite: true});
    console.log(JSON.stringify(savedUser.interests), `\nthis is JSON interests`, `\n`, JSON.stringify(savedUser.zipCode), `\n this is JSON zip code`, savedUser.email, `\n this is email`);
    console.log('saved the user to the db');
    console.log(savedUser);
    return next()
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
    const updatedUser = await Users.findOneAndUpdate(
      { username },
      req.body,
      { new: true }
    );

    if (updatedUser) {
      console.log(updatedUser);
      res.status(200);
      // Document found and updated successfully
    } else {
      console.log("User not found")
      // No document with the specified username was found
    }
  } catch (error) {
    console.error(error);
  }
  return next();
};

userController.getProfiles = async (req, res, next) => {
  console.log('get profiles middleware ran');
  try {
    //grab zipCode from the cookie and convert to number to match schema
    const zipcode = Number(req.cookies.zipCode);
    //grab email from the cookie
    const email = req.cookies.currentEmail;
    //fetch current user's interests from the database
    const currentUser = await Users.findOne({ email: email });
    const interests = currentUser.interests;
    //find users with same zipcode and at least one interest in common
    const users = await Users.find({
      zipCode: zipcode,
      interests: { $in: interests },
    });
    console.log(users);
    res.status(200);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
}

userController.findMatches = async (req, res, next) => {
  const email = 'ajmattus@gmail.com'
  console.log(req.cookies.currentEmail, 'this is the email on the cookie');

  try {

    const foundMatch = await Users.find({matches:{$in:decodeURIComponent(req.cookies.currentEmail)}})

    if (foundMatch) {
      console.log('Found a match');
      console.log(foundMatch, `this is foundMatch`);
      res.locals.foundMatch = foundMatch
      console.log('saved foundMatch to res.locals');
    }

    return next()
  } catch (error) {
    console.log(error);
    return next(error)
  }
}

userController.createCookie = async (req, res, next) => {
  console.log('before creating cookie');
  try {
    res.cookie('currentEmail', 'ajmattus@gmail.com', { httpOnly: false, overwrite: true });

    console.log('made the cookie')

    return next()
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = userController;

// this searches the matches array for any emails
// await Users.find({matches:{$in:'ajmattus@gmail.com'}})

// this searches the interests array for any interests
// await Users.find({interests:{$in:'Rafting'}})

// this searches the interests array that at least have both Rafting and Camping
// const foundMatch = await Users.find({interests:{$all:['Rafting', 'Camping']}})

// use this for decoding email addresses encoded on cookies
// await Users.find({matches:{$in:decodeURIComponent(req.cookies.currentEmail)}})