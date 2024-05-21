const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database-utils/entity-manager');


// This database table store content of a static page, such as "about us", "privacy".
// This can be extended to store announcement in the future.
class Page extends Model{}

Page.init(
    {
        page_name: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT
        }
    },
    {
        sequelize,
        modelName: 'Page',
        tableName: 'Pages'
    }
);

module.exports = Page;