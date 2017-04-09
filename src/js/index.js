const fs = require('fs'),
    echarts = require('echarts'), {start} = require('./src/js/Data/urlgetter'), {readurl, pagereader} = require('./src/js/Data/readurl'),
    getUrl = require('./src/js/option/getUrl'),
    getTime = require('./src/js/Data/getTime')
window.onload = () => {
    const chart = echarts.init(document.getElementById('data'))
    const startBottom = document.getElementById('start')
    startBottom.addEventListener('click', async function () {
        let result
        try {
            let timer = setInterval(async() => {
                let data = await readFile('timeline.txt')
                data = data.split('，')
                getUrl.series[0].data = data.map((i, index) => i.split(',')[1] - (data[index - 1]
                    ? data[index - 1].split(',')[1]
                    : 0))
                getUrl.xAxis.data = data.map(i => i.split(',')[0])
                getUrl.dataZoom[0].startValue = getTime().toString()
                chart.setOption(getUrl)
            }, 5000)
            result = await start()
            clearInterval(timer)
            timer = null
        } catch (e) {}
        if (result.length) {
            startBottom.value='读取URL'
            try {
                let data = await readurl()
            startBottom.value='爬取评论'
           await pagereader(data)
           startBottom.value='爬取完毕'
           startBottom.disabled=true
            } catch (e) {
                console.log(e)
            }
        } else {
            chart.hideLoading()
        }
    }, false)
}

function readFile(filename) {
    return new Promise((res, rej) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) {
                rej(err)
            }
            res(data)
        })
    })
}