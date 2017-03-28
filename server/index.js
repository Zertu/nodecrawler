const app = require('koa')(),
router = require('koa-router')()

router.get('/getUrl', function *(next) {
    });
 
app
  .use(router.routes())
  .use(router.allowedMethods())