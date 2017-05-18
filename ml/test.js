const readFile = require('./src/readFile'),
    mysql = require('./src/mysql'),
    writeFile = require('./src/writeFile')

async function a() {
    const file = await readFile('./data/out.txt')
    let result = JSON.parse(file)
    result=result['RECORDS']
    writeFile('./data/result.json',JSON.stringify(result))
}

a()