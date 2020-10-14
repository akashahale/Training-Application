const express = require('express');
const app = express();
const TrainerController = require('../controllers/trainerController');


app.get('/api/v1.0/trainers',TrainerController.getTrainers);
app.get('/api/v1.0/trainers/:id',TrainerController.getTrainersById);
app.delete('/api/v1.0/trainers/:id',TrainerController.deleteTrainer);

module.exports = app;