const express = require("express");
const router = express.Router();
const userController = require('../controllers/userControllers')



router.get("/", (req, res) => {
  res.send("hello world");

});

router.get('/test', (req, res) => {
  res.send('test route');
})

//login router, verify user then redirect to user profiles page
//fine that im setting status and sending message in the controller instead of last step? 
router.post('/login', userController.verifyLogin, (req, res) => {
  //end the response, with status and message set in verifyUser middleware
  res.end();
  //front code on login component should determine whether to redirect to userProfiles based on error or not 
});

//signup route:
router.post('/signup', userController.createNewUser, (req, res) => {
  console.log('new user saved to database');
  res.end();
});

//update profile/settings route:
router.put('/user', userController.updateUser, (req, res) => {
  res.end();
});

//route to grab similar users to populate UserProfiles, based on zipcode and interest
router.get('/getUsers', userController.getProfiles);

router.get('/user', userController.getCurrentUser);

module.exports = router;
