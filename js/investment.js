$( function() {

    //AB页面加载

    $(".a-btn").click( function() {
        
        //点击当前贷款类型 将当前的自定义类型保存到会话存储里
        var index = $( this ).data("index");
        sessionStorage.setItem("index",index);
        location.href="#personalCenter/loan";
        
    })




})