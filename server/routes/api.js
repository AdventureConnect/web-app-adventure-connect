const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/test", (req, res) => {
  res.status(200).redirect("/account");
  // res.status(200).send("passed the test");
});

//login router, verify user then redirect to user profiles page
router.post("/login", userController.verifyLogin, (req, res) => {
  //end the response, with status and message set in verifyUser middleware
  res.status(200).send("test");
  //front code on login component should determine whether to redirect to userProfiles based on error or not
});

//signup route:
router.post("/signup", userController.createNewUser, (req, res) => {
  res.end();
});

//update profile/settings route:
router.put("/user", userController.updateUser, (req, res) => {
  res.end();
});

//route to grab similar users to populate UserProfiles, based on zipcode and interest
router.get("/getUsers", userController.getProfiles, (req, res) => {
  const usersToDisplay = res.locals.matchingUsers;
  res.json(usersToDisplay);
});

module.exports = router;
