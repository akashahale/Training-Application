const express = require('express');
const app = express();
const TrainerController = require('../controllers/trainerController');


app.get('/api/v1.0/trainers',TrainerController.getTrainers);

module.exports = app;