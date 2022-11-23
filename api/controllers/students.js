const userRepository = require("../repositories/students");
const studentRepository = require("../repositories/students");
const bcrypt = require("bcryptjs");


const getAll = async (req, res) => {
  try {
    const showStudents = await userRepository.getStudents();

    
    return res.status(201).json(showStudents);

    
  } catch (error) {
    return res.status(500).send("Ha ocurrido un error en el servidor de estudiantes");
  }
};



const registry = async (req, res) => {
  try {
    console.log("inició de registro");
    const { body } = req;

    let hashPassword = bcrypt.hashSync(body.password, 8);


    const addNewUser = await userRepository.createUser({
      email: body.email,
      password:hashPassword,
      is_student: body.is_student,
      status: true
    });

    body.userId = addNewUser.id;

    await studentRepository.createStudent(body);

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
