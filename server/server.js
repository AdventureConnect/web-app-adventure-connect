const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const apiRouter = require('./routes/api');
const connectDB = require("./connectDB");

const app = express();

const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type'], 
}));

app.use(bodyParser.json());
app.use(cookieParser());

const Users = require("../server/models/userModel.js");

const PORT = 3000;

connectDB();

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, "../client")));

/**
 * define route handlers
 */

//I think once we have general routes done we will want to change this to just app.use(apiRouter?)
app.use('/api', apiRouter);


/**
 * express error handler
//  * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: "Express error handler caught unknown middleware error",
//     status: 500,
//     message: { err: "An error occurred" },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
