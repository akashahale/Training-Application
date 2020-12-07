'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Trainers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Trainer_Topics, {
                foreignKey: 'trainer_id',
            });
            this.hasMany(models.TrainerSchedule, {
                foreignKey: 'trainer_id',
            });
        }
    }
    Trainers.init(
        {
            trainer_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            trainer_name: DataTypes.STRING,
            trainer_email: DataTypes.STRING,
            trainer_phone: DataTypes.STRING,
            trainer_address: DataTypes.STRING,
            trainer_photo_url: DataTypes.STRING,
            is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
        },
        {
            sequelize,
            modelName: 'Trainers',
        }
    );
    return Trainers;
};
