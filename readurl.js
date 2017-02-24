const fs = require('fs'),
    http = require('http'),
    async = require('async'),
    cheerio = require('cheerio'),
    mysqlcon = require('./mysql.js')

let readurl = (fn) => {
    fs.readFile('urls.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            fn(data.split(','))
        }
    })
}

let pagereader = (urldata) => {
    let count = -1
    async.whilst(
        () => {
            return count < urldata.length - 1
        },
        fn => {
            count++
            http.get(urldata[count], res => {
                console.log('爬取' + urldata[count] + '中..................................................当前进度为' + (count * 100 / urldata.length).toFixed(2) + '%')
                if (res.statusCode === 200) {
                    let html = ''
                    res.on('data', function (data) {
                        html += data;
                    })
                    res.on('end', function () {
                        let $ = cheerio.load(html)
                        let title = $('.ts').children().first().attr('title')
                        console.log(title)
                        $('.t_msgfont').each(function (index) {
                            writeintoSql(urldata[count], title, index, $(this).text().trim())
                            if(index===$('.t_msgfont').length-1){
                                 setTimeout(fn, 1)
                            }
                        })
                    })
                } else {
                    console.log(res.statusCode)
                    setTimeout(fn, 1)
                }
            })
        },
        err => {
            if (err) {
                console.error(err)
            } else {
                console.log('完成')
            }
        }
    )
}


function writeintoSql(url, title, floor, content, fn) {
    let sqlstr = 'insert into foodtech (url,title,floor,content) values ("' + url + '","' + title + '",' + floor + ',"' + encode(content) + '")'
    mysqlcon.sqlquery(sqlstr, rows => {
        if (rows) {
            console.log('写入'+url+'成功')
        }else{
            console.log('出错了\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
        }
    })
}

function encode(str){
    return str.replace(/\"/g,"“");//替换半角单引号为全角单引号
}


module.exports = {
    readurl: readurl,
    pagereader: pagereader,
}