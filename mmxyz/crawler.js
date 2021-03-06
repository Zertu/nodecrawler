const http = require('http'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	getimg = require('./crawlerv2')
let urls = [],
	u = 130 //因为从130只有才有数据

wir(u)

/**
 * 这个方法是用来爬取每个网址html内容
 * 
 * @param {number} 传入url的位置
 */
function wir(u) {
	http.get('http://www.mmxyz.net/rosi-' + u + '/', res => {
		if (res.statusCode == 200) {
			let html = ''
			res.on('data', data => {
				//获取爬到的数据
				html += data
			})
			res.on('end', () => {
				let img = getimgsrc(html)
				//拼接html字符串
				img.unshift("<!DOCTYPE html><html><head><meta charset='utf-8'><title></title></head><body>")
				img.push('</body></html>')
				//写入html进行下一步爬取
				fs.writeFile('' + u + '.html', img, err => {
					if (err) throw err
					console.log(u)
					//递归
					return wir(++u)
				})
			})
		}
		else if(res.statusCode == 404){
			getimg()
		}
		 else {
			console.log('访问http://www.mmxyz.net/rosi-' + u + '/失败')
			setTimeout(wir(++u), 50000);
		}
	}).on('error', function (e) {
		console.log(e)
	})
}

/**
 * 爬取每张页面中所有img标签的src
 * 
 * @param {string} html字符串
 * @returns 
 */
function getimgsrc(html) {
	//cherrio获取全部的图片地址
	let img = []
	, $ = cheerio.load(html)
	, dt = $('dt')
	dt.each(function (i, elem) {
		let imglink = $(this).children('a').attr('href')
		, str = "<img src='" + imglink + "' />"
		img.push(str)
	})

	return img
}