const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.get("/", (req, res) => {
  res.send("hello world");
});

//login router, verify user then redirect to user profiles page
router.post("/login", userController.verifyLogin, (req, res) => {
  //end the response, with status and message set in verifyUser middleware
  res.sendStatus(200);
});

//signup route:
router.post("/signup", userController.createNewUser, (req, res) => {
  res.sendStatus(200);
});

//update profile/settings route:
router.put("/user", userController.updateUser, (req, res) => {
  res.sendStatus(200);
});

//route to grab similar users to populate UserProfiles, based on zipcode and interest
router.get("/getUsers", userController.getProfiles, (req, res) => {
  res.status(200).json(res.locals.matchingUsers);
});

module.exports = router;
