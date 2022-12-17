'use strict';

const { sequelize } = require("../models");

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("users", "disable", {transaction});

      await queryInterface.addColumn("students", "disable", {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }, {transaction});

      await transaction.commit();

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn("users", "disable", {transaction});

      await queryInterface.removeColumn("students", "disable", {transaction});

      await transaction.commit();

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
