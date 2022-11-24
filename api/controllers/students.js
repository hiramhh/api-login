const userRepository = require("../repositories/users");
const studentRepository = require("../repositories/students");
const models = require("../../database/models");
const bcrypt = require("bcryptjs");


const getAll = async (req, res) => {
  try {
    const showStudents = await userRepository.getStudents();

    // const showAllUsers = await userRepository.getUsers();
    
    return res.status(201).json(showStudents);

    
  } catch (error) {
    return res.status(500).send("Ha ocurrido un error en el servidor de estudiantes");
  }
};



const registry = async (req, res) => {
  try {
    console.log("inició de registro");
    const { body } = req;

    // await userRepository.validateDataUsers(body.email).then(email => {
    //   if (email){
    //     res.status(400).send({
    //       message: "Failed! email is already in use!"
    //     });
    //   }
    //   return;
    // });

    await userRepository.validateDataUsers(body);

    res.status(400).send({
      messagge: "Failed! email is already in use!"
    })


    // models.users.findOne({
    //   where:{
    //     email: body.email
    //   }
    // }).then(user => {
    //   if (user) {
    //     res.status(400).send({
    //       messagge: "Failed! email is already in use!"
    //     })
    //   }
    // })

    let hashPassword = bcrypt.hashSync(body.password, 8);


    const addNewUser = await userRepository.createUser({
      email: body.email,
      password: hashPassword,
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
