'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkInsert('topics',
            [
                {
                    topic_name: 'Java',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                  topic_name: 'C++',
                  createdAt: new Date(),
                  updatedAt: new Date(),
              },
              {
                topic_name: 'NodeJs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
              topic_name: 'Java Script',
              createdAt: new Date(),
              updatedAt: new Date(),
          },
          {
            topic_name: 'Data Science',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
          topic_name: 'AWS',
          createdAt: new Date(),
          updatedAt: new Date(),
      },
            ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tbl_topics', null, {});
  }
};
