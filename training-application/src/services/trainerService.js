const { successObject } = require('api-rsp');
const db=require('../models/sql/trainer');
console.log("db is ",db);
const Trainer=db.Trainer;
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


module.exports={getTrainers,getTrainerById,createTrainer,updateTrainer,deleteTrainer};