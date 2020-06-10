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




    //验证 验证码是否正确

    //ajax 接口验证

    //验证登录
    var flag = false;
    //验证用户名
    $('#login-btn').click(function () {

        var my = $(this);
        var userVal = $("#username").val();
        var pwdVal = $("#userpwd").val()
        var useryz = $("#verify").val()

        if (userVal && pwdVal && useryz) {

            //有值的时候 正则表达式验证用户名合法性
            var name = /^[A-Za-z\.\u4e00-\u9fa5]+$/;
            var pwd = /^[a-zA-Z0-9_-]{4,16}$/;

            //验证码验证
            //flagVal()

            if (name.test(userVal) && pwd.test(pwdVal)) {    //正则表达式验证成功时
                //ajax验证
                $.ajax({
                    url: "http://127.0.0.1:8848/login.php",
                    type: "post",
                    data: {
                        username: userVal,
                        pwd: pwdVal
                    },
                    success: function (msg) {
                        //验证接口的成功 && 失败状态
                        if (msg === 'fail') {
                            //验证失败
                            alert('你的用户名或密码错误')
                        } else {
                            //用户名密码验证成功 在判断验证码
                            //把用户名和用户id存储在本地存储
                            var a = $('#verify').val();
                            var b = rand.join("");
                            if (a == b) {
                                //验证码一致
                                location.href = "../index.html";
                                localStorage.setItem('username', userVal);
                                localStorage.setItem('uid', msg);
                            } else {
                                //验证码不一致
                                $('#verify').siblings('span').hide();
                                $('#verify').closest('.input-group').append("<span style='color:red'>验证码错误,区分大小写</span>")
                                if ($('#verify').val().length < 4) {
                                    $('#verify').siblings('span').hide();
                                }
                            }
                        }
                    }
                })

            } else {
                namePwdYz("正确的用户名", "正确的密码", "正确的验证码")
                flag = false
            }
        } else {
            namePwdYz("用户名", "密码", "验证码")

            flag = false;
        }
    })


    //用户名 密码 验证码 错误提示信息函数
    function namePwdYz(run, sun, hun) {
        //先删除之前的错误信息 再添加当前的错误信息
        //用户名
        $("#username").siblings("span").remove();
        $("#username").closest('.input-group').append("<span style='color:red'>请输入" + run + "</span>")

        //密码
        $("#userpwd").siblings("span").remove();
        $("#userpwd").closest('.input-group').append("<span style='color:red'>请输入" + sun + "</span>")

        //验证码
        $("#verify").siblings("span").remove();
        $("#verify").closest('.input-group').append("<span style='color:red'>请输入" + hun + "</span>")
    }



    //键盘输入验证
    //用户名验证
    $("#username").keyup(function () {
        testing(this, "用户名")
    }).blur(function () {
        testing(this, "用户名")
    })
    //密码验证
    $("#userpwd").keyup(function () {
        testing(this, "密码")
    }).blur(function () {
        testing(this, "密码")
    })
    //验证码验证
    $("#verify").keyup(function () {
        testing(this, "验证码")
    }).blur(function () {
        var a = $('#verify').val();
        var b = rand.join("");
        if (a == b) {
            //验证码一致
        } else if( a.length === 0 ) {
            //没输入验证码的时候
            $('#verify').closest('.input-group').append("<span style='color:red'>请输入验证码</span>")
        }else{
            //其他错误情况
            $('#verify').siblings('span').hide();
            $('#verify').closest('.input-group').append("<span style='color:red'>验证码错误,区分大小写</span>")
        }
    })


    //键盘验证函数
    function testing(obj, sss) {
        let len = $(obj).val().length;
        if (len > 0) {
            $(obj).siblings("span").remove();
        } else {
            $(obj).siblings("span").remove();
            $(obj).closest('.input-group').append("<span style='color:red'>请输入" + sss + "</span>")
        }
    }


})

