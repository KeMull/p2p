$(function () {

    //表单验证
    var $nickname = $("#nickname")  //昵称
    var $phone = $("#phone");       //电话号码
    var $email = $("#email");       //邮箱
    //var $education = $("#education")//个人学历
    //var $income = $("#income");   //个人收入
    var $address = $("#address");   //联系地址


    var nFlag = false;
    var pFlag = false;
    var eFlag = false;
    var aFlag = false;

    //正则表达式验证
    //昵称
    var nnFlag;
    $nickname.blur( function() {
        var nVal = $nickname.val();
        nnFlag = regChecking($nickname,nVal,/^\w+$/,"昵称",nFlag)
    }).keyup( function() {
        testing($nickname,"昵称")
    })

    //电话号码
    var ppFlag;
    $phone.blur(function(){
        var pVal = $phone.val();
        ppFlag = regChecking($phone,pVal,/^1[34578]\d{9}$/,"手机号",pFlag)
    }).keyup( function() {
        testing($nickname,"手机号")
    })

    //邮箱
    var eeFlag;
    $email.blur(function(){
        var eVal = $email.val();
        eeFlag = regChecking($email,eVal,/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,"邮箱",eFlag)
    }).keyup( function() {
        testing($nickname,"邮箱")
    })

    //地址
    var aaFlag;
    $address.blur(function(){
        var aVal = $address.val();
        aFlag = regChecking($address,aVal,/^\w+$/,"地址",aFlag)
    }).keyup( function() {
        testing($nickname,"地址")
    })


    //验证函数
    function regChecking(obj,val,reg,text,flag){
        //obj  dom节点对象
        //val  dom节点value值
        //reg  正则表达式
        //regText  正则验证失败提示文本
        //text 错误提示信息   

        if( val ){
            //有值的时候判断合法性
            var Reg = reg;

            if(Reg.test(val)){      //正则表达式验证成功
                
                //改变输入框的样式
                obj.css({border:"1px solid green"});
                //提示信息文本
                obj.closest(".form-group").find("span").text("");
                //成功状态样式
                obj.closest(".form-group").append('<img class="img-show" src="../../images/成功.png"/>');

                flag = true;
                return flag;  //返回函数的标杆值
            }else{
                //失败
                obj.css({border:"1px solid red"})
                obj.closest(".form-group").find(".img-show").remove();
                obj.closest(".form-group").find("span").text("请输入合法的"+text+"").css({color:"red"});

                flag = false;
                return flag;  //返回函数的标杆值
            }

        }else{
            //没有值的时候
            obj.css({border:"1px solid red"})
            obj.closest(".form-group").find(".img-show").remove();
            obj.closest(".form-group").find("span").text("请输入"+text+"").css({color:"red"});

            flag = false;
            return flag;   //返回函数的标杆值
        }
    }

    //键盘事件验证函数
    function testing(obj,text){
        var len = obj.val().length;
        if(len>0){
            obj.closest(".form-group").find("span").text("");
            obj.css({border:"1px solid #ccc"});
        }else{
            obj.closest(".form-group").find("span").text("请输入"+ text + "").css({color:"red"});
            obj.css({border:"1px solid red"})
        }
    }


    $("#submitBtn").click(function () {


        if( !(nnFlag && ppFlag && eeFlag && aaFlag) ){
            //去触发失去焦点事件
            $nickname.trigger("blur");
            $phone.trigger("blur");
            $email.trigger("blur");
            $address.trigger("blur");
            return false;
        }


        //判断有值验证成功才提交，不成功不执行ajax验证


        //发送ajax接口验证
        $.ajax({
            url: "http://127.0.0.1:8848/updateuser.php",
            type: "POST",
            data: {
                id: localStorage.getItem("uid"),
                nickname: $nickname.val(),
                email: $email.val(),
                phone: $phone.val()
            },
            success: function (data) {
                if (data === "ok") {
                    alert("恭喜你修改成功")
                    location.href = "#personalCenter/personal"
                } else {
                    alert("更新失败，请稍后再试")
                }
            }
        })
    })

})



