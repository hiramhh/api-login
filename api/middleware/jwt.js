const jwt = require("jsonwebtoken");
const {JWT_KEYWORD} = require("../../config");

// La función verifyToken es el middleware principal de autenticación
// basado en tokkens


const verifyToken = async (req, res, next) => {
  try{
    const token = req.header("Authorization").split("Bearer");

    if(!token){
      throw new Error("Provide a token");
    }

    const decoded = jwt.verify(token[1].trim(), JWT_KEYWORD);
    req.id = decoded.id;
 

    next();
  }
  catch(error){
    console.log(error);
    return res.status(401).send("Error en el middleware de verificacion de tokens", error.message);
  }
};

module.exports = {
  verifyToken
}