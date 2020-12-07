const { sendSuccessRsp, sendErrorRsp, successObject } = require('api-rsp');

const helper = require('../middlewares/trainerImage');
const { TrainerService } = require('../services');
const { TrainerSchema } = require('../validation-schema');
const trainerService = new TrainerService();
const trainerSchema = new TrainerSchema();

class TrainerController {
    //getTrainer
    async getTrainers(req, res) {
        try {
            console.log('in conn', req);

            const result = await trainerService.getTrainer();
            return sendSuccessRsp(res, result);
        } catch (err) {
            console.error('Error in get trainer :: ', err);
            return sendErrorRsp(res, {
                code: 'GET_TRAINER_FAILED',
                message: 'Unable to get trainer failed',
                httpCode: 500,
            });
        }
    }

    //get trainer by id

    async getTrainersById(req, res) {
        try {
            console.log('id in conn ', req.params.id);
            const result = await trainerService.getTrainerById(req.params.id);
            return sendSuccessRsp(res, result);
        } catch (err) {
            res.status(500).send(err.stack);
        }
    }

    async signUp(req, res) {
        const trainerData = req.body;
        try {
            const { isValid, errors } = trainerSchema.validateApi(
                trainerData,
                trainerSchema.createSchema()
            );
            if (!isValid) {
                return sendErrorRsp(res, {
                    code: 'INVALID_REQUEST',
                    message: 'Invalid request data received',
                    httpCode: 400,
                    error: errors,
                });
            }
            const fileName = req.file.originalname.toString();
            const filePath = req.file.path.toString();
            const ans = await helper.uploadFile(filePath, fileName);
            console.log('ans ', ans);
            const URL = await helper.getS3URL(fileName);
            var newUrl = URL.toString().split('?');
            const result = await trainerService.createTrainer(
                trainerData,
                newUrl[0]
            );
            return sendSuccessRsp(res, result);
        } catch (err) {
            console.error('Error in create trainer :: ', err);
            return sendErrorRsp(res, {
                code: 'CREATE_TRAINER_FAILED',
                message: 'Unable to create trainer failed',
                httpCode: 500,
            });
        }
    }

    //delete trainer
    async trainerDelete(req, res) {
        try {
            console.log('id in conn ', req.params.id);
            const result = await trainerService.deleteTrainer(req.params.id);
            return sendSuccessRsp(res, result);
        } catch (err) {
            console.error('Error in delete trainer :: ', err);
            return sendErrorRsp(res, {
                code: 'DELETED_TRAINER_FAILED',
                message: 'Unable to delete trainer failed',
                httpCode: 500,
            });
        }
    }

    //updatetrainer
    async trainerUpdate(req, res) {
        const trainerData = req.body;
        console.log('trainerdata', trainerData);
        try {
            const fileName = req.file.originalname.toString();
            const filePath = req.file.path.toString();
            const ans = await helper.uploadFile(filePath, fileName);
            console.log('ans ', ans);
            const URL = await helper.getS3URL(fileName);
            var newUrl = URL.toString().split('?');
            const result = await trainerService.updateTrainer(
                req.params.id,
                req.body,
                newUrl[0]
            );
            return sendSuccessRsp(res, result);
        } catch (err) {
            console.error('Error in create trainer :: ', err);
            return sendErrorRsp(res, {
                code: 'CREATE_TRAINER_FAILED',
                message: 'Unable to create trainer failed',
                httpCode: 500,
            });
        }
    }
    async addTrainer(req, res) {
        try {
            console.log('id in conn ', req.body);
            const fileName = req.file.originalname.toString();
            const filePath = req.file.path.toString();
            const ans = await helper.uploadFile(filePath, fileName);
            console.log('ans ', ans);
            const URL = await helper.getS3URL(fileName);
            var newUrl = URL.toString().split('?');
            const result = await trainerService.createTrainer(
                req.body,
                newUrl[0]
            );
            return sendSuccessRsp(res, result);
        } catch (err) {
            res.status(500).send(err.stack);
        }
    }

    async getTrainerBYTopic(req, res) {
        try {
            console.log('id in conn ', req.params.id);
            const result = await trainerService.getTrainerByTopic(
                req.params.id
            );
            return sendSuccessRsp(res, result);
        } catch (err) {
            res.status(500).send(err.stack);
        }
    }

    async getTrainerSchedules(req, res) {
        try {
            console.log('id in conn ', req.body);
            const result = await trainerService.getTrainerSchedule(
                req.params.id
            );
            return sendSuccessRsp(res, result);
        } catch (err) {
            res.status(500).send(err.stack);
        }
    }
    async getFreeTrainers(req, res) {
        try {
            console.log('id in conn ', req.body);
            const result = await trainerService.getAvailableTrainer(
                req.params.id,
                req.body.startDate,
                req.body.endDate
            );
            return sendSuccessRsp(res, result);
        } catch (err) {
            res.status(500).send(err.stack);
        }
    }

    async getFreeTrainersForTopic(req, res) {
        try {
            console.log('id in conn ', req.body);
            const result = await trainerService.getAvailableTrainerForTopic(
                req.params.id,
                req.body.startDate,
                req.body.endDate
            );
            return sendSuccessRsp(res, result);
        } catch (err) {
            res.status(500).send(err.stack);
        }
    }

    async signUpTrainingProgram(req, res) {
        try {
            console.log('id in conn ', req.body);
            const result = await trainerService.createTrainingProgram(
                req.body,
                req.params.id
            );
            return sendSuccessRsp(res, result);
        } catch (err) {
            res.status(500).send(err.stack);
        }
    }
}

module.exports = TrainerController;
