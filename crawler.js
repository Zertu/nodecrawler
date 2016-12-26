const http = require('http'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	async = require('async')

let pagenumber = -1


function wir() {
	async.whilst(
		() => {
			return pagenumber < 170
		},
		fn => {
			pagenumber++
			let url ='http://bbs.tech-food.com/showforum-17-' + pagenumber + '.html'
			http.get(url, res => {
				if(res.statusCode===200){
					let html = ''
				res.on('data', function (data) {
					html += data;
				})
				res.on('end', function () {
					let $ = cheerio.load(html)
					console.log($('.separation').nextAll().html())
				})
				setTimeout(fn, 500)
				}else{
					console.error('访问'+url+'时失败。状态码为'+res.statusCode)
				}
				
			})
		},
		err => {
			if(err){
				console.log(err)
			}
			else{
	console.log('成功')
			}
		}
	)
}

module.exports = {
	start: wir
}