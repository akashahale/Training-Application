'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrainingProgram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TrainingProgram.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    topic_id: DataTypes.INTEGER,
    trainer_id: DataTypes.INTEGER,
    regStartDate: DataTypes.DATE,
    regCloseDate: DataTypes.DATE,
    noOfAttendies: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TrainingProgram',
  });
  return TrainingProgram;
};