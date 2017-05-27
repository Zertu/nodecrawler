const readFile = require('./src/readFile'),
    mysql = require('./src/mysql'),
    writeFile = require('./src/writeFile'),
    json2csv = require('json2csv')

async function a() {
    const file = await readFile('./data/out.txt')
    let result = JSON.parse(file)
    result=result['RECORDS']
    const fields=Object.keys(result[0])
    result = json2csv({ data: result, fields: fields })
    // console.log(result)
    writeFile('./data/result.csv',result,'utf8')
}

a()