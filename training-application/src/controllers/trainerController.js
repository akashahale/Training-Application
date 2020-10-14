const { sendSuccessRsp, sendErrorRsp } = require('api-rsp');
const trainerService = require('../services/trainerService');
    //getTrainer
    async function getTrainers(req, res) {
        try {
            console.log('in conn');

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
            console.log('id in conntroller ', req.params.id);
            const result = await trainerService.getTrainerById(req.params.id);
            return sendSuccessRsp(res, result);
        } catch (err) {
            res.status(500).send(err.stack);
        }
    }

    //delete trainer
    async function deleteTrainer(req,res){
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


module.exports = {getTrainers,getTrainersById,deleteTrainer}