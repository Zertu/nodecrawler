const fs = require('fs')
module.exports = function (name,data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(name,data, (err) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}