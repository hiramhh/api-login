const models = require("../../database/models");


const isAdmin = async (req, res, next) => {
  const user = await models.users.findByPk(req.id);
  if(!user.admin){
    return res.status(400).send({message: "Operation not allowed"});
  }

  next();
}

module.exports = { isAdmin }