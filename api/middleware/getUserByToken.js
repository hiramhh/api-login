const getUserByToken = async (req, res, next) => {
  try {
    req.user = await models.student.findOne({
      where:{
        userId: req.id
      }
    })

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
}

module.exports = {
  getUserByToken
}