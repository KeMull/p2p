$( function () {
    //页面加载时发送ajax验证来渲染页面

    $.ajax({
        url:"http://127.0.0.1:8848/getuserinfo.php",
        data:{
            id:localStorage.getItem("uid")
        },
        type:"GET",
        dataType:"JSON",
        success:function(data){
            drawPie(data.totalmoney,data.usablemoney,data.blockedmoney)
            for( var key in data ){
                $('#'+key).text(data[key])
            }
        }
    })



    function drawPie(totalmoney,usablemoney,blockedmoney) {
        var myChart = echarts.init(document.getElementById("echartsBox"));
        var option = {
            title: {
                text: '资产占比统计',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                data: ['总金额', '可用金额', '冻结金额']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: totalmoney, name: '总金额' },
                        { value: usablemoney, name: '可用金额' },
                        { value: blockedmoney, name: '冻结金额' }

                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
})