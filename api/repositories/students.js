const models = require("../../database/models");

const getStudents = async () =>{
  try{
    const students = await models.student.findAll();

    return students;
  } catch (error){
    throw new Error(error);
  }
}





const createStudent = async (data) => {
  try {
    const student = await models.students.create({
      userId: data.userId,
      name:data.name,
      last_name: data.last_name,
      nationality: data.nationality,
      gender: data.gender,
      age: data.age,
      tiny_description: data.tiny_description,
      likes: data.likes
    });

    return student;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { 
  getStudents,
  createStudent
};
