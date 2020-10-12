const dotenv = require('dotenv').config({path:'C:/nodeProgramLaptop/training-application/.env'});
module.exports = {
    "development": {
      "username": process.env.user,
      "password":process.env.password,
      "database":process.env.database,
      "host": process.env.host,
      "dialect": "mysql"
    }
  }
 