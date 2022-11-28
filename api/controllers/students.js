const userRepository = require("../repositories/users");
const studentRepository = require("../repositories/students");
const models = require("../../database/models");
const {JWT_KEYWORD} = require("../../config");
const jwt = require("jsonwebtoken");
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

const validate = async (req, res, next) => {
  try{
    // const {body} = req;

    // await userRepository.validateDataUsers(body);

    // res.status(409).send({
    //   messagge: "Failed! email is already in use!"
    // })


    const user = await models.users.findOne({
      where:{
        email: req.body.email
      }
    })
    if (user) {
      throw new Error("Correo existente");
      }
    next();
  }
  catch (error){
    return res.status(400).send(error.messagge);
  }
}

const registry = async (req, res) => {
  try {
    console.log("inició de registro");
    const { body } = req;


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


const login = async (req, res) => {
  try {
    const user = await models.users.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user){
      return res.status(404).send({
        messagge: "User Not Found."
      });
    }
    const passworValid = await bcrypt.compareSync(
      req.body.password, user.password
      );
      
      if(!passworValid){
        return res.status(401).send({
          accessToken: null,
          messagge: "Invalid Password!"
        });
      }
  
      const token = jwt.sign({id:user.id}, JWT_KEYWORD, {
        expiresIn: 86400
      });

     console.log(user);
     delete user.password;
      return res.status(201).send({
        user: user,
        accesToken: token 
      });
      }
      
      catch(error){
        console.log(error);
    return res.status(500).send({
      messagge: error.messagge
    });
  }
}

module.exports = {
  getAll,
  validate, 
  registry,
  login
 };
