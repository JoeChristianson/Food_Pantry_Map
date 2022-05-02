const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pantry extends Model {}

Pantry.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        street_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            
        }

    }

)