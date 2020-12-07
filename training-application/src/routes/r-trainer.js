const express = require('express');
const app = express();
const TrainerController = require('../controllers/trainerController');
const multer = require('multer');
const fs = require('fs');
const AuthController  = require('../controllers/authController');
const authController= new AuthController();
//console.log(authController);
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        console.log("filename",file.originalname);
        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage});
app.get('/api/v1.0/trainers',TrainerController.getTrainers);
app.get('/api/v1.0/trainers/:id',TrainerController.getTrainersById);
app.post('/api/v1.0/trainers',upload.single('file'),TrainerController.registerTrainer);
app.put('/api/v1.0/trainers/:id',upload.single('file'),TrainerController.updateTrainer); 
app.delete('/api/v1.0/trainers/:id',TrainerController.deleteTrainer);
app.post('/api/v1.0/trainersWithTopic',upload.single('file'),TrainerController.addTrainerWithTopic);
app.get('/api/v1.0/trainersByTopic/:id', TrainerController.getTrainerBYTopic);
app.post('/api/v1.0/trainingPrograms', TrainerController.createTrainingProgram);
app.get('/api/v1.0/trainerSchedule/:id', TrainerController.getTrainerSchedules);
app.post( '/api/v1.0/trainerAvaliableForTopic/:id',TrainerController.getFreeTrainersForTopic);
app.post('/api/v1.0/trainerTrainingStatistic/:id', TrainerController.getTrainerTrainingStatastic)
app.post('/register', authController.register);
app.post('/confirmCode', authController.confirmCode);
app.post('/loginIn', authController.signIn);
module.exports = app;