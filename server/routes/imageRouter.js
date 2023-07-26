const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageControllers");
const Images = require("../models/imageModel");
const bcrypt = require("bcrypt");

router.get("/getImages", imageController.getImages, async (req, res) => {
  console.log("req.params; ", re.params);
  res.status(200).json([[res.locals.images]]);
});

router.post(
  "/upload-file-to-cloud-storage/:userEmail",
  imageController.uploadImages,
  async (req, res, next) => {
    res.status(200);
  }
);

module.exports = router;
