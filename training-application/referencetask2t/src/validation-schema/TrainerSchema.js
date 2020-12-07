const BaseSchema = require('./BaseSchema');
const Joi = require('@hapi/joi');

class TrainerSchema extends BaseSchema {
    /**
     * Which is used to validate the api request object structure based on the defined schema
     * @param  {object} obj - request object
     * @return {object} {isValid : true | false, errors: [] }
     */
    validateApi(obj, schema) {
        return this.validate(obj, schema);
    }

    createSchema() {
        return Joi.object().keys({
            trainer_name: Joi.string().trim().required(),
            trainer_email: Joi.string().trim().required(),
            trainer_phone: Joi.string().trim().required().min(10),
            trainer_address: Joi.string().trim().required(),
        });
    }
}

module.exports = TrainerSchema;
