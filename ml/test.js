const readFile = require('./src/readFile'),
    mysql = require('./src/mysql'),
    writeFile = require('./src/writeFile')

async function a() {
    const file = await readFile('./data/out.txt')
    let arr = JSON.stringify(file)
    writeFile('./data/result.json',JSON.stringify(arr))
}

a()