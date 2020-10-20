const express = require('express');
const app = express();
const TrainerController = require('../controllers/trainerController');
const multer = require('multer');
const fs = require('fs');

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
module.exports = app;