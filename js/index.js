$(function () {


    //window hash 监听事件  只要hash改变 执行该函数
    window.onhashchange = hashChange;

    //hash 锚点加载页面
    hashChange();
    function hashChange() {
        var hash = location.hash;

        switch (hash) {
            //一进页面判断一次  当hash值为空的时候 就执行页面
            case "":
                $(".main").load("../pages/home.html")
                break;

            case "#home":
                $(".main").load("../../pages/home.html")
                break;

            case "#borrow":
                $(".main").load("../../pages/borrow.html")
                break;

            case "#app":
                $(".main").load("../../app.html")
                break;

            case "#investment":
                $(".main").load("../../pages/investment.html")
                break;

            case "#details":
                $(".main").load("../../details.html")
                break;


            case "#personalCenter":
                personalLoadPage("#personalCenter/loanProgram");
                break;
            //个人中心
            case "#personalCenter/loanProgram":
                personalLoadPage(hash);
                break;

            case "#personalCenter/personal":
                personalLoadPage(hash)
                break;

            case "#personalCenter/reName":
                personalLoadPage(hash)
                break;

            case "#personalCenter/account":
                personalLoadPage(hash)
                break;

            case "#personalCenter/withdrawa":
                personalLoadPage(hash)
                break;

            case "#personalCenter/rePersonal":
                personalLoadPage(hash)
                break;

            case "#personalCenter/loan":
                personalLoadPage(hash)
                break;
        }
        navActiveChange(hash);
    }

    //个人中心加载局部页面
    function personalLoadPage(hash) {
        //截取到hash值
        hash = hash.substr(1);
        if ($('#main-box').length) {
            //判段个人中心盒子是否存在   存在就加载局部页面  === /点击
            $(".main-reigt").load("../../pages/" + hash + ".html");

            personalNavActive(hash);
        } else {

            //不存在的时候 === 刷新页面 那就重新加载 .main 主体盒子加载个人中心页面  个人中心加载完之后 再去加载 个人中心的局部片段
            $(".main").load("../../pages/personalCenter.html", function () {
                $(".main-reigt").load("../../pages/" + hash + ".html");

                personalNavActive(hash);
            })
        }
    }



    //个人中心二级菜单激活样式
    function personalNavActive(hash) {
        $('#main-box .main-left a[href="#' + hash + '"]').addClass('active').siblings('a').removeClass('active');

    }

    //顶部导航激活样式
    function navActiveChange(hash) {
        if (hash == "") hash = "#home";   //当hash 为空的时候 hash就等于 首页主体
        if (hash.includes('personalCenter')) hash = "#personalCenter"

        //当前对应的nav导航添加激活样式  其他的兄弟删除激活样式
        $(".container-nav .nav-item a[href='" + hash + "']").closest(".nav-item").removeClass('active').addClass('active').siblings('.nav-item').removeClass('active');
    }



    //判断用户是否登录
    //本地存储里面有用户名 && 用户id  判断
    login()
    function login() {
        var username = localStorage.getItem('username');
        var uid = localStorage.getItem("uid");

        if (username && uid) {
            //登录按钮
            $('#login-btn').prop({ href: '#' }).text(username);
            //注册按钮
            $("#res-btn").prop({ href: '#' }).text('注销')
        } else {
            //重新渲染页面
            $('#login-btn').prop({ href: '../login.html' }).text("登录");
            $("#res-btn").prop({ href: '../register.html' }).text('注册')
        }


    }


    //点击注销按钮 退出登录 清空本地存储
    $('#login-box-btn').on('click', "#res-btn", function () {
        if (confirm('您确定要退出吗？')) {
            //删除本地存储
            localStorage.removeItem('username');
            localStorage.removeItem('uid');

            //重新渲染页面
            $('#login-btn').prop({ href: '../login.html' }).text("登录");
            $("#res-btn").prop({ href: '#' }).text('注册')
        }
    })

})

