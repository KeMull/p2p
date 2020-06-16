$(function () {
    $.ajax({
        url: "http://127.0.0.1:8848/getborrowinfo.php",
        type: "GET",
        data: {
            borrowid: sessionStorage.getItem('borrowid')
        },
        dataType: "JSON",
        success: function (data) {
            var myBorrowmoney = Number(data.borrowmoney);
            var myOwnmoney = Number(data.ownmoney);
            var difference = myBorrowmoney - myOwnmoney
            var minbid = Number(data.minbid)
            //渲染 
            $("#userid").text(data.userid)              //用户名
            $("#borrowmoney").text("￥" + Number(data.borrowmoney).toFixed(2))    //借款金额
            $("#interest").text(Number(data.interest).toFixed(2) + "%")          //年利率
            $("#borrowtime").text(data.borrowtime + "月")      //借款期限
            $("#bouns").text("￥" + Number(data.bouns).toFixed(2))                //投标奖励
            $("#repaytype").text((data.repaytype) ? "按月分期" : "按月到期")        //还款方式
            $("#minbid").text("￥" + Number(data.minbid).toFixed(2))              //最小投标
            $("#ownmoney").text("￥" + Number(data.ownmoney).toFixed(2))          //已接金额
            $("#borrowtime").text(data.borrowtime)      //剩余时间
            $("#title").text(data.title)                //借款标题
            $("#info").text(data.info)                  //借款描述



            $("#chargemoney").keyup(function () {
                var cVal = $(this).val();
                if( cVal >= difference ){
                    alert( `最多只能投￥${difference}` )
                    $(this).val( difference )
                }else if( cVal<= minbid){
                    //alert( `最多只能投￥${minbid}` )
                    $(this).val( minbid )
                }else if( difference<=minbid ){
                    $(this).val( difference )
                }
                else{
                    $(this).val( NumberCheck(cVal) )
                }
            })
        }
    })


    

    function NumberCheck(num){
        var str = num;
        var len1 = str.substr(0, 1);
        var len2 = str.substr(1, 1);
        //如果第一位是0，第二位不是点，就用数字把点替换掉
        if (str.length > 1 && len1 == 0 && len2 != ".") {
            str = str.substr(1, 1);
        }
        //第一位不能是.
        if (len1 == ".") {
            str = "";
        }
        //限制只能输入一个小数点
        if (str.indexOf(".") != -1) {
            var str_ = str.substr(str.indexOf(".") + 1);
            if (str_.indexOf(".") != -1) {
                str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
            }
        }
        //正则替换，保留数字和小数点
        str = str.replace(/[^\d^\.]+/g, '')
        //如果需要保留小数点后两位，则用下面公式
        str = str.replace(/\.\d\d$/,'')
        return str;
    }



    //点击 chargemoneyBtn 按钮 开始投资
    $("#chargemoneyBtn").click(function () {
        $.ajax({
            url: "http://127.0.0.1:8848/invest.php",
            type: "POST",
            data: {
                id: localStorage.getItem("uid"),
                borrowid: sessionStorage.getItem("borrowid"),
                chargemoney: $("#chargemoney").val()
            },
            success: function (data) {
                if (data === "ok") {
                    alert("恭喜老板，投资成功")
                    location.href = "/#personalCenter/personal"
                } else if (data === "10001") {
                    alert("余额不足，请前往充值")
                    location.href = "/recharge.html"
                } else {
                    alert("投资失败，请稍后再试")
                }
            }
        })
    })


})