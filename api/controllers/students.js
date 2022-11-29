const userRepository = require("../repositories/users");
const studentRepository = require("../repositories/students");
const models = require("../../database/models");
const {JWT_KEYWORD} = require("../../config");
const jwt = require("jsonwebtoken");
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

const dataStudents = async (req, res) => {
  try{
    const user = await models.students.findOne({
      where:{
        userId: req.id
      }
    })
    if (user) {
      return res.status(201).send(user);
      }}
  catch (error){
    console.log(error);
    return res.status(400).send(error.messagge);
  }
}



module.exports = {
  getAll, 
  registry,
  login,
  dataStudents
 };
