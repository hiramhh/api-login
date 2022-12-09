'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
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
    },
    is_student: {
      type: DataTypes.BOOLEAN 
    },
    disable:  {
      type: DataTypes.BOOLEAN
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};