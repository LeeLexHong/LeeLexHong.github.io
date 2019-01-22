var chamadata;

var urls = new Array(
    "https://weibo.com/innyo?refer_flag=1001030101_&is_all=1",
    "https://www.toutiao.com/c/user/3608942175/#mid=3684704996",
    "http://www.yidianzixun.com/channel/m4164",
    "http://mp.sohu.com/profile?xpt=aW5ueW9feW5Ac29odS5jb20=&_f=index_pagemp_1&qq-pf-to=pcqq.c2c",
    "http://dy.163.com/v2/article/detail/DFJ99B6Q052486PU.html"
);

function bodyScroll(event){  
    event.preventDefault();  
}

$(document).ready(function () {
    $("#NoticCon").hide();
    initSpots();
    $("#NoticCon").hide();
    $(".Nclose").click(function () {
        $("#NoticCon").hide();
        document.body.removeEventListener('touchmove',bodyScroll,{ passive: false });
    });

    $(".citem").click(function () {
        var idx = $(this).index();
        if (idx == 5)
            return;
        window.open(urls[idx]);
    });
});

function initSpots() {
    for (var i = 0; i < 18; i++) {
        $(".spotscon").append("<div class='spot' onclick='ClickSopt(" + i + ")'></div>");
        $(".spot:eq(" + i + ")").css("background-image", "url('images/spoticons/spot" + (i + 1) + ".jpg')");
    }
    $.getJSON("js/chamaspotdata.json", function (data) {
        chamadata = data;
    });
}

function ClickSopt(idx) {
    if (chamadata != null && idx < chamadata.length) {
        $("#Ntitle").html(chamadata[idx].name);
        $("#Ndes").html(chamadata[idx].des);
        $('#Nimg').attr("src", "images/chamaimgs/" + (idx + 1) + ".jpg");
        $("#NoticCon").show();
        document.body.addEventListener('touchmove',bodyScroll,{ passive: false });  
    }
}

