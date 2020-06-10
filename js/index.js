$(function () {


    //window hash 监听事件  只要hash改变 执行该函数
    window.onhashchange = hashChange;

    //hash
    hashChange();
    function hashChange() {
        var hash = location.hash;

        switch (hash) {
            //一进页面判断一次  当hash值为空的时候 就执行页面
            case "":
                $(".main").load("../../pages/home.html")
                break;

            case "#home":
                $(".main").load("../../pages/home.html")
                break;

            case "#borrow":
                $(".main").load("../../pages/borrow.html")
                break;

            case "#investment":
                $(".main").load("../../pages/investment.html")
                break;

            case "#personalCenter":
                $(".main").load("../../pages/personalCenter.html")
                break;
        }
        navActiveChange(hash);
    }
    function navActiveChange(hash) {
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
        }else{
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