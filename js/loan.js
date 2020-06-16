$(function () {
    //从会话存储里拿数据
    var index = sessionStorage.getItem("index");
    //判断 是什么贷款类型 改变对应的样式
    switch (index) {
        case "1":
            $("#titleBtn").text("信用标").addClass("bg-success");
            break;

        case "2":
            $("#titleBtn").text("车贷标").addClass("bg-warning");
            break;

        case "3":
            $("#titleBtn").text("房贷标").addClass("bg-primary");
            break;
    }



    //获取节点
    var $borrowmoney = $("#borrowmoney")    //借款金额
    var $interest = $("#interest")          //借款利息
    var $borrowtime = $("#borrowtime")      //借款期限
    var $repaytype = $(".repaytype:checked")//还款方式
    var $minbid = $("#minbid")              //最小投标
    var $bouns = $("#bouns")                //投标奖金
    var $days = $("#days")                  //投标天数
    var $title = $("#title")                //借款标题
    var $info = $("#info")                  //借款描述


    //ajax验证
    $("#submitBtn").click( function() {
        
        $.ajax({
            url:"http://127.0.0.1:8848/borrow.php",
            type:"POST",
            data:{
                acc:localStorage.getItem("username"),
                borrowmoney:$borrowmoney.val(),
                interest:$interest.val(),
                borrowtime:$borrowtime.val(),
                repaytype:$(".repaytype:checked").val(),
                minbid:$minbid.val(),
                bouns:$bouns.val(),
                days:$days.val(),
                title:$title.val(),
                info:$info.val()
            },
            success:function(data){
                if( data === "ok" ){

                    alert("借款成功");
                    location.href = "/#personalCenter/personal"
                }else{

                    alert("借款失败")
                }
            }
        })
    })
})