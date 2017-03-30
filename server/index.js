const koa = require('koa'),
    app = new koa(),
    router = require('koa-router')(),
    fs = require('fs'), {start} = require('./Data/urlgetter'), 
    {readurl, pagereader} = require('./Data/readurl')

app
    .use(router.routes())
    .use(router.allowedMethods())
router.get('/getUrl', async(ctx, next) => {
    console.log(ctx)
    await start(result => {
        console.log(result)
        if (result.length) {
           return ctx.body = 'ok'
        } else {
           return ctx.body = 'fail'
        }
    })
})
router.get('/getData', async(ctx, next) => {
    readurl().then(async result => {
        if (result.length) {
            await getallurl()
            await next()
            ctx.body = 'ok'
        } else {
            ctx.body = 'fail'
        }
    })

})

app.listen(3000, () => {
    console.log('server open at http://localhost:3000/')
})