const models = require("../../database/models");


const validate = async (req, res, next) => {
  try{
    const user = await models.users.findOne({
      where:{
        email: req.body.email
      }
    })
    if (user) {
      throw new Error("Correo existente");
      }
    next();
  }
  catch (error){
    return res.status(400).send(error.messagge);
  }
}

module.exports = {
  validate
}