const userRepository = require("../repositories/users");
const studentRepository = require("../repositories/students");
const models = require("../../database/models");
const {JWT_KEYWORD} = require("../../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



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
    return res.status(400).send("error en la funcion dataStudents",error.messagge);
  }
}


const getUserData = async (req, res) => {
  try{

    let user = await models.students.findOne({
      where:{
        userId: req.id
      }
    });
    user.set(body);
    
    user = await user.save();
    
    
    return res.status(201).send(user);
  }
  catch(error){
    return res.status(400).send(error.messagge);
  }
  
}

const deleteUser = async (req, res) => {
  try {
    
    let user = await models.users.findOne({
      where:{
        id: req.id
      }
    });

    if(user){
      await user.destroy();
    }
    return res.status(201).send("delete");
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.messagge);
  }
}



module.exports = {
  registry,
  login,
  dataStudents,
  getUserData,
  deleteUser
};
