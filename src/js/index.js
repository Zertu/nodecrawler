const urlgetter = require('../Data/urlgetter'),
    fs = require('fs')
readurl = require('../Data/readurl')
window.onload = () => {
    document
        .getElementById('start')
        .addEventListener('click', e => {
            readurl.readurl(data => {
                readurl.pagereader(data)
            })

        }, false)
}