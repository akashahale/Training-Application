const { any } = require('@hapi/joi');
const { sendSuccessRsp, sendErrorRsp, successObject } = require('api-rsp');
const { AuthService } = require('../services');
const authService = new AuthService();

class AuthController {
    async register(req, res) {
        try {
            console.log('in auth conn ', req.body);
            let result = await authService.register(req.body);
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

    async confirmCode(req, res) {
        try {
            console.log('in auth conn ', req.body);
            let result = await authService.confirmUser(
                req.body.username,
                req.body.code
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

    async signIn(req, res) {
        const userName = req.body.username;
        const password = req.body.password;
        console.log('password ', password);
        try {
            const result = await authService.signIn(userName, password);
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}
module.exports = AuthController;
