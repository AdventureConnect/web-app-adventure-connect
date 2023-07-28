require("dotenv").config();

const { createErr } = require("../utils/errorCreator");
const Images = require("../models/imageModel");
const User = require("../models/userModel");

const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const multer = require("multer");
const nodemailer = require("nodemailer");

/*

[0] [Error: ENOENT: no such file or directory, open '/Users/chandler/Desktop/codesmith/iteration/adventure-connect/server/web-app-adventure-connect-39d349a3f0d5.json'] 

*/

const cloudStorage = new Storage({
  keyFilename: `${__dirname}/../web-app-adventure-connect-39d349a3f0d5.json`,
  projectId: "	campfire-connect",
});
const bucketName = "bucket_adventure-connect";
const bucket = cloudStorage.bucket(bucketName);

const imageController = {};

imageController.uploadImages = (req, res) => {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
    onError: function (err, next) {
      console.log("error", err);
      next(err);
    },
  }).array("image");

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error uploading Files" });
    }
    const email = req.params.userEmail;
    console.log(req.file);
    if (!req.files) {
      res.status(400).send("No file uploaded.");
      return;
    }
    try {
      req.files.forEach((file) => {
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();
        blobStream.on("error", (err) => {
          // next(err);
          console.log(err);
        });
        blobStream.on("finish", async () => {
          // The public URL can be used to directly access the file via HTTP.
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
          Images.create({ email: email, image: publicUrl });
        });
        // urls.push(publicUrl);
        blobStream.end(file.buffer);
      });
      res.status(200).send("Images uploaded");
    } catch (err) {
      res.status(500).send("Error uploading images");
    }
  });
};

imageController.getImages = async (req, res, next) => {
  console.log("req.params: ", req.params);
  const email = req.params.userEmail;
  try {
    const image = await Images.find({ email: email });
    // console.log('image',image[0].image);
    res.locals.images = image;
    return next();
  } catch (err) {
    console.log(err);
    // res.status(500).json(err);
  }
};

module.exports = imageController;
