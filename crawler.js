var http = require('http')
var urls=[]
var cheerio = require('cheerio');
var fs =require('fs')
var u=130


	function wir(u){
		http.get('http://www.mmxyz.net/rosi-'+u+'/',function (res) {
		var html = '';
		res.on('data',function(data){
			html+=data;
		})
	
		res.on('end',function(){
			var img = getimg(html);
			img.unshift("<!DOCTYPE html><html><head><meta charset='utf-8'><title></title></head><body>");
			img.push('</body></html>')
			fs.writeFile(''+u+'.html', img, function(args){
				// body
				if(args)throw args;
				if(u<1700){			
				console.log(u)
				return wir(++u)
			}
			else{
				console.log('完成')
			}
			})
		})
	}).on('error',function(e){
		console.log(e)
	})
}

function getimg(html){
	var img=[]
	var $ = cheerio.load(html);
	var dt =  $('dt')

	dt.each(function(i,elem){
		var imglink=$(this).children('a').attr('href')
		var str="<img src='"+imglink+"' />"
		img.push(str)
	})

	return img
}

wir(u)


