const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete','root','SQLpassword',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;
