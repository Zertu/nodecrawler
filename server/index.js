// const app = require('koa')(), router = require('koa-router')() fs=
// require('fs'), readurl=require('./Data/readurl'),
urlgetter = require('./Data/urlgetter'), {readurl, pagereader} = require('./Data/readurl')

readurl().then(data => {
    pagereader(data)
})
// readurl.pagereader(readurl.readurl()) router.get('/getUrl', function *(next)
// {     }) app   .use(router.routes())   .use(router.allowedMethods())