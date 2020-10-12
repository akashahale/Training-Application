const dotenv = require('dotenv').config({path:'C:/nodeProgramLaptop/training-application/.env'});
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.host,
  user:  process.env.user,
  password:  process.env.password,
  database:  process.env.database,
})

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
 
  console.log('Connected to the MySQL server.');
});

module.exports=connection;