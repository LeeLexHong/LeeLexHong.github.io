var chashandata,chazudata;

var urls = new Array(
    "https://weibo.com/innyo?refer_flag=1001030101_&is_all=1",
    "https://www.toutiao.com/c/user/3608942175/#mid=3684704996",
    "http://www.yidianzixun.com/channel/m4164",
    "http://mp.sohu.com/profile?xpt=aW5ueW9feW5Ac29odS5jb20=&_f=index_pagemp_1&qq-pf-to=pcqq.c2c",
    "http://dy.163.com/v2/article/detail/DFJ99B6Q052486PU.html"
  );

  
var routes = new Array(
    "昆明—宁洱—普洱—易武—勐海—澜沧—西盟—镇沅—景谷—墨江—昆明",
    "昆明—宁洱—普洱—易武—勐海—澜沧—西盟—昆明",
    "昆明—宁洱—普洱—昆明"
  );

  function bodyScroll(event){  
    event.preventDefault();  
}

$(document).ready(function () {
    $("#NoticCon").hide();
    InitChaShan();
    InitChaZu();
    $("#NoticCon").hide();
    $(".Nclose").click(function () {
        document.body.removeEventListener('touchmove',bodyScroll,{ passive: false });
        $("#NoticCon").hide();
    });

    $(".citem").click(function () {
        var idx = $(this).index();
        if (idx == 5)
          return;
        window.open(urls[idx]);
    });

    
    $(".mapbtn").click(function () {
        var idx = $(this).index();
        for(var i=0;i<routes.length;i++){
            if(idx == i){
                $(".mapbtn:eq("+i+")").css("background-image", "url('images/mapbtn" + (i + 1) + "_hl.png')");
                $("#routewords").html(routes[i]);
                $("#chazuroute").css("background-image", "url('images/chazuroute" + (i + 1) + ".png')");
            }else
                $(".mapbtn:eq("+i+")").css("background-image", "url('images/mapbtn" + (i + 1) + ".png')");
        }
    });
});

function InitChaShan() {
    $.getJSON("js/chashandata.json", function (data) {
        chashandata = data;
        for (var i = 0; i < chashandata.length; i++) {
            $("#chashan").append("<div class='spot' onclick='ClickChaShan(" + i + ")'></div>");
            $("#chashan>.spot:eq(" + i + ")").css("background-image", "url('images/chashanicons/" + (i + 1) + ".jpg')");
        }
    });
}

function ClickChaShan(idx) {
    if (chashandata != null && idx < chashandata.length) {
        $("#Ntitle").html(chashandata[idx].name);
        $("#Ndes").html(chashandata[idx].des);
        $('#Nimg').attr("src","images/chashanimgs/"+(idx+1)+".jpg");
        $("#NoticCon").show();
        document.body.addEventListener('touchmove',bodyScroll,{ passive: false }); 
    }
}



function InitChaZu() {
    $.getJSON("js/chazudata.json", function (data) {
        chazudata = data;
        for (var i = 0; i < chazudata.length; i++) {
            $("#chazu").append("<div class='spot' onclick='ClickChaZu(" + i + ")'></div>");
            $("#chazu>.spot:eq(" + i + ")").css("background-image", "url('images/chazuicons/" + (i + 1) + ".jpg')");
        }
    });
}

function ClickChaZu(idx) {
    if (chazudata != null && idx < chazudata.length) {
        $("#Ntitle").html(chazudata[idx].name);
        $("#Ndes").html(chazudata[idx].des);
        $('#Nimg').attr("src","images/chazuimgs/"+(idx+1)+".jpg");
        $("#NoticCon").show();
        document.body.addEventListener('touchmove',bodyScroll,{ passive: false }); 
    }
}
