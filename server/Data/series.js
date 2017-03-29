exports=module.exports=function series(looptimes,func,delay=200,final=function(){}) {
  if(looptimes>0) {
    async(looptimes,delay, function() {
      func(looptimes)
      return series(--looptimes,func,delay)
    })
  } else {
    return final()
  }
}

function async(arg, delay,callback) {
  setTimeout(function() { 
      callback()
   }, delay);
}