'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "users", "admin", { 
          type: Sequelize.DataTypes.BOOLEAN},
        { transaction }
      );

      await queryInterface.renameColumn("users", "status", "disable", 
      { transaction }
      );

      await queryInterface.renameColumn("students", "tiny_description", "description", 
      { transaction }
      );

      await transaction.commit();

    } catch (error){
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("users", "admin", 
      { transaction });

      await queryInterface.renameColumn("users", "disable","status",  
      {transaction});

      await queryInterface.renameColumn("students", 
      "description", "tiny_description", 
      { transaction });

      await transaction.commit();
      
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
