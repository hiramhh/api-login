const userRepository = require("../repositories/users");


const getAll = async (req, res) => {
  try {
    const showAllUsers = await userRepository.getUsers();

    
    return res.status(201).json(showAllUsers);

    
  } catch (error) {
    return res.status(500).send("Ha ocurrido un error en el servidor");
  }
};




module.exports = {
  getAll, 
 };
