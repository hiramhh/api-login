const jwt = require("jsonwebtoken");
const {JWT_KEYWORD} = require("../../config");
const models = require("../../database/models");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      messagge: "No token provided!"
    });
  }

  jwt.verify(token, JWT_KEYWORD, (err, decoded) => {
    if (err){
      return res.status(401).send({
        messagge: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next;
  });
};

module.exports = verifyToken;