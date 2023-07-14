const express = require("express");
const router = express.Router();
const userController = require('../controllers/userControllers')
const multer = require('multer');
const Images = require('../models/imageModel');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

// router.get('/imageretrieve', async (req, res) => {
//   try {
//     const image = await Images.findOne({});
//     console.log(image.image);
//     // res.contentType
//     // res.render(image[0].image)
//     return;
//   }
//   catch(err) {
//     return err;
//   }
// })
// test route for image upload , 
// router.post('/signup/upload_images', upload.single('image1'), (req, res) => {
//   console.log('upload')
//   const obj = {
//     img: {
//       data: fs.readFileSync(
//         path.join(__dirname + '../../../uploads/' + req.file.filename)
//       ),
//       contentType: "image/png",
//     },
//   };
//   console.log(obj.img.data);
//   try {
//     Images.create({
//       image: obj.img.data,
//     });

//   }
//   catch (err) {
//     return err;
//   }
// });

router.get("/", (req, res) => {
  res.send("hello world");

});

//login router, verify user then redirect to user profiles page
//fine that im setting status and sending message in the controller instead of last step?
router.post('/api/login', userController.verifyLogin, (req, res) => {
  //end the response, with status and message set in verifyUser middleware
  res.end();
  //front code on login component should determine whether to redirect to userProfiles based on error or not
});

//signup route:
router.post('/signup', userController.createNewUser, (req, res) => {
  res.end();
});

//update profile/settings route:
router.put('/api/user', userController.updateUser, (req, res) => {
  res.end();
});

//route to grab similar users to populate UserProfiles, based on zipcode and interest
router.get('/api/getUsers', userController.getProfiles, (req, res) => {
  const usersToDisplay = res.locals.matchingUsers;
  res.json(usersToDisplay);
});



module.exports = router;
