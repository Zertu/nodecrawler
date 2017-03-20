const http = require('http'),
		cheerio = require('cheerio'),
		fs = require('fs')
let i = 0,
		index = 130,
		url = ''
getimg(index)

/**
 * 获取html字符串内的src地址
 *
 * @param {string} html字符串
 * @returns {string} src地址
 */
function getsrc(html) {
		let $ = cheerio.load(html),
				src = [],
				img = $('img')
		img.each(function () {
				src.push($(this).attr('src'))
		})
		return src
}

/**
 * 下载单个图片
 *
 * @param {string} temp 图片链接数组
 * @param {number} i 当前图片的序列号
 * @param {number} index 网页的序列号
 */

function downloadjpg(temp, i, index) {
		fs.mkdir(index + '', function () {
						if (i < temp.length) {
								http.get(temp[i], res => {
										let binImage = ''
										res.setEncoding('binary')
										res.on('data', chunk => {
												binImage += chunk
										})

										res.on('end', () => {
												if (!binImage) {
														console.log('image data is null')
														return null
												} else {
														fs.writeFile('' + index + '/' + i + '.jpg', binImage, 'binary', err => {
																if (err) 
																		throw err
																console.log(i)
																return downloadjpg(temp, ++i, index)
														})
												}
										})
								})
						} else {
								console.log('完成')
								return getimg(++index)
						}
				})

}

/**
 * 读取图片
 *
 * @param {number} index 网页的序列号
 */
function getimg(index) {
		if (index < 1801) {
				fs.readFile('' + index + '.html', 'utf-8', (err, data) => {
						if (err) {
								console.log(err)
						} else {
								let temp = getsrc(data)
								downloadjpg(temp, i, index)
						}
				})
		} else {
				console.log('读取出错')
		}
}
module.exports = {
		getimg: getimg
}