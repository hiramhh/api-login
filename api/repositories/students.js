const models = require("../../database/models");


// La función createStudent tiene la lógica para registrar a un estudiante nuevo en la base de datos, trabaja de manera asincrónica con la función registry en el archivo students de la carpeta Controller.

const createStudent = async (data) => {
  try {
    const student = await models.students.create({
      userId: data.userId,
      name:data.name,
      last_name: data.last_name,
      nationality: data.nationality,
      gender: data.gender,
      age: data.age,
      description: data.description,
      likes: data.likes
    });

    return student;
  } catch (error) {
    throw new Error(error);
  }
}


module.exports = { 
  // getStudents,
  createStudent
};
