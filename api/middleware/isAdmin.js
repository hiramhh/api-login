const models = require("../../database/models");


const isAdmin = async (req, res, next) => {
  const user = await models.admins.findOne({
    where: {
      userId: req.id
    }
  });
  if(!user){
    return res.status(400).send({message: "Operation not allowed"});
  }

  next();
}

module.exports = { isAdmin }