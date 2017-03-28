// const app = require('koa')(),
// router = require('koa-router')()
// fs= require('fs'),
// readurl=require('./Data/readurl'),
urlgetter=require('./Data/urlgetter')

urlgetter.start(()=>{
    console.log('ok')
})
// router.get('/getUrl', function *(next) {
//     })
 
// app
//   .use(router.routes())
//   .use(router.allowedMethods())