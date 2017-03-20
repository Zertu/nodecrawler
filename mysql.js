const mysql = require('mysql'),
    config = require('./mysqlconfig'),
    /* mysql的配置，需要的可以自己配置一个     
    module.exports = {         
    host: '你的服务器地址',
    port: 端口,         
    user: '用户名',         
    password: '密码',         
    database: '数据库名' 
    }*/
    pool = mysql.createPool(config)
/**
 *
 *
 * @param {String} sqlstr sql语句
 * @param {Function} callback 完成后执行的回调
 */
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