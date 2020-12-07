'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TrainerSchedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Trainers, { foreignKey: 'trainer_id' });
        }
    }
    TrainerSchedule.init(
        {
            trainer_id: { type: DataTypes.INTEGER },
            stratDate: DataTypes.DATE,
            endDate: DataTypes.DATE,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'TrainerSchedule',
        }
    );
    return TrainerSchedule;
};
