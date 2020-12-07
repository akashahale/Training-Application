'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbl_trainers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trainer_name: {
        type: Sequelize.STRING
      },
      trainer_email: {
        type: Sequelize.STRING
      },
      trainer_phone: {
        type: Sequelize.STRING
      },
      trainer_address: {
        type: Sequelize.STRING
      },
      trainer_photo_url: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tbl_trainers');
  }
};