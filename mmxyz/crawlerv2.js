const http = require('http'),
	cheerio = require('cheerio'),
	fs = require('fs')
let i = 0,
	index = 130,
	url = ''
getimg(index)

function getsrc(html) {
	let $ = cheerio.load(html)
	let src = []
	let img = $('img')
	img.each(function () {
		src.push($(this).attr('src'))
	})
	return src
}

function downloadjpg(temp, i, index) {
	fs.mkdir(index + '', function () {
		if (i < temp.length) {
			http.get(temp[i], function (res) {
				let binImage = ''
				res.setEncoding('binary')
				res.on('data', function (chunk) {
					binImage += chunk
				})

				res.on('end', function () {
					if (!binImage) {
						console.log('image data is null')
						return null
					} else {
						fs.writeFile('' + index + '/' + i + '.jpg', binImage, 'binary', function (err) {
							if (err) throw err
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

function getimg(index) {
	if (index < 1801) {
		fs.readFile('' + index + '.html', 'utf-8', function (err, data) {
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

module.exports={
	getimg:getimg
}