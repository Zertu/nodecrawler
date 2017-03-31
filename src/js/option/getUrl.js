module.exports = {
    title: {
        text: '爬取速度'
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category'
    },
    dataZoom: [{
            startValue: ''
        }, {
            type: 'inside'
        }],
    yAxis: {
        splitLine: {
            show: false
        }
    },
    series: [
        {
            name: '数量',
            type: 'line',
            smooth: true,
            data: []
        }
    ]
}