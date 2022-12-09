'use strict';
const {
  Model
} = require('sequelize');
const users = require('./users');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
  }, {
    sequelize,
    modelName: 'students',
  });
  return students;
};