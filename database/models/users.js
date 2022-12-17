'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {

    static associate(models) {
      users.hasOne(models.admins, {
        onDelete: "CASCADE",
        hooks: true
      });
      users.hasOne(models.students, {
        onDelete: "CASCADE",
        hooks: true
      });
    }
  }
  users.init({
    email:{
      type: DataTypes.STRING 
    }, 
    password: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};