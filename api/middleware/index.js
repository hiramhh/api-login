const validateData = require("./validateData");
const verifyToken = require("./jwt");
const isAdmin = require("./isAdmin")



module.exports = {
  getDataValidated: validateData,
  verifyToken: verifyToken,
  isAdmin: isAdmin
}