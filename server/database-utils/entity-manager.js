const { Sequelize } = require('sequelize');
const config = require('./config');


sequelize = new Sequelize(config.db_name, config.username, config.password, 
    {
        host: config.host, 
        post: config.port, 
        dialect: config.dialect, 
        define: {timestamps: false, freezeTableName: true},
        logging: false,
    }
);

module.exports = sequelize;
