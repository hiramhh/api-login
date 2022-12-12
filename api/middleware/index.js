const validateData = require("./validateData");
const verifyToken = require("./jwt");
const getUserByToken = require("./getUserByToken");
const isAdmin = require("./isAdmin")



module.exports = {
  getDataValidated: validateData,
  verifyToken: verifyToken,
  getUserByToken: getUserByToken,
  isAdmin: isAdmin
}