const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const { TrainerController } = require('../controllers');
const { TrainerSchema } = require('../validation-schema');
const { AuthController } = require('../controllers');

const trainerController = new TrainerController();
const trainerSchema = new TrainerSchema();
const authController = new AuthController();

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
router.post('/register', authController.register);
router.post('/confirmCode', authController.confirmCode);
router.post('/loginIn', authController.signIn);
router.put('/:id', upload.single('file'), trainerController.trainerUpdate);
router.delete('/:id', trainerController.trainerDelete);
router.post(
    '/trainertopic',
    upload.single('file'),
    trainerController.addTrainer
);
router.get('/trainersByTopic/:id', trainerController.getTrainerBYTopic);
router.get('/trainerSchedule/:id', trainerController.getTrainerSchedules);
router.post('/trainerStatistics/:id', trainerController.trainerStatistics);
router.post('/trainerAvaliable/:id', trainerController.getFreeTrainers);
router.post(
    '/trainerAvaliableForTopic/:id',
    trainerController.getFreeTrainersForTopic
);
router.post('/trainingProgram', trainerController.signUpTrainingProgram);
router.post('/trainingList', trainerController.trainingList);
module.exports = router;
