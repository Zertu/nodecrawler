module.exports =function gettime() {
    const date = new Date()
    return date.getHours() + ':' + date.getMinutes() + ':'+ date.getSeconds()
}