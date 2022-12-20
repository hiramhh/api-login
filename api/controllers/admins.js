const userRepository = require("../repositories/users");
const adminRepository = require("../repositories/admins");
const models = require("../../database/models");
const bcrypt = require("bcryptjs");
const {JWT_KEYWORD} = require("../../config");
const jwt = require("jsonwebtoken");


// Función que se usa en el endpoint de creación y registro
// para un administrador nuevo en la plataforma

const registry = async (req, res) => {
  try {
    const { body } = req;

    let hashPassword = bcrypt.hashSync(body.password, 8);

    const addNewUser = await userRepository.createUser({
      email: body.email,
      password: hashPassword
    });

    body.userId = addNewUser.id;

    await adminRepository.createAdmin(body);

    delete addNewUser.dataValues.password;

    return res.status(201).send(addNewUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}


// Función que le proporciona al usuario administrador una 
// opción para iniciar sesión en la plataforma
const login = async (req, res) => {
  try {

    const {body} = req;

    const user = await userRepository.getInstanceUserModelByEmail({
      email: body.email
    });
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

      delete user.dataValues.password;

      return res.status(201).send({
        user: user,
        accesToken: token 
      });
      }
      
      catch(error){
      return res.status(500).send({
      messagge: error.messagge
    });
  }
}

// La función disable student sirve para que el administrador tenga el
// permiso habilitar o deshabilitar la cuenta de un estudiante

const disableStudent = async (req, res) => {
  try {

    const {body} = req;

    let user = await userRepository.getInstanceUserModelByEmail({
      email: body.email
    });


    let student = await models.students.findOne({
      where: {
        userId: user.id
      }
    })

    if (user){
      student.disable = req.body.disable
      await student.save();

      return res.json(student);
    } else {
      return res.status(404).send({
        message: "User not found"
      })
    }
  } catch (error) {
    return res. status(400).send(error.message);
  } 
}

module.exports = {
  registry,
  login,
  disableStudent
}