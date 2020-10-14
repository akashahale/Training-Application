const { successObject } = require('api-rsp');
const db=require('../models/sql/trainer');
console.log("db is ",db);
const Trainer=db.Trainer;
//get all trainers
async function getTrainers(){

    const result = await Trainer.findAll();
    console.log("result is ",result);
     return successObject({ result: result });
}

//get trainer by id
async function getTrainerById(id) {
    const result = await Trainer.findByPk(id);
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
module.exports={getTrainers,getTrainerById,deleteTrainer};