'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameTable('TrainingProgram', 'TrainingPrograms');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('TrainingPrograms');
    },
};
