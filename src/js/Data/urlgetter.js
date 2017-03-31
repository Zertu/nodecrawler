const http = require('http'),
    cheerio = require('cheerio'),
    async = require('async'),
    fs = require('fs'),
    mysql = require('./mysql.js'),
    getTime=require('./getTime')
    series = require('./series'), {observable, autorun, computed} = require('mobx'),
    broadcastarr = ['/announcement.aspx#2', '/showtopic-6363.html', '/showtopic-12543.html', '/showtopic-51813.html', '/showtopic-4200.html']

let pagenumber = 171,
    hrefarr = observable([]),
    count = computed(() => hrefarr.length)




function getallurl() {
    return new Promise(async(resolve, reject) => {
        let result,timer=setInterval(() =>     fs.readFile('timeline.txt','utf-8', async(err,data) => {
            if (data.length) {
                let arr = data.split('，')
                arr.push([
                    getTime(), count.get()
                ])
               await  writeFile('timeline.txt', arr.join('，'))
            } else {
              await  writeFile('timeline.txt', [
                    getTime().toString(), count.get()
                ].toString())
            }
        }), 1000)
        await writeFile('timeline.txt', '')
        
        report = autorun(() => timer)
        result = await series(pagenumber, async time => {
            hrefarr[time] = []
            let url = 'http://bbs.tech-food.com/showforum-17-' + (time) + '.html'
            await http.get(url, res => {
                // console.log('爬取中..................................................当前进度为' +
                // (time * 100 / 171).toFixed(2) + '%')
                if (res.statusCode === 200) {
                    let html = ''
                    res.on('data', data => {
                        html += data
                    })
                    res.on('end', () => {
                        let $ = cheerio.load(html)
                        $('table')
                            .find('.subject a')
                            .each(function () {
                                let isbroadcast = false
                                let href = $(this).attr('href')
                                for (let i = 0; i < broadcastarr.length; i++) {
                                    if (href == broadcastarr[i]) {
                                        isbroadcast = true
                                    }
                                }
                                if (!isbroadcast) 
                                    hrefarr[time].push('http://bbs.tech-food.com' + href + '`')
                                report()
                            })
                    })
                } else {
                    console.error('访问' + url + '时失败。状态码为' + res.statusCode)
                }
            })
        })
        timer=null
        if (result) {
            try {
                let err = await writeFile('urls.txt', hrefarr)
            } catch (e) {
                reject(e)
            }
            resolve(hrefarr)
        }
    })
}

function writeFile(Filename, context) {
    return new Promise((resolve, reject) => {
        fs.writeFile(Filename, context, err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

module.exports = {
    start: getallurl
}