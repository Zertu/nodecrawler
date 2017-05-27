// 固定地址部分：http://s.weibo.com/weibo/
// 关键字二次UTF-8编码：%25E7%25A9%25BA%25E6%25B0%2594%25E6%25B1%25A1%25E6%259F%2593
// 排序为“实时”：xsort=time 搜索地区：region=custom:11:1000
// 搜索时间范围：timescope=custom:2013-07-02-2:2013-07-09-2 可忽略项：Refer=g 显示类似微博：nodup=1
// 注：这个选项可多收集微博，建议加上。默认不加此参数，省略了部分相似微博。 某次请求的页数：page=1
module.exports = function (keyword, options) {
    const baseUrl = 'http://s.weibo.com/weibo/',
        key = encodeURI(encodeURI(keyword)),
        defaultOptions = {
            timescope: "custom:2013-07-02-2:2013-07-09-2",
            nodup: 1
        }
    let final = ''
    for (i in defaultOptions) {
        final += '&' + i + '=' + defaultOptions[i]
    }

    return baseUrl + key + final

}