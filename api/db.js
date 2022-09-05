const { DB } = require("../config");

const { Sequelize } = require("sequelize");

const dbConnection = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  dialect: DB.DIALECT,
});

module.exports = { dbConnection };
