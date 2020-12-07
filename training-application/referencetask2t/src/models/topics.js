'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Topics extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Trainer_Topics, {
                foreignKey: 'topic_id',
            });
        }
    }
    Topics.init(
        {
            topic_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            topic_name: DataTypes.STRING,
            is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
        },
        {
            sequelize,
            modelName: 'Topics',
        }
    );
    return Topics;
};
