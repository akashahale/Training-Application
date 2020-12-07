global.fetch = require('node-fetch');
global.navigator = () => null;

const { successObject } = require('api-rsp');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;
const { string } = require('@hapi/joi');

// const { TrainerController } = require('../controllers');
// const trainerController = new TrainerController();

class AuthService {
    constructor() {
        const poolData = {
            UserPoolId: 'us-east-1_CXvZbgJNc',
            ClientId: '49b1qv6osm5elcn4niefgsmie2',
        };

        this.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    }
    async register(body) {
        console.log('in auth servic ', body);
        var email = body.email;
        var password = body.password;
        var attributeList = [];

        this.userPool.signUp(email, password, attributeList, null, function (
            err,
            result
        ) {
            if (err) {
                console.log('err in signUp ', err);
                return err;
            } else {
                console.log('resukt ', result);

                var cognitoUser = result.user;
                console.log('cognitoUser ', cognitoUser);
                // const trainer = trainerController.signUp(body, res);
                return successObject({ trainer: cognitoUser });
            }
        });
    }

    async confirmUser(username, verificationCode) {
        return await new Promise((resolve, reject) => {
            const userData = {
                Username: username,
                Pool: this.userPool,
            };
            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            cognitoUser.confirmRegistration(
                verificationCode,
                true,
                (err, result) => {
                    if (err) {
                        console.log('error ', err);
                        reject(err);
                    } else {
                        console.log('result ', result);
                        resolve(result);
                    }
                }
            );
        });
    }

    async signIn(username, password) {
        return await new Promise((resolve, reject) => {
            const authenticationDetails = new AuthenticationDetails({
                Username: username,
                Password: password,
            });

            const userData = {
                Username: username,
                Pool: this.userPool,
            };
            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    console.log('result ', result);
                    const accessToken = result.getIdToken().getJwtToken();
                    console.log('access token ', accessToken);
                    resolve(accessToken);
                },
                onFailure: (err) => {
                    console.log('error ', err);
                    reject(err);
                },
            });
        });
    }
}

module.exports = AuthService;
