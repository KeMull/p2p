$(function () {

    //选项卡

    $('.list li').click(function () {
        var index = $(this).index();

        $(this).removeClass('active').addClass('active').siblings('li').removeClass('active');

        $('.listBox>div').eq(index).show().siblings('div').hide()
    })





})