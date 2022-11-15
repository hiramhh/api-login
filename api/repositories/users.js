const models = require("../../database/models");

const getAllUsers = async () =>{
  try{
    const users = await models.users.findAll();

    return users;
  } catch (error){
    throw new Error(error);
  }
}

const createUser = async (data) => {
  try {
    const user = await models.users.create({
      name: data.name,
      email: data.email,
      is_student: data.is_student,
      status: data.status
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { 
  getAllUsers,
  createUser
};
