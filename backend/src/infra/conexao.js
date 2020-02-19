//papel de conectar com o bd e vltar a conexao

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'bcd127',
    database: 'series_api'
})

module.exports = connection;