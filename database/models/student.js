'use strict';
const {
  Model
} = require('sequelize');
const users = require('./users');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {

    static associate(models) {
      students.belongsTo(models.users);
    }
  }
  students.init({
    name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    nationality: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.TEXT
    },
    likes: {
      type: DataTypes.TEXT
    },
    disable:  {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'students',
  });
  return students;
};