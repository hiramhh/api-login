const userRepository = require("../repositories/users");
const studentRepository = require("../repositories/students");
const models = require("../../database/models");
const {JWT_KEYWORD} = require("../../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// Función que se usa en el endpoint de creación y registro
// de estudiante nuevo en la plataforma, la función maneja las peticiones y trabaja en conjunto con la función createUser en el archivo users, en la carpeta respositories

const registry = async (req, res) => {
  try {
    const { body } = req;

    let hashPassword = bcrypt.hashSync(body.password, 8);


    const addNewUser = await userRepository.createUser({
      email: body.email,
      password: hashPassword,
    });

    body.userId = addNewUser.id;

    await studentRepository.createStudent(body);

    delete addNewUser.dataValues.password;

    return res.status(201).send(addNewUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// Función que le proporciona al usuario estudiante una 
// opción para iniciar sesión en la plataforma, aqui mismo se importa la función getInstanceUserModelByEmail.
const login = async (req, res) => {
  try {

    const {body} = req;

    const user = await userRepository.getInstanceUserModelByEmail({
      email: body.email
    });

    const student = await models.students.findOne({
      where:{
        userId: user.id
      }
    });


    if (!user){
      return res.status(404).send({
        messagge: "User Not Found."
      });
    }

    if(student.disable) {
      return res.status(401).send({
        messagge: "acount disable, please contact admin"
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

      delete user.dataValues.password;

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

// La función dataStudents permite al usuario estudiante la
// opción de consultar su información personal

const dataStudents = async (req, res) => {
  try{

    const user = await models.students.findOne({
      where:{
        userId: req.id
      }
    });


    if (user) {
      return res.status(201).send(user);
      }}
  catch (error){
    console.log(error);
    return res.status(404).send("error en la funcion dataStudents",error.messagge);
  }
}


// La función updateUserData permite al estudiante modificar
// alguna información personal

const updateStudentData = async (req, res) => {
  try{

    let user = await models.students.findOne({
      where:{
        userId: req.id
      }
    });

    const {body} = req;

    user.set(body);
    
    user = await user.save();
    
    
    return res.status(201).send(user);
  }
  catch(error){
    console.log(error);
    return res.status(400).send(error.messagge);
  }
  
}


// Como su nombre lo indica, la función deleteStudent permite
// al usuario student eliminar su cuenta de la plataforma

const deleteStudent = async (req, res) => {
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
  updateStudentData,
  deleteStudent
};
