const getResult = require('./src/getResult'),
    ctx = document.getElementById('ctx'),
    mysql = require('./src/mysql'),
    writeFile = require('./src/writeFile'),
    readFile = require('./src/readFile')
document
    .getElementById('submit')
    .addEventListener('click', async e => {
        let rows = await readFile('./data/FoodTech.json')
        rows = JSON
            .parse(rows)
            .RECORDS
        const url = [],sql=[]
        for (let i = 0; i < rows.length; i++) {
            url.push('http://139.224.232.97:8080?ctx=' + encodeURI(rows[i].content))
        }        
        for (let i = 0; i < url.length; i++) {
            const result = await getResult(url[i])
            // console.log("insert into results  VALUES ('" + result + "'," + (i + 1) + ") ")
            // return
            sql.push("insert into results  VALUES ('" + result + "'," + (i + 1) + ") ")
            console.log(sql.length)
        }
        writeFile('task.txt',sql.join('`'))
    }, false)
