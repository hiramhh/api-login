const validateData = require("./validateData");
const verifyToken = require("./jwt");
const getUserByToken = require("./getUserByToken");



module.exports = {
  getDataValidated: validateData,
  verifyToken: verifyToken,
  getUserByToken: getUserByToken
}