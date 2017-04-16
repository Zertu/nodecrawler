const http = require('http'),
    ctx = document.getElementById('ctx')
ctx.addEventListener('click', e => {
    http.get('http://139.224.232.97:8080?ctx=' + ctx.value, res => {
        let result = ''
        res.on('data', data => result += data)
        res.on('end', () => {
            document
                .querySelector('p')
                .innerHTML = result
        })
    })
}, false)