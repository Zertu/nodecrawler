var http = require('http')
var url = ''
var cheerio = require('cheerio');
var fs =require('fs')
var i = 0;
var index = 130;

cccc(index)
	function getsrc(html){
		var $=cheerio.load(html)
		var src = []
		var img = $('img')
		img.each(function() {
			var temp =$(this).attr('src')
			src.push(temp)
		});
		return src;
	}
 	function downloadjpg(temp,i,index){
 		fs.mkdir(index+'',function(){
 				 		if(i<temp.length){
 					http.get(temp[i],function(res){
 					var binImage =''
 					res.setEncoding('binary');
 					res.on('data', function(chunk){
				   	binImage += chunk;
				 	 });

				 	res.on('end', function(){
				    if (!binImage) {
				    console.log('image data is null');
				    return null;
				    }
					else{
						fs.writeFile(''+index+'/'+i+'.jpg',binImage,'binary',function(err){
							if(err)throw err;
							console.log(i)
							return downloadjpg(temp,++i,index)
						})
					}
		})
 		})}
 		else{
 			console.log('完成')
 			return cccc(++index)
 		}
 		})

 	}
 	function cccc(index){
 		if(index<1801){
 			 		fs.readFile(''+index+'.html','utf-8', function(err,data){
					if(err){
						console.log(err)
					}
					else{
					var temp =getsrc(data)
					downloadjpg(temp,i,index)
					}
				})
 		}
 		else{
 			console.log('读取出错')
 		}
 	}