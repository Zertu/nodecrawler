const mysql = require('mysql'),
    // mysql的配置，需要的可以自己配置一个
    config = require('./mysqlconfig')
const pool = mysql.createPool(config)
let sqlquery = (sqlstr, callback) => {
    pool.getConnection((err, con) => {
        if (err) {
            console.error(err)
        }
        con.query(sqlstr, (err, rows) => {
            if (err) {
                console.error(sqlstr)
                console.error(err)
                return
            } else {
                con.release()
                callback(rows)
            }
        })
    })
}

module.exports = {
    sqlquery: sqlquery
}