const dotenv = require('dotenv').config({
    path:
        'C:/Users/Sapana.vyavahare/OneDrive - Happiest Minds Technologies Pvt Ltd/Documents/node_Learnings/TrainingManagment/.env',
});
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DEL_DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'mysql',
        timezone: '+05:30',
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'mysql',
    },
};
