const Sequelize = require('sequelize')
var serv = process.env.DB_HOST
var por = process.env.DB_PORT   
var user = process.env.username
var pass = process.env.password
const seq = new Sequelize('Tienda_01', null, null, {
    dialect : 'mssql',
    server : serv,
    port : por,
    dialectOptions : { 
        authentication: {
            type : 'default' ,
            options: {
                userName : user,
                password : pass
            }
        },
    }
})
module.exports = seq