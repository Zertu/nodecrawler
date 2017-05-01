const http = require('http')
module.exports = async function (url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let result = ''
            res.on('data', data => result += data)
            res.on('error', err => reject(err))
            res.on('end', () => {
                switch (result.trim()) {
                    case 'positive':
                        resolve('积极情绪')
                        break
                    case 'negative':
                        resolve('消极情绪')
                        break
                }
            })
        })
    })
}