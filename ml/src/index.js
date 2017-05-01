const getResult = require('./src/getResult'),
    ctx = document.getElementById('ctx'),
    mysql = require('./src/mysql'),
    writeFile = require('./src/writeFile')
document
    .getElementById('submit')
    .addEventListener('click', async e => {
        let [rows,
            _] = await mysql('select * from FoodTech limit 1,10')
        rows = rows.map(row => {
            let temp = ''
            for (let i in row) {
                temp += (i + ':' + row[i] + ',')
            }
            return temp
        })
        const url = []
        for (let i = 0; i < rows.length; i++) {
            url.push('http://139.224.232.97:8080?ctx=' + encodeURI(rows[i]))
        }
        for (let i = 0; i < url.length; i++) {
            const result = await getResult(url[i])
            await mysql('insert into results result VALUES (' + result + ') ')
        }
    }, false)
