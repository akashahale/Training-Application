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



module.exports = {getTrainers}