$(function () {

    window.onhashchange = hashChangeg;
    hashChangeg()
    function hashChangeg() {
        var hash = location.hash;

        console.log(hash)
        switch (hash) {
            //刷新页面  当hash值为空的时候 就执行页面
            case "":
                $(".main").load("../../pages/home.html")
                break;

            case "#personalCenter":
                $(".main-reigt").load("../../person-pages/personal.html")
                break;

            case "#personal":
                $(".main-reigt").load("../../person-pages/personal.html")
                break;

            case "#loanProgram":
                $(".main-reigt").load("../../person-pages/loanProgram.html")
                break;

            case "#account":
                $(".main-reigt").load("../../person-pages/account.html")
                break;
            case "#reName":
                $(".main-reigt").load("../../person-pages/reName.html")
                break;

            case "#withdrawa":
                $(".main-reigt").load("../../person-pages/withdrawa.html")
                break;
        }
    }
})