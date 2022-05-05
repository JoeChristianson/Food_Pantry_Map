const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Request extends Model {}

Request.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        open: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        pantry_id: {
            type: DataTypes.INTEGER,
            references: {
            model: 'pantry',
            key: 'id',
            },
        },
    },
    {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'request',
    },
);

module.exports = Request;