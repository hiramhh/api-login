'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      
      await queryInterface.addColumn("admins", "is_admin", {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      }, {transaction});

      await queryInterface.addColumn("students", "is_admin", {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
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
      
      await queryInterface.removeColumn("admins", "is_admin", {transaction});

      await queryInterface.removeColumn("students", "is_admin", {transaction});

      await transaction.commit();

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
