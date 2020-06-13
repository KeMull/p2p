$(function () {

    //选项卡

    $('.list li').click(function () {
        var index = $(this).index();

        $(this).removeClass('active').addClass('active').siblings('li').removeClass('active');

        $('.listBox>div').eq(index).show().siblings('div').hide()
    })



    //ajax接口验证
    var $bankcode = $("#bankcode");         //银行
    var $chargemoney = $("#chargemoney");   //充值金额
    var $explain = $("#explain");           //说明

    //点击提交按钮  发送ajax 验证
    $("#RechargeBtn").click( function(){
        

        $.ajax({
            url:"http://127.0.0.1:8848/charge.php",
            type:"POST",
            data:{
                id:localStorage.getItem('uid'),
                bankcode:$bankcode.val(),
                chargemoney:$chargemoney.val()
            },
            success:function(data){
                if( data === "ok" ){
                    alert("恭喜您，充值成功");
                    location.href="/#personalCenter/personal"
                }else{
                    alert("充值失败，请稍后再试")
                }
            }
        })
    } )


})