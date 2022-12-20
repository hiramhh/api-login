const models = require("../../database/models");


// Middleware creado para ser utilizado en los endpoints de creación y
// registros de estudiantes y administradores.

const validate = async (req, res, next) => {
  try{
    const user = await models.users.findOne({
      where:{
        email: req.body.email
      }
    })
    if (user){
      res.status(400).send({
        message: "The email is already in use."});
  }
      
    next();
  }
  catch (error){
    return res.status(400).send(error);
  }
}

module.exports = {
  validate
}