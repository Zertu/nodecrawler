const koa = require('koa'),
    app = new koa(),
    router = require('koa-router')(),
    fs = require('fs'), {start} = require('./Data/urlgetter'), {readurl, pagereader} = require('./Data/readurl')

app
    .use(router.routes())
    .use(router.allowedMethods())
router.get('/getUrl', async(ctx, next) => {
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
})
router.get('/getData', async(ctx, next) => {
    let result
    try {
        result = await readurl()
    } catch (e) {
        ctx.body = e
    }
    if (result.length) {
        await pagereader(result)
        ctx.body = 'ok'
    } else {
        ctx.body = 'fail'
    }
})

app.listen(3000, () => {
    console.log('server open at http://localhost:3000/')
})