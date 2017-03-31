const fs = require('fs'), 
{start} = require('./src/js/Data/urlgetter'), {readurl, pagereader} = require('./src/js/Data/readurl')
window.onload = () => {
    document.getElementById('start').addEventListener('click',async function(){
    let result
    try {
        result = await start()
    } catch (e) {
        ctx.body = e
    }
    if (result.length) {
        return ctx.body = 'ok'
    } else {
        return ctx.body = 'fail'
    }
    },false)
}