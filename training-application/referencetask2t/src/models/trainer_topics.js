'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Trainer_Topics extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Trainer_Topics.belongsTo(models.Trainers, {
                foreignKey: 'trainer_id',
            });
            models.Trainer_Topics.belongsTo(models.Topics, {
                foreignKey: 'topic_id',
            });
        }
    }
    Trainer_Topics.init(
        {
            trainer_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'trainers',
                    key: 'id',
                },
                onDelete: 'cascade',
                onUpdate: 'cascade',
            },
            topic_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'topics',
                    key: 'id',
                },
                onDelete: 'cascade',
                onUpdate: 'cascade',
            },
        },
        {
            sequelize,
            modelName: 'Trainer_Topics',
        }
    );
    return Trainer_Topics;
};
