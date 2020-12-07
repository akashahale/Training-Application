const { successObject } = require('api-rsp');
const db=require('../models/sql');
const sequelize = require('sequelize');
var moment = require('moment');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const Op = sequelize.Op;
const Trainer=db.Trainers;
const Topics = db.Topics;
const Trainer_Topics = db.Trainer_Topics;
const TrainerSchedule = db.TrainerSchedule;
const TrainingProgram = db.TrainingProgram;
//get all trainers
async function getTrainers(){

    const result = await Trainer.findAll();
    return successObject({ result: result });
}

//get trainer by id
async function getTrainerById(id) {
    const result = await Trainer.findByPk(id);
    return successObject({ result: result });
}

//create trainer
async function createTrainer(data, url) {
    const trainerData = {
        trainer_name: data.trainer_name,
        trainer_email: data.trainer_email,
        trainer_phone: data.trainer_phone,
        trainer_address: data.trainer_address,
        trainer_photo_url: url,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const result = await Trainer.create(trainerData);
    return successObject({ trainer: result });
}
//update trainer
async function updateTrainer(id, dbData, url) {
    const result = await Trainer.update(
        {
            trainer_name: dbData.trainer_name,
            trainer_email: dbData.trainer_email,
            trainer_phone: dbData.trainer_phone,
            trainer_address: dbData.trainer_address,
            trainer_photo_url: url,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            where: {
                trainer_id: id,
                is_active: true,
            },
        }
    );
    return successObject({ result: result });
}
 //deleting trainer by id
 async function deleteTrainer(id) {
    const result = await Trainer.update(
        { is_active: false },
        {
            where: {
                trainer_id: id,
                is_active: true,
            },
        }
    );
    return successObject({ result: result });
}

//create trainer by topic
async function createTrainerWithTopic(data, url) {
    const result = await Trainer.create(
        {
            trainer_name: data.trainer_name,
            trainer_email: data.trainer_email,
            trainer_phone: data.trainer_phone,
            trainer_address: data.trainer_address,
            trainer_photo_url: url,
            createdAt: new Date(),
            updatedAt: new Date(),
            Trainer_Topics: [
                {
                    topic_id: parseInt(data.topic_id),
                    createdAt: moment(new Date()).format(
                        'YYYY-MM-DD HH:mm'
                    ),
                },
            ],
        },
        {
            include: {
                model: Trainer_Topics,
            },
        }
    );
    return successObject({ trainer: result });
}

async function getTrainerByTopic(topicId) {
    console.log("topic_id is :",topicId);
    const result = await Trainer.findAll({
        include: [
            {
                model: Trainer_Topics,
                where: { topic_id: topicId },
            },
        ],
    });
    console.log('result', result);
    return successObject({ result: result });
}

async function getTrainerSchedule(trainerId) {
    const result = await Trainer.findAll({
        include: [
            {
                model: TrainerSchedule,
                where: { trainer_id: trainerId },
            },
        ],
    });
    console.log('result', result);
    return successObject({ result: result });
}

async function getAvailableTrainerForTopic(topicId, startDate, endDate) {
    console.log('startDate', startDate);
    const result = await Trainer.findAll({
        include: [
             {
                model: Trainer_Topics,
                where: { topic_id: topicId },
            },
            {
                
                model: TrainerSchedule,
                where: {
                    startDate: {
                        [Op.notBetween]: [
                            moment(new Date(startDate)).format(
                                'YYYY-MM-DD HH:mm'
                            ),
                            moment(new Date(endDate)).format(
                                'YYYY-MM-DD HH:mm'
                            ),
                        ],
                    },
                },
            },
           
        ],
    });

    console.log('result', result);

    return successObject({ result: result });
}
async function createTrainingProgram(data) {
   // console.log('data', data);

    const programData = {
        startDate: moment(new Date(data.startDate)).format(
            'YYYY-MM-DD HH:mm'
        ),
        endDate: moment(new Date(data.endDate)).format('YYYY-MM-DD HH:mm'),
        topic_id: parseInt(data.topic_id),
        trainer_id: parseInt(data.trainer_id),
        regStartDate: moment(new Date(data.regStartDate)).format(
            'YYYY-MM-DD HH:mm'
        ),
        regCloseDate: moment(new Date(data.regCloseDate)).format(
            'YYYY-MM-DD HH:mm'
        ),
        noOfAttendies: parseInt(data.noOfAttendies),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    console.log('programData ', programData);
    const result = await TrainingProgram.create(programData);
    const answer = await TrainerSchedule.create({
        trainer_id: parseInt(data.trainer_id),
        startDate: moment(new Date(data.startDate)).format(
            'YYYY-MM-DD HH:mm'
        ),
        endDate: moment(new Date(data.endDate)).format('YYYY-MM-DD HH:mm'),
        status: 'upcoming',
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    console.log('anser ', answer);
    console.log('result ', result);
    await sendMailToTrainer(result);
    return successObject({ result: result });
}

async function sendMailToTrainer(data) {
    const topic = await Topics.findOne({
        where: { topic_id: data.topic_id },
    });
    console.log('topic name ', topic.topic_name);
    const startDate = data.startDate;
    const endDate = data.endDate;
    const trainer = await Trainer.findOne({
        where: { trainer_id: data.trainer_id },
    });
    console.log('trainer email ', trainer.trainer_email);
    const ses = new AWS.SES({ apiVersion: '2010-12-01' });
    console.log("start date ", startDate);
    var params = {
        Destination: {
            ToAddresses: [trainer.trainer_email], // Email address/addresses that you want to send your email
        },

        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data:
                        ' Dear trainer ' +
                        trainer.trainer_name +
                        'this email is to inform you about your upcoming training program . The details of traing are:  topic = ' +
                        topic.topic_name +
                        'start Date = ' +
                        startDate +
                        'end Date  = ' +
                        endDate +
                        '',
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Training program details',
            },
        },
        Source: 'akashahale7@gmail.com',
    };
    console.log("params :::",params);
    const sendEmail = ses.sendEmail(params).promise();
    console.log('send email ', sendEmail);
    return successObject({ result: sendEmail });
}

async function getTrainerTrainingStatastic(trainerId,data){
        const upcomingTraining = await TrainingProgram.findAll({
            where: {
                [Op.and]: {
                    trainer_id: trainerId,
                    startDate: {
                        [Op.gt]: moment(new Date(data.endDate)).format(
                            'YYYY-MM-DD HH:mm'
                        ),
                    },
                },
            },
        });
        const conductedTraining = await TrainingProgram.findAll({
            where: {
                [Op.and]: {
                    trainer_id: trainerId,
                    endDate: {
                        [Op.lte]: moment(new Date(data.startDate)).format(
                            'YYYY-MM-DD HH:mm'
                        ),
                    },
                },
            },
        });
 
        const onGoingTraining = await TrainingProgram.findAll({
            where: {
                [Op.and]: {
                    trainer_id: trainerId,
                    startDate: {
                        [Op.between]: [
                            moment(new Date(data.startDate)).format(
                                'YYYY-MM-DD HH:mm'
                            ),
                            moment(new Date(data.endDate)).format(
                                'YYYY-MM-DD HH:mm'
                            ),
                        ],
                    },
                },
            },
        });
        const result = [
            { upcomingTraining: upcomingTraining },
            { conductedTraining: conductedTraining },
            { onGoingTraining: onGoingTraining },
        ];
        return successObject({ result });
    }


module.exports={getTrainers,getTrainerById,createTrainer,updateTrainer,deleteTrainer,createTrainerWithTopic,getTrainerByTopic,getTrainerSchedule,createTrainingProgram,getAvailableTrainerForTopic,getTrainerTrainingStatastic};