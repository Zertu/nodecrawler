exports=/**
 * async循环控制
 * 
 * @param {Number} looptimes 要循环的次数
 * @param {Function} func 执行循环时要进行的函数
 * @param {number} [delay=200] 
 * @returns 
 */
module.exports=function series(looptimes,func,delay=200) {
  let arr=[]
  for(let i =0;i<looptimes;i++){
    arr.push(new Promise((resolve,reject)=>{
    (setTimeout(()=> {
      resolve (func(i))
    }, i*delay))
  }))
}
  return Promise.all(arr)
}

