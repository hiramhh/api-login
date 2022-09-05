const models = require("../../database/models");

const createUser = async (data) => {
  try {
    const user = await models.users.create({
      name: data.name,
      email: data.email,
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createUser };
