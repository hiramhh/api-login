const models = require("../../database/models");



// La función getUsers tiene la lógica para buscar en la base de datos todos 
// los registros de usuarios estudiantes, trabaja de manera asincrona 
// con la función getAll del archivo users de la capeta controller. Juntas 
// las funciones devuelven la lista de todos los usuarios registrados

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

// La función createUser registra un usuario nuevo la base de datos y trabaja en conjunto de manera asíncrona con las funciones registry de usuarios y administradores
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


// La función getInstanceUserModelByEmail es un buscador que usa el email que se manda en la petición y devuelve el registro que coincida con la MediaStreamAudioDestinationNode.

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


