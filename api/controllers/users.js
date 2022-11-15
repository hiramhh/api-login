const userRepository = require("../repositories/users");


const getAll = async (req, res) => {
  try {
    const showAllUsers = await userRepository.getAllUsers();

    
    return res.status(201).json(showAllUsers);

    
  } catch (error) {
    return res.status(500).send("Ha ocurrido un error en el servidor");
  }
};



const registry = async (req, res) => {
  try {
    console.log("inició de registro");
    const { body } = req;

    const addNewUser = await userRepository.createUser({
      name: body.name,
      email: body.email,
      is_student: body.is_student,
      status: body.status
    });

    return res.status(201).send(addNewUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Probando mensaje");
  }
};

module.exports = {
  getAll, 
  registry
 };
