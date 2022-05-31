const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database: 'dip_base',
    dateStrings :[
        'DATETIME'
    ]
})

module.exports = connection;