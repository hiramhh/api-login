const userRepository = require("../repositories/users");


// La función "getAll" permite al administrador mostrar las
// cuentas de todos los estudiantes, así como su informacíón

const getAll = async (req, res) => {
  try {
    const showAllUsers = await userRepository.getUsers();

    
    return res.status(201).json(showAllUsers);

    
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};


module.exports = { 
  getAll
 };
