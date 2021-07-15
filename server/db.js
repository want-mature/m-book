// 连接数据库

const mysql = require('mysql')

let connection = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'123456',
    database:'book_schemas'
})

connection.connect()

// 将connection 导出
module.exports = connection;
