const http = require('http'),
	cheerio = require('cheerio'),
	async = require('async'),
	fs=require('fs'),
	mysql = require('./mysql.js')
broadcastarr = ['/announcement.aspx#2',
	'/showtopic-6363.html',
	'/showtopic-12543.html',
	'/showtopic-51813.html',
	'/showtopic-4200.html'
]

let pagenumber = -1,
	hrefarr = []


function getallurl() {
	async.whilst(
		() => {
			return pagenumber < 170
		},
		fn => {
			pagenumber++
			hrefarr[pagenumber] = []
			let url = 'http://bbs.tech-food.com/showforum-17-' + pagenumber + '.html'
			http.get(url, res => {
				console.log('爬取中..................................................当前进度为' + (pagenumber * 100 / 171).toFixed(2) + '%')
				if (res.statusCode === 200) {
					let html = ''
					res.on('data', function (data) {
						html += data;
					})
					res.on('end', function () {
						let $ = cheerio.load(html)
						$('table').find('.subject a').each(function () {
							let isbroadcast = false
							let href = $(this).attr('href')
							for (let i = 0; i < broadcastarr.length; i++) {
								if (href == broadcastarr[i]) {
									isbroadcast = true
								}
							}
							if (!isbroadcast) hrefarr[pagenumber].push('http://bbs.tech-food.com' + href+'`')
						})

					})
					setTimeout(fn, 500)
				} else {
					console.error('访问' + url + '时失败。状态码为' + res.statusCode)
				}

			})
		},
		err => {
			if (err) {
				console.log(err)
			} else {
				console.log('成功')

				fs.writeFile('urls.txt', hrefarr, err => {
					if (err) {
						console.error(err)
					} else {
						console.log('成功')
					}
				})
				return hrefarr
			}
		}
	)
}

module.exports = {
	start: getallurl
}