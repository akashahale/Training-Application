 const dotenv = require('dotenv').config({path:'C:/nodeProgramLaptop/training-application/.env'});
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
  // const dotenv = require('dotenv').config({path:'C:/nodeProgramLaptop/training-application/.env'});
// var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host: process.env.host,
//   user:  process.env.user,
//   password:  process.env.password,
//   database:  process.env.database,
// })

// connection.connect(function(err) {
//   if (err) {
//     return console.error('error: ' + err.message);
//   }
 
//   console.log('Connected to the MySQL server.');
// });

 module.exports={sequelize};