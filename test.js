const {observable,autorun} = require('mobx')
 let  hrefarr = observable([])

 let d = autorun((e)=>console.log(e))

 hrefarr.push(123)
 d()