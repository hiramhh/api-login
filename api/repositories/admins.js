const models = require("../../database/models")
const { registry } = require("../controllers/students")



// La función createAdmin contiene la lógica para la creación de 
// un nuevo registro en la tabla de administradores y se exporta a la 
// función registry del archivo admin, de la carpeta controllers
const createAdmin = async (data) => {
  try {
    const admin = await models.admins.create({
      userId: data.userId,
      name:data.name,
    });

    return admin;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports= {
  createAdmin
}