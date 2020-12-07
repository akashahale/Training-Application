'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TrainingPrograms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      trainer_id: {
        type: Sequelize.INTEGER
      },
      topic_id: {
        type: Sequelize.INTEGER
      },
      regStartDate: {
        type: Sequelize.DATE
      },
      regCloseDate: {
        type: Sequelize.DATE
      },
      noOfAttendies: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('TrainingPrograms');
  }
};