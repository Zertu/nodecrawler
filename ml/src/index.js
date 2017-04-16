const http = require('http'),
    ctx = document.getElementById('ctx')
document
    .getElementById('submit')
    .addEventListener('click', e => {
        const url = 'http://139.224.232.97:8080?ctx=' + encodeURI(ctx.value)
        console.log(url)
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