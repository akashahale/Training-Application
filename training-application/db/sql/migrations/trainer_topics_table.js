'use strict';
 
module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.createTable('tbl_trainers_topics', { 
      "trainer_id":{ 
        type:Sequelize.INTEGER,
        references: { model: 'tbl_trainers', key: 'trainer_id' },
        onUpdate: 'cascade',
        onDelete: 'cascade'},
      "topic_id": {
        type:Sequelize.INTEGER,
        references:{model: 'tbl_topics',key: 'topic_id'},
        onUpdate:'cascade',
        onDelete: 'cascade'}
      });
     
  },
 
  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.dropTable('tbl_trainers_topics');
     
  }
};