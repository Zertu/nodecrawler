const http = require('http'),
    ctx = document.getElementById('ctx'),
    mysql = require('./src/mysql'),
    writeFile=require('./src/writeFile')
document
    .getElementById('submit')
    .addEventListener('click',async e => {
        const res = await mysql('select * from FoodTech')
        await writeFile('table.txt',res.join('`'))
        console.log(res)
        const url = 'http://139.224.232.97:8080?ctx=' + encodeURI(ctx.value)
        http.get(url, res => {
            let result = ''
            res.on('data', data => result += data)
            res.on('end', () => {
                switch (result.trim()) {
                    case 'positive':
                        document
                            .querySelector('p')
                            .innerHTML = '积极情绪'
                        break
                    case 'negative':
                        document
                            .querySelector('p')
                            .innerHTML = '消极情绪'
                        break
                }

            })
        })
    }, false)