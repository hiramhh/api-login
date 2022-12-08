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
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    nationality: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    likes: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'students',
  });
  return students;
};