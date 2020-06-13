//注册验证
$(function () {
    var nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
        'y', 'z'];

    drawCode();
    // 绘制验证码
    var rand;
    function drawCode() {
        var canvas = document.getElementById("verifyCanvas");  //获取HTML端画布
        var context = canvas.getContext("2d");                 //获取画布2D上下文
        context.fillStyle = "cornflowerblue";                  //画布填充色
        context.fillRect(0, 0, canvas.width, canvas.height);   //清空画布
        context.fillStyle = "white";                           //设置字体颜色
        context.font = "25px Arial";                           //设置字体
        rand = new Array();
        var x = new Array();
        var y = new Array();
        for (var i = 0; i < 4; i++) {
            rand[i] = nums[Math.floor(Math.random() * nums.length)]
            x[i] = i * 16 + 10;
            y[i] = Math.random() * 20 + 20;
            context.fillText(rand[i], x[i], y[i]);
        }
        //alert(rand);
        //画3条随机线
        for (var i = 0; i < 3; i++) {
            drawline(canvas, context);
        }

        // 画30个随机点
        for (var i = 0; i < 30; i++) {
            drawDot(canvas, context);
        }
        convertCanvasToImage(canvas)
    }

    // 随机线
    function drawline(canvas, context) {
        context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));             //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
        context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));  //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
        context.lineWidth = 0.5;                                                  //随机线宽
        context.strokeStyle = 'rgba(50,50,50,0.3)';                               //随机线描边属性
        context.stroke();                                                         //描边，即起点描到终点
    }
    // 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
    function drawDot(canvas, context) {
        var px = Math.floor(Math.random() * canvas.width);
        var py = Math.floor(Math.random() * canvas.height);
        context.moveTo(px, py);
        context.lineTo(px + 1, py + 1);
        context.lineWidth = 0.2;
        context.stroke();

    }
    // 绘制图片
    function convertCanvasToImage(canvas) {
        document.getElementById("verifyCanvas").style.display = "none";
        var image = document.getElementById("code_img");
        image.src = canvas.toDataURL("image/png");
        return image;
    }

    // 点击图片刷新
    document.getElementById('code_img').onclick = function () {
        $('#verifyCanvas').remove();
        $('#verify').after('<canvas width="100" height="40" id="verifyCanvas"></canvas>')
        drawCode();
    }




// var pwd = /^[a-zA-Z0-9_-]{4,16}$/;
    //注册表单验证

    var $uname = $("#username");
    var $upwd = $("#pwd");
    var $uemail = $("#email");
    var $ukname = $("#nickname");
    var $verify = $("#verify");

    //定义标杆
    var uFlag = false;
    var pFlag = false;
    var eFlag = false;
    var kFlag = false;
    var vFlag = false;


    //失去检点验证用户名
    $uname.blur(function(){
        var nVal = $uname.val();

        if( nVal ){
            //有值的时候判断合法性
            var name = /^[A-Za-z\.\u4e00-\u9fa5]+$/;

            if(name.test(nVal)){
                //正则表达式验证成功
                $(this).css({border:"1px solid green"})
                //$(this).closest(".form-group").find("span").text("验证成功");


                //ajax验证
                $.ajax({
                    url:"http://127.0.0.1:8848/accrepeat.php",
                    type:"GET",
                    data:{
                        username:nVal
                    },
                    success:function(data){
                        if( data == "fail" ){
                            $uname.closest(".form-group").find(".img-show").remove();
                            $uname.closest(".form-group").find("span").text("此用户名太受欢迎").css({color:"red"});
                            $uname.css({border:"1px solid red"});

                            uFlag = false;
                        }else{
                            $uname.closest(".form-group").find("span").text("");
                            $uname.css({border:"1px solid green"});
                            $uname.closest(".form-group").append('<img class="img-show" src="../../images/成功.png"/>');

                            uFlag = true;
                        }
                        
                    }
                })

            }else{
                //失败
                $uname.css({border:"1px solid red"});
                $uname.closest(".form-group").find(".img-show").remove();
                $uname.closest(".form-group").find("span").text("请输入合法用户名：中文 && 英文字符").css({color:"red"});

                uFlag = false;
            }

        }else{
            //没有值的时候
            $uname.css({border:"1px solid red"});
            $uname.closest(".form-group").find(".img-show").remove();
            $uname.closest(".form-group").find("span").text("请输入用户名").css({color:"red"});

            uFlag = false;
        }
    }).keyup(function(){
        testing($uname,"用户名")
    })


    //密码验证
    var ppFlag=false;   //定义一个变量来接受验证返回的返回值
    $upwd.blur(function(){
        //获取密码框的val值
        var pVal = $upwd.val();
        ppFlag = regChecking($upwd,pVal,/^[a-zA-Z0-9]{4,12}$/,"的密码：数字或大小写字母，4-12位","密码",pFlag)
    }).keyup(function(){
        testing($upwd,"密码")
    })


    //邮箱验证
    var eeFlag=false;  //定义一个变量来接受验证返回的返回值
    $uemail.blur(function(){
        var eVal = $uemail.val();
        eeFlag = regChecking($uemail,eVal,/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,"的昵称：中文或英文","昵称",eFlag);

    }).keyup(function(){
        testing($uemail,"邮箱")
    })


    //昵称验证
    var kkFlag=false;  //定义一个变量来接受验证返回的返回值
    $ukname.blur(function(){
        var kVal = $ukname.val();
        kkFlag = regChecking($ukname,kVal,/^[A-Za-z\.\u4e00-\u9fa5]+$/,"的昵称：中文或英文","昵称",kFlag)
    }).keyup(function(){
        testing($ukname,"昵称")
    })

    //验证码
    $verify.blur(function(){
        var vVal = $verify.val();
        var randVal = rand.join("");

        //判断是否输入验证码
        if(vVal){

            //判断验证码是否正确
            if(vVal == randVal){
                //正确
                $verify.css({border:"1px solid green"});
                //提示信息文本
                $verify.closest(".form-group").find("span").text("");
                //成功状态样式
                $verify.closest(".form-group").append('<img class="img-show" src="../../images/成功.png"/>');

                vFlag = true;

            }else{
                //失败
                $verify.css({border:"1px solid red"});
                $verify.closest(".form-group").find(".img-show").remove();
                $verify.closest(".form-group").find("span").text("验证码错误：区分大小写").css({color:"red"});

                //刷新验证码
                $('#verifyCanvas').remove();
                $('#verify').after('<canvas width="100" height="40" id="verifyCanvas"></canvas>');
                drawCode();

                vFlag = false;
            }
        }else{
            //没有值
            $verify.css({border:"1px solid red"});
            $verify.closest(".form-group").find(".img-show").remove();
            $verify.closest(".form-group").find("span").text("请输入验证码").css({color:"red"});


            vFlag = false;
        }
    }).keyup(function(){
        testing($verify,"验证码")
    })

    //验证函数
    function regChecking(obj,val,reg,regText,text,flag){
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
                obj.closest(".form-group").find("span").text("请输入合法"+regText+"").css({color:"red"});

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



    //当勾选了同意  才能点击注册按钮
    $( "#invalidCheck2" ).click(function(){

        if( $( "#invalidCheck2" ).prop("checked") === true ){

            $( ".rebtn" ).css( {background:"#c69b5f"} );
            $( ".rebtn" ).prop({disabled:false});
        }else{

            $( ".rebtn" ).css( {background:"#ccc"} );
            $( ".rebtn" ).prop({disabled:true})
        }
    })


    //点击提交按钮进行ajax 验证
    $( ".rebtn" ).click(function(){
        //判断不成功时
        if( !(uFlag && ppFlag && eeFlag && kkFlag && vFlag) ){

            //去触发失去焦点事件
            $uname.trigger("blur");
            $upwd.trigger("blur");
            $uemail.trigger("blur");
            $ukname.trigger("blur");
            $verify.trigger("blur");
            return false;
        }
        //发送ajax验证
        $.ajax({
            url:"http://127.0.0.1:8848/reg.php",
            type:"POST",
            data:{
                username:$uname.val(),
                pwd:$upwd.val(),
                email:$uemail.val(),
                nickname:$ukname.val()
            },
            success:function(msg){
                if( msg == 'fail' ){
                    alert("恭喜你注册失败")
                }else{
                    alert("恭喜你"+$uname.val());
                    location.href = "./login.html";
                }
            }

        })

    })

})