const models = require("../../database/models");

const getUsers = async () =>{
  try{
    const users = await models.users.findAll();

    return users;
  } catch (error){
    throw new Error(error);
  }
}

// const validateDataUsers = async (data) => {
//   try {
//      const user = await models.users.findOne({
//       where:{
//         email: data.email
//       }
//     })
//       if (user) {
//         return user;
//       }
//     }
//     catch (error){
//       throw new Error(error);
//     }
//   } 




const createUser = async (data) => {
  try {

    const user = await models.users.create({
      email: data.email,
      password:data.password,
      is_student: data.is_student,
      status: data.status
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { 
  getUsers,
  // validateDataUsers,
  createUser
};
