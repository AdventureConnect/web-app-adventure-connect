const Users = require("../models/userModel");

const userController = {};

//put all the necessary user shit in here as middleware, then put them into routes in api.js, then put that all together in server.js

//verifying user upon logging in, to be put in route for post to /api/login. if route is successful, redirect to show user page 

userController.verifyLogin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    //find a user that has a matching username and password 
    const user = await Users.findOne({ email, password });

    if (user) {
      console.log('successful log in');
      //maybe just make a cookie for activities and zipcode? so don't have to query the database again later when finding similar users?
      res.cookie('currentUser', user.name, { httpOnly: false, overwrite: true });
      res.cookie('currentInterests', JSON.stringify(user.interests), { httpOnly: false, overwrite: true });
      res.cookie('zipCode', JSON.stringify(user.zipcode), { httpOnly: false, overwrite: true});
      res.status(200).json({ message: 'Login successful!' });
      // res.locals.loginStatus = true;
    } else {
      // If the user is not found, send an error response
      res.status(401).json({ message: 'Invalid credentials!' });
    }
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ message: 'Server error!' });
  }
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
  } catch (error) {
    console.log(error);
    next(error)
  }
}

// userController.updateUser = async (req, res, next) => {
//   try {
//     // grab username from the currentUser cookie
//     const email = req.cookies.currentEmail;
//     //find document by username and update it with the values from req.body
//     const updatedUser = await Users.findOneAndUpdate(
//       { email },
//       req.body,
//       { new: true }
//     );

//     if (updatedUser) {
//       console.log(updatedUser);
//       res.status(200).json({message: 'User updated successfully'});
//       // Document found and updated successfully
//     } else {
//       console.log("User not found");
//       // No document with the specified username was found
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500);
    
//   }
//   return next();
// };

userController.updateUser = async (req, res, next) => {
  try {
    const currentEmail = req.cookies.currentEmail;
    const { email, ...updatedFields } = req.body;

    let updatedUser;

    if (email && email !== currentEmail) {
      // Email is different, check if the new email already exists
      const emailExists = await Users.exists({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Update user with email change
      updatedUser = await Users.findOneAndUpdate(
        { email: currentEmail },
        { $set: { email, ...updatedFields } },
        { new: true }
      );
    } else {
      // Update user without email change
      updatedUser = await Users.findOneAndUpdate(
        { email: currentEmail },
        { $set: updatedFields },
        { new: true }
      );
    }

    if (updatedUser) {
      console.log(updatedUser);
      return res.status(200).json({ message: 'User updated successfully' });
    } else {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// userController.getProfiles = async (req, res, next) => {
//   console.log('get profiles middleware ran');
//   console.log(req.cookies.currentInterests);
//   try {
//     //grab zipCode from the cookie and convert to number to match schema
//     const zipcode = Number(req.cookies.zipCode);
//     //grab interests from the cookie, parse it from JSON format
//     // const interests = JSON.parse(req.cookies.currentInterests);
//     const decoded = decodeURIComponent(req.cookies.currentInterests);
//     console.log(decoded);
//     decoded = '[' + decoded + ']';
//     decoded.toString();
//     const interests = JSON.parse(decoded);
    


//    //find users with same zipcode and at least one interest in common 
//     const users = await Users.find({
//       zipCode: zipcode,
//       interests: { $in: interests },
//     });

//     console.log(users);
//     // Array of users with matching zipCode and at least one common interest

//     res.status(200);
//     //store users on res.locals
//     // res.locals.matchingUsers = users;
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     // An error occurred while querying the database
//     res.status(500).json({ message: "Server error!" });
//   }
// }

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

userController.getCurrentUser = async (req, res, next) => {
  try {
    const currentEmail = req.cookies.currentEmail;

    // Find the user document based on the email
    const user = await Users.findOne({ email: currentEmail });

    if (user) {
      // User found, send the user data as the response
      return res.status(200).json(user);
    } else {
    
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = userController;
