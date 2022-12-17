const models = require("../../database/models")

const createAdmin = async (data) => {
  try {
    const admin = await models.admins.create({
      userId: data.userId,
      name:data.name,
    });

    return admin;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports= {
  createAdmin
}