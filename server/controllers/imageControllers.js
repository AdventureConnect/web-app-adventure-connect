require("dotenv").config();

const { createErr } = require("../utils/errorCreator");
const Images = require("../models/imageModel");
const User = require("../models/userModel");

const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const multer = require("multer");
const nodemailer = require("nodemailer");

const cloudStorage = new Storage({
  keyFilename: `${__dirname}/../web-app-adventure-connect-39d349a3f0d5.json`,
  projectId: "web-app-adventure-connect",
});
const bucketName = "bucket_adventure-connect";
const bucket = cloudStorage.bucket(bucketName);



