const fs = require('fs'),
    http = require('http'),
    async = require('async'),
    cheerio = require('cheerio'),
    mysqlcon = require('./mysql.js')

/**
 * 读取txt中的url
 * 
 * @param {Function} fn 
 */
function readurl (fn) {
    fs.readFile('urls.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            fn(data.split(','))
        }
    })
}

/**
 * 读取url中的html
 * 
 * @param {any} url中的数据 
 */
function pagereader(urldata)  {
    let count = -1
    async.whilst(
        () => {
            return count < urldata.length - 1
        },
        fn => {
            count++
            http.get(urldata[count], res => {
                if (res.statusCode === 200) {
                    let html = ''
                    res.on('data', function (data) {
                        html += data;
                    })
                    res.on('end', function () {
                        let $ = cheerio.load(html)
                        let title = $('.ts').children().first().attr('title')
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


/**
 * 将收集到的信息写入数据库中
 * 
 * @param {String} url地址
 * @param {String} title标题
 * @param {number} floor 楼层数
 * @param {String} content 评论内容
 */
function writeintoSql(url, title, floor, content) {
    let sqlstr = 'insert into Post (url,title,floor,content) values ("' + url + '","' +encode(title) + '",' + floor + ',"' + encode(content) + '")'
    mysqlcon.sqlquery(sqlstr, rows => {
        if (rows) {
            console.log(rows.insertId)
            // console.log('写入'+url+'成功')
        }else{
            console.log('出错了')
        }
    })
}

/**
 * 替换字符串中的' " \
 * 
 * @param {String} str 需要转义的字符串
 * @returns 
 */
function encode(str){
    let b =str.replace(/\'/g,'’')
    let s = b.replace(/\"/g,"“")//替换半角单引号为全角单引号
     return s.replace(/\\/g,' ')
}


module.exports = {
    readurl: readurl,
    pagereader: pagereader,
}

                                                  