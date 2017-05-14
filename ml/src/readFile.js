const fs=require('fs')
module.exports=function (url){
    return new Promise((resolve, reject) => {
      fs.readFile(url,'utf-8',(err,data)=>{
          if(err)reject(err)
          resolve(data)
      })  
    })
}