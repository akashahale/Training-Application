'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.createTable('tbl_trainers_topics', { 
      "trainer_id":{ 
        type:Sequelize.INTEGER,
        references: { model: 'tbl_trainers', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade'},
      "topic_id": {
        type:Sequelize.INTEGER,
        references:{model: 'tbl_topics',key: 'id'},
        onUpdate:'cascade',
        onDelete: 'cascade'}
      });
     
  },

  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.dropTable('tbl_trainers_topics');
     
  }
};
