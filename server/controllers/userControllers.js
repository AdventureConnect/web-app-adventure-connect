const userModel = require("../models/userModel");

const userController = {};



// userController.getCharacters = async (req, res, next) => {
//   // write code here
//   try {
//     const data = await models.Person.find({});
//     // console.log(data);
//     res.locals.characters = data;
//     return next();
//   } catch (err) {
//     return next({
//       log: `Express error handler caught unknown middleware error: ${err}`,
//       status: 405,
//       message: { err: "An error occurred accessing database getCharacters" },
//     });
//   }
// };

// userController.getSpecies = async (req, res, next) => {
//   // write code here
//   // const query = req.query.id;
//   const _id = req.query.id;

//   try {
//     const data = await models.Species.findOne({ _id });
//     res.locals.species = data;

//     return next();
//   } catch (err) {
//     return next({
//       log: `Express error handler caught unknown middleware error: ${err}`,
//       status: 405,
//       message: { err: "An error occurred accessing database in getSpecies" },
//     });
//   }
// };

// userController.getHomeworld = async (req, res, next) => {
//   // write code here
//   const _id = req.query.id;

//   try {
//     const data = await models.Planet.findOne({ _id });
//     res.locals.planet = data;

//     return next();
//   } catch (err) {
//     return next({
//       log: `Express error handler caught unknown middleware error: ${err}`,
//       status: 405,
//       message: { err: "An error occurred accessing database in getPlanet" },
//     });
//   }
// };

// userController.getFilm = async (req, res, next) => {
//   // write code here
//   const _id = req.query.id;

//   try {
//     const data = await models.Planet.findOne({ _id });
//     res.locals.planet = data;

//     return next();
//   } catch (err) {
//     return next({
//       log: `Express error handler caught unknown middleware error: ${err}`,
//       status: 405,
//       message: { err: "An error occurred accessing database in getPlanet" },
//     });
//   }
// };

// userController.addCharacter = (req, res, next) => {
//   // write code here

//   next();
// };

// module.exports = userController;
