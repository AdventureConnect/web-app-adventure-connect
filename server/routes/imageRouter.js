const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const Images = require("../models/imageModel");
const bcrypt = require("bcrypt");

router.get("/getImages", async (req, res) => {
  const email = req.params.userEmail;
  try {
    const image = await Images.find({ email: email });
    // console.log('image',image[0].image);
    res.status(200).json(image);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post(
  "/upload-file-to-cloud-storage/:userEmail",
  userController.uploadImages,
  function (req, res, next) {
    res.end();
  }
);
