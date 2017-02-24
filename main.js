const urlgetter = require('./urlgetter'),
    fs = require('fs')
readurl = require('./readurl')

urlgetter.start(() => {
    readurl.readurl(data => {
        readurl.pagereader(data)
    })
})

