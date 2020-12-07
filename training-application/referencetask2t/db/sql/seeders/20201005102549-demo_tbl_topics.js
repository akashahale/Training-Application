'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'topics',
            [
                {
                    topic_name: 'java script',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    topic_name: 'nodejs',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    topic_name: 'angular',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    topic_name: 'java ',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    topic_name: 'database',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    topic_name: 'python',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    topic_name: 'c++',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    topic_name: 'machin learning',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    topic_name: 'web programing',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    topic_name: 'AI',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('tbl_topics', null, {});
    },
};
