const { sendSuccessRsp, sendErrorRsp } = require('api-rsp');
const trainerService = require('../services/trainerService');
const trainerData=require('../middlewares/trainerDocuments');
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
        try {
             const fileName = req.file.originalname.toString();
             const filePath = req.file.path.toString();
             const response = await trainerData.uploadFile(filePath, fileName);
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


module.exports = {getTrainers,getTrainersById,registerTrainer,updateTrainer,deleteTrainer}