const series = require('./Data/series')
(async function () {
   let a =await series(10, (e) =>e)
   console.log(a)
})()