const { successObject } = require('api-rsp');
const connection=require('../models/sql/trainer');

async function getTrainers(){

    const result = await Trainer.findAll();
    console.log("result is ",result);
     return successObject({ result: result });
}

module.exports={getTrainers};