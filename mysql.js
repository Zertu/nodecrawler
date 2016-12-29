const mysql = require('mysql')

const pool = mysql.createPool({
    host: '139.224.232.97',
    port: 3306,
    user: 'zhang',
    password: 'sbblog',
    database: 'crawler'
})

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