const Sequelize = require('sequelize');
const sequelize = new Sequelize('mydb','root','admin',{
   host: 'localhost',
  dialect: 'mysql'
});
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const Trainer =sequelize.define("tbl_trainers", {
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
  is_active:Sequelize.BOOLEAN
});

module.exports={Trainer};
