const mysql = require('mysql2/promise'),
    mysqlconfig = require('./mysqlconfig')
module.exports = async function (querys) {
    const connection = await mysql.createPool(mysqlconfig)
    let [rows,
        fields] = await connection.query(querys)
    return [rows, fields]
}