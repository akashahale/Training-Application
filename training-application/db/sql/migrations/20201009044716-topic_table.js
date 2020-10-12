'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('tbl_topics', { 
      topic_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      topic_name: Sequelize.STRING(250),
      is_active:{type:Sequelize.BOOLEAN,
        defaultValue:true},
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tbl_topics");
  }
};
