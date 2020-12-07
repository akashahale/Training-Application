'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.changeColumn('tbl_trainers', 'is_active', {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        });
    },

    down: async (queryInterface, Sequelize) => {},
};
