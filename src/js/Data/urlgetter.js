const http = require('http'),
		cheerio = require('cheerio'),
		async = require('async'),
		fs = require('fs'),
		mysql = require('./mysql.js'),
		series = require('./series')
broadcastarr = ['/announcement.aspx#2', '/showtopic-6363.html', '/showtopic-12543.html', '/showtopic-51813.html', '/showtopic-4200.html']

let pagenumber = 171,
		hrefarr = []

function getallurl() {
		return new Promise(async(resolve, reject) => {
				let result
				result = await series(pagenumber, async time => {
						hrefarr[time] = []
						let url = 'http://bbs.tech-food.com/showforum-17-' + (time) + '.html'
						await http.get(url, res => {
								console.log('爬取中..................................................当前进度为' + (time * 100 / 171).toFixed(2) + '%')
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
														})
										})
								} else {
										console.error('访问' + url + '时失败。状态码为' + res.statusCode)
								}
						})
				})
				if (result) {
						try {
								let err = await fs.writeFile('urls.txt', hrefarr)
						} catch (e) {
								reject(e)
						}
						console.log('ok')
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