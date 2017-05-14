const readFile = require('./src/readFile'),
    mysql = require('./src/mysql'),
    writeFile = require('./src/writeFile')

async function a() {
    const file = await readFile('./data/test.txt')
    let arr = file.split("`'`,` `'`")
    arr = arr.map(i => {
        let a = i.split('`:` `')
        return a.map(j => j.split('`').join(''))
    })
    arr[0][0] = '1'
    arr[arr.length - 1][1] = 'positive'
    return arr
}

a().then(arr => {
    arr = arr.map(_ => ({index: _[0], result: _[1]}))
    console.log(arr)
    writeFile('a.json', JSON.stringify(arr))
})