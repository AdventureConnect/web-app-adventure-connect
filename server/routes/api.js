const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const Images = require("../models/imageModel");
const bcrypt = require("bcrypt");

router.get(
  "/check_email",
  /*userController.checkemail, */ async (req, res) => {
    // console.log(req.query.email);
    res.status(200).send("check email: success");
  }
);

router.post(
  "/send_email",
  /*userController.sendEmail,*/ async (req, res) => {
    res.end();
  }
);

router.put(
  "/update-password",
  // userController.updatePassword,
  async (req, res) => {
    res.end();
  }
);

// router.get("/", (req, res) => {
//   res.send("hello world");
// });

//login router, verify user then redirect to user profiles page
//fine that im setting status and sending message in the controller instead of last step?
router.post("/login", userController.verifyLogin, (req, res) => {
  //end the response, with status and message set in verifyUser middleware
  // console.log("res.locals.user: ", res.locals.user);
  res.status(200).json({ user: res.locals.user });
});

//signup route:
router.post("/signup", userController.createNewUser, (req, res) => {
  // console.log("res.locals.user: ", res.locals.user);
  res.status(200).json([res.locals.user]);
});

//update profile/settings route:
router.put("/user", userController.updateUser, (req, res) => {
  res.sendStatus(200);
});

// retrieve user info for state
router.get("/user", userController.verifyUser, (req, res) => {
  res.status(200).json({ user: res.locals.user });
});

router.post(
  "/checkEmail",
  // userController.checkEmail,
  (req, res) => {
    res.status(200).send(res.locals.emailInUse);
    router.put("/user", userController.updateUser, (req, res) => {
      res.end();
    });
  }
);

//route to grab similar users to populate UserProfiles, based on zipcode and interest
router.get("/getUsers", userController.getProfiles, (req, res) => {
  res.status(200).json(res.locals.matchingUsers);
});

router.get(
  "/findMatches",
  // userController.findMatches,
  (req, res) => {
    // console.log(res.locals.foundMatch, '\n-----------------------', '\nsending res.locals.foundMatch as json');
    console.log(
      res.locals.foundMatch.length,
      "this is the length of what we send as json"
    );
    res.status(250).json(res.locals.foundMatch);
  }
);

router.get("/findInterests", userController.getProfiles, (req, res) => {
  res.status(250).json(res.locals.getProfiles);
});

router.get(
  "/cookie",
  // userController.createCookie,
  (req, res) => {
    res.sendStatus(200);
  }
);

router.get(
  "/findMatches",
  // userController.findMatches,
  (req, res) => {
    // console.log(res.locals.foundMatch, '\n-----------------------', '\nsending res.locals.foundMatch as json');
    console.log(
      res.locals.foundMatch.length,
      "this is the length of what we send as json"
    );
    res.status(250).json(res.locals.foundMatch);
  }
);

router.get("/findInterests", userController.getProfiles, (req, res) => {
  res.status(250).json(res.locals.getProfiles);
});

router.get(
  "/cookie",
  // userController.createCookie,
  (req, res) => {
    res.sendStatus(200);
  }
);

module.exports = router;
