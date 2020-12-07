const _ = require('lodash');
let Joi = require('@hapi/joi');
class BaseSchema {
  /**
   * It validates the object based on the respective schema
   * @param  {Object} object - The object which is need to be validate.
   * @param  {Object} schema - Defined schema which defines the structure or format of object.
   * @return {object}        - Example: 1) Success Validation: {isValid:true}
   *                                2) Failure validation: {isValid:false, errors:[]}
   */
  validate(object = {}, schema = {}) {
    let { error } = schema.validate(object, {
      abortEarly: false,
      convert: false,
    });
    if (error) {
      let messages = [];
      _.forEach(error.details, (err) => {
        messages.push({
          message: err.message,
          field: err.path.join('.'),
          value: err.context.value,
        });
      });
      return {
        errors: messages,
        isValid: false,
      };
    }
    return {
      isValid: true,
      errors: [],
    };
  }
}

module.exports = BaseSchema;