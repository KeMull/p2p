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
            console.log( data )
            for( var key in data ){
                $('#'+key).text(data[key])
            }
        }
    })
})