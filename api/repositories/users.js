const models = require("../../database/models");


const getUsers = async () =>{
  try{
    const users = await models.students.findAll({
      include: {
        model: models.users,
        attributes: { exclude : ["password"]},
      }
    });

    return users;
  } catch (error){
    throw new Error(error);
  }
}


const createUser = async (data) => {
  try {
    const user = await models.users.create({
      email: data.email,
      password:data.password,
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}


const getInstanceUserModelByEmail = async (data) => {
  try {
    const user = await models.users.findOne({
      where: {
        email: data.email
      }
    });
    return user;

  } catch (error) {
    throw new Error(error);
  }
}




module.exports = { 
  getUsers,
  createUser,
  getInstanceUserModelByEmail
};


