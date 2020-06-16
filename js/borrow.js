$(function () {
    //加载完页面就将数据渲染到页面
    var page = 1;
    var row = 2;
    loadData();
    function loadData() {
        $.ajax({
            url: "http://127.0.0.1:8848/getborrow.php",
            type: "GET",
            data: {
                page: page,
                row: row
            },
            dataType: "JSON",
            success: function (data) {
                var total = data.total;  //总条数 总记录
                var totalPage = Math.ceil(total / row); //总页数  === 总条数 / 每页显示条数

                //分页插件
                $("#page").pagenation({
                    nowPage: page,       //当前页
                    pageNum: totalPage,  //总页数
                    callback: function (p) {
                        page = p
                        loadData()
                    }
                })
                var dataStr;   //数据渲染

                for (var i = 0, len = data.list.length; i < len; i++) {
                    dataStr += `
                    <tr>
                        <td>${data.list[i].userid}</td>
                        <td>${data.list[i].title}</td>
                        <td>${Number(data.list[i].interest).toFixed(2)}%</td>
                        <td>￥${Number(data.list[i].borrowmoney).toFixed(2)}</td>
                        <td>${(data.list[i].repaytype) ? "按月分期" : "按月到期"}</td>
                        <td>${((data.list[i].ownmoney) / (data.list[i].borrowmoney) * 100).toFixed(2)}%</td>
                        <td><button type="button" class="btn btn-danger btn-sm borwor-btn" data-borrowid=${data.list[i].id}>查看</button></td>
                    </tr>
                    `




                }
                //已还金额 / 总金额 === 还款进度
                //进行数据渲染
                $("tbody").html(dataStr);

                //如果投资进度到达了100% 就不能进行页面跳转 以及查看
                $('.table').on("click", ".borwor-btn", function () {
                    var borrowid = $(this).data("borrowid") 
           
                    //判断是否登录
                    if (!(localStorage.getItem('uid'))) {
                        alert("请先登录")
                        location.href = "/login.html";
                        return false;
                    }
                    for (var j = 0, len = data.list.length; j < len; j++) {
                        //循环遍历找到 当前点击的 list列表对象
                        if ((data.list[j].id) == $(this).data("borrowid")) {
                            //如果投资进度到达了100% 就不能进行页面跳转 以及查看
                            if (((data.list[j].ownmoney) / (data.list[j].borrowmoney) * 100).toFixed(2) === "100.00") {
                                $(this).prop({ disabled: "true" })
                                console.log(222)
                            }else{
                                //没有达到100%的可以前往投资
                                sessionStorage.setItem("borrowid",borrowid)
                                location.href = "/#details"
                            }

                        }
                    }

                })
            }



        })
    }

})