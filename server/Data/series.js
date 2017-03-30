exports=/**
 * async循环控制
 * 
 * @param {Number} looptimes 要循环的次数
 * @param {Function} func 执行循环时要进行的函数
 * @param {Function} [final=function(){}] 完成后的回调
 * @param {number} [delay=200] 
 * @returns 
 */
module.exports=function series(looptimes,func,delay=200) {

  if(looptimes>0) {
    async(looptimes,delay, function() {
      func(looptimes)
      series(--looptimes,func,final,delay)
    })
  } else {
      return
    }
}

function async(arg, delay,callback) {
  setTimeout(function() { 
      callback()
   }, delay);
}