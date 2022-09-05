const userRepository = require("../repositories/users");

const registry = async (req, res) => {
  try {
    const { body } = req;

    const addNewUser = await userRepository.createUser({
      name: body.name,
      email: body.email,
    });

    return res.status(201).send(addNewUser);
  } catch (error) {
    return res.status(500).send("Ha ocurrido un error en el servidor");
  }
};

module.exports = { registry };
