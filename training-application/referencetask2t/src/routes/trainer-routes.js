const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const { TrainerController } = require('../controllers');
const { TrainerSchema } = require('../validation-schema');

const trainerController = new TrainerController();
const trainerSchema = new TrainerSchema();

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        console.log('filename', file.originalname);
        callback(null, file.originalname);
    },
});
var upload = multer({ storage: storage });
router.get('', trainerController.getTrainers);
router.get('/:id', trainerController.getTrainersById);
router.post('', upload.single('file'), trainerController.signUp);
router.put('/:id', upload.single('file'), trainerController.trainerUpdate);
router.delete('/:id', trainerController.trainerDelete);
router.post(
    '/trainertopic',
    upload.single('file'),
    trainerController.addTrainer
);
router.get('/trainersByTopic/:id', trainerController.getTrainerBYTopic);
router.get('/trainerSchedule/:id', trainerController.getTrainerSchedules);
router.post('/trainerAvaliable/:id', trainerController.getFreeTrainers);
router.post(
    '/trainerAvaliableForTopic/:id',
    trainerController.getFreeTrainersForTopic
);
router.post('/trainingProgram/:id', trainerController.signUpTrainingProgram);
module.exports = router;
