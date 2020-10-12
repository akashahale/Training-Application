'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('tbl_trainers', { 
      trainer_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      trainer_name: Sequelize.STRING(50),
      trainer_email: Sequelize.STRING(50),
      trainer_phone: Sequelize.STRING(15),
      trainer_addres: Sequelize.STRING(250),
      trainer_photo_url: Sequelize.STRING(1024),
      is_active:{type:Sequelize.BOOLEAN,
      defaultValue:true},
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tbl_trainers");
  }
};
