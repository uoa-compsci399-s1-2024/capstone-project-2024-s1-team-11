const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database-utils/entity-manager');


class Privilege extends Model{}

Privilege.init(
    {
        privilege_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        sequelize,
        modelName: 'Privilege',
        tableName: 'Privileges'
    }
);


module.exports = Privilege;