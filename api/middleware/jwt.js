const jwt = require("jsonwebtoken");
const {JWT_KEYWORD} = require("../../config");


const verifyToken = async (req, res, next) => {
  try{
    const token = req.header("Authorization").split("Bearer");

    if(!token){
      throw new Error("Proporcione un token");
    }

    const decoded = jwt.verify(token[1].trim(), JWT_KEYWORD);
    req.id = decoded.id;
 

    next();
  }
  catch(error){
    return res.status(401).send("Error en el middleware de verificacion de tokens", error.message);
  }
};

module.exports = {
  verifyToken
}