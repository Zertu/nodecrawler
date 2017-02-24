const mysql = require('mysql'),
// mysql的配置，需要的可以自己配置一个
config = require('./mysqlconfig')

console.log(config)
const pool =mysql.createPool(config)
let sqlquery = (sqlstr, callback) => {
    console.log(sqlstr)
    pool.getConnection((err, con) => {
        if(err){
            console.log(err)
        }
        con.query(sqlstr, (err, rows) => {
            if (err) {
                console.error(err)
                return
            } else {
                callback(rows)
                con.release();
            }
        })
    })
}

module.exports = {
    sqlquery: sqlquery
}