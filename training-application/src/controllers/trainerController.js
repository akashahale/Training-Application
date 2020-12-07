const { sendSuccessRsp, sendErrorRsp } = require('api-rsp');
const trainerService = require('../services/trainerService');
const trainerData=require('../middlewares/trainerDocuments');
const TrainerSchema = require('../validation-schema/trainerSchema');
//console.log("trainerSchema is ",TrainerSchema);
const trainerSchema = new TrainerSchema();

    //getTrainer
    async function getTrainers(req, res) {
        try {
            const result = await trainerService.getTrainers();
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

    async function getTrainersById(req, res) {
               try {
                    const result = await trainerService.getTrainerById(req.params.id);
                    return sendSuccessRsp(res, result);
                   } catch (err) {
                 res.status(500).send(err.stack);
          }
     }
    
     //create trainer
    async function registerTrainer(req, res) {
        const trainerInfo = req.body;
        try {
            const { isValid, errors } = trainerSchema.validateApi(
                trainerInfo,
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
            const ans = await trainerData.uploadFile(filePath, fileName);
            const URL = await trainerData.getS3URL(fileName);
            var newUrl = URL.toString().split('?');
            const result = await trainerService.createTrainer(
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
        // try {
        //      const fileName = req.file.originalname.toString();
        //      const filePath = req.file.path.toString();
        //      const response = await trainerData.uploadFile(filePath, fileName);
        //      const URL = await trainerData.getS3URL(fileName);
        //      var newUrl = URL.toString().split('?');
        //      const result = await trainerService.createTrainer(
        //      req.body,
        //      newUrl[0]
        //     );
        //     return sendSuccessRsp(res, result);
        // } catch (err) {
        //     console.error('Error in create trainer :: ', err);
        //     return sendErrorRsp(res, {
        //     code: 'CREATE_TRAINER_FAILED',
        //     message: 'Unable to create trainer failed',
        //     httpCode: 500,
        //     });
        // }
    }
    
    //update trainer
    async function updateTrainer(req, res) {
        try {
            console.log("id is :",req.params.id);
             const fileName = req.file.originalname.toString();
             const filePath = req.file.path.toString();
             const response = await trainerData.uploadFile(filePath, fileName);
             const URL = await trainerData.getS3URL(fileName);
             var newUrl = URL.toString().split('?');
             const result = await trainerService.updateTrainer(req.params.id,
             req.body,
             newUrl[0]
            );
            return sendSuccessRsp(res, result);
        } catch (err) {
            console.error('Error in create trainer :: ', err);
            return sendErrorRsp(res, {
            code: 'UPDATE_TRAINER_FAILED',
            message: ' trainer updation failed',
            httpCode: 500,
            });
        }
    }
    
    //delete trainer
    async function deleteTrainer(req,res){
        try {
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
    //create trainer with topic
    async function addTrainerWithTopic(req, res) {
        try {
            const fileName = req.file.originalname.toString();
            const filePath = req.file.path.toString();
            const ans = await trainerData.uploadFile(filePath, fileName);
            const URL = await trainerData.getS3URL(fileName);
            var newUrl = URL.toString().split('?');
            const result = await trainerService.createTrainerWithTopic(
                req.body,
                newUrl[0]
            );
            return sendSuccessRsp(res, result);
        } catch (err) {
            res.status(500).send(err.stack);
        }
    }
    //get Trainer by topic
    async function getTrainerBYTopic(req, res) {
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

    async function getTrainerSchedules(req, res) {
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

    async function getFreeTrainersForTopic(req, res) {
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
    async function createTrainingProgram(req, res) {
        try {
            const result = await trainerService.createTrainingProgram(
                req.body,
            );
            return sendSuccessRsp(res, result);
        } catch (err) {
            res.status(500).send(err.stack);
        }
    }

    async function getTrainerTrainingStatastic(req, res) {
        try {
            console.log('data is : ', req.body);
            const result = await trainerService.getTrainerTrainingStatastic(
                req.params.id,
                req.body
            );
            return sendSuccessRsp(res, result);
        } catch (err) {
            res.status(500).send(err.stack);
        }
    }

module.exports = {getTrainers,getTrainersById,registerTrainer,updateTrainer,deleteTrainer,getTrainerBYTopic,addTrainerWithTopic,getTrainerSchedules,getFreeTrainersForTopic,createTrainingProgram, getTrainerTrainingStatastic}