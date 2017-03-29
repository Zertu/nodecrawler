const fs = require('fs'),
    http = require('http'),
    async = require('async'),
    cheerio = require('cheerio'),
    mysqlcon = require('./mysql.js'),
    series = require('./series')

function readFile(fileName, encode) {
    return new Promise( (resolve, reject)=> {
        fs
            .readFile(fileName, encode, (error, data)=> {
                if (error) 
                    reject(error)
                resolve(data)
            });
    });
};

/**
 * 读取txt中的url
 *
 * @param {Function} fn
 */
async function readurl() {
    let data = await readFile('./urls.txt', 'utf-8')
    return data.split(',')
}

/**
 * 读取url中的html
 *
 * @param {Array} url中的数据
 */
async function pagereader(urldata) {
    let count = urldata.length
    await series(urldata.length, times => {
        http.get(urldata[count - times], res => {
            if (res.statusCode === 200) {
                let html = ''
                res.on('data', function (data) {
                    html += data;
                })
                res.on('end', function () {
                    let $ = cheerio.load(html)
                    let title = $('.ts')
                        .children()
                        .first()
                        .attr('title')
                    $('.t_msgfont').each(function (index) {
                        writeintoSql(urldata[count - times], title, index, $(this).text().trim())
                        if (index === $('.t_msgfont').length - 1) {
                            return
                        }
                    })
                })
            } else {
                console.error(res.statusCode)
            }
        })
    }, () => {
        console.log('完成')
    })
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
    let sqlstr = 'insert into Post (url,title,floor,content) values ("' + url + '","' + encode(title) + '",' + floor + ',"' + encode(content) + '")'
    mysqlcon.sqlquery(sqlstr, rows => {
        if (rows) {
            console.log(sqlstr)
            // console.log('写入'+url+'成功')
        } else {
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
function encode(str) {
    let b = str.replace(/\'/g, '’')
    let s = b.replace(/\"/g, "“") //替换半角单引号为全角单引号
    return s.replace(/\\/g, ' ')
}

module.exports = {
    readurl: readurl,
    pagereader: pagereader
}
