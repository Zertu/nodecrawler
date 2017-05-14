const http = require('http'),
    geturl = require('./url'),
    url = geturl('大佬真的好厉害')
http.get(url, res => {
    const {statusCode} = res;
    const contentType = res.headers['content-type'];
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk;
    });
    res.on('end', () => {
        console.log(rawData)
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
})