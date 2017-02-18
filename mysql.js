const mysql = require('mysql'),
// mysql的配置，需要的可以自己配置一个
mysqlconfig = require('./mysqlconfig')


 mysql.createPool(mysqlconfig)
let sqlquery = (sqlstr, callback) => {
    console.log(sqlstr)
    pool.getConnection((err, con) => {
        con.query(sqlstr, (err, rows) => {
            if (err) {
                console.error(err)
                return
            } else {
                callback(rows)
            }
        })
    })
}

module.exports = {
    sqlquery: sqlquery
}