const mysql = require('mysql2')
const pool = mysql.createPool({
    host:'test11',
    user:'root',
    password:'1234',
    database:'test11',
    dateStrings:true,
    timezone:true,
})

module.exports = pool.promise()