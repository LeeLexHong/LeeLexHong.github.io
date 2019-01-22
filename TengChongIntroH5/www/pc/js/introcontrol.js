// JavaScript Document
/**
云游网H5介绍
作者：李洪
版本：1.0
时间：2018年10月22日
说明：
默认脚本
**/
var version;

if (navigator.appVersion.split(";") != null && navigator.appVersion.split(";").length >= 2)
    version = parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", ""));

if (navigator.appName == "Microsoft Internet Explorer" && version < 9) {
    alert("您的浏览器版本过低,页面显示可能会有异常，推荐使用IE9以上版本或换Chrome浏览器！");
}

var swiperOut;
var NowIndex = 0;

var IsRow2FirstOpen = true;
//语言标记.
var lan;
// 等待所有加载
$(window).on("load", function () {
    setTimeout("onLoaded()", 200);
    $('body').addClass('loaded');
    $('#loader-wrapper .load_title').remove();
});

function onLoaded() {
    setTimeout("StartAnim()", 500);
}

function StartAnim() {
    $("#Initwrapper .swiper-slide").show();
    $(".swiper-pagination-in").show();
    $("#InitRow2wrapper .swiper-slide").show();
    $(".swiper-pagination-row2").show();

    //调用swiper，启动翻页功能（上下滑动）
    swiperOut = new Swiper(".swiper-container-out", {
        direction: "vertical",
        grabCursor: true,
        keyboardControl: false,
        mousewheelControl: true,
        pagination: ".swiper-pagination-out",
        paginationType: "bullets",
        paginationClickable: true,
        onlyExternal: false,
        onSlideChangeEnd: function (swiper) {
            LoadPage();
            ClearPage();
        }
    });

    LoadPage();

    //预加载图片函数.
    var images = new Array();
    function preload() {
        for (i = 0; i < preload.arguments.length; i++) {
            images[i] = new Image();
            images[i].src = preload.arguments[i];
        }
    };

}


var sh, mouseidx = 0;
function MouseTipAni() {
    for (var i = 0; i < 3; i++) {
        if (i <= mouseidx) {
            $(".MArrow:eq(" + i + ")").show();
        } else
            $(".MArrow:eq(" + i + ")").hide();
    }
    mouseidx++;
    if (mouseidx >= 3)
    mouseidx = -1;
}


$(document).ready(function () {
    $("#Initwrapper .swiper-slide").hide();
    $(".swiper-pagination-in").hide();
    sh = setInterval(MouseTipAni, 500);
});


function LoadPage() {
    if(swiperOut.previousIndex == 6){
        $("#MouseCon").show();
    }

    if(swiperOut.activeIndex == 6){
        $("#MouseCon").hide();
    }

    GetPage(swiperOut, swiperOut.activeIndex);
}

function ClearPage() {
    $(swiperOut.slides[swiperOut.previousIndex]).html("");
}

function ChangePage(index) {
    if (NowIndex != index) {
        NowIndex = index;
        swiperIn.slideTo(index, 500);
    }
};

//获取页面内容
function GetPage(swiper, num) {
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "subpages/" + $(swiper.slides[num]).attr("aria-page") + ".html",
        success: function (data) {
            //加入页面代码
            $(swiper.slides[num]).html(data.substring(data.indexOf("<section class=\"swiper-slide\">") + 30, data.indexOf("</section>")));
            //调整显示比例
            $(swiper.slides[num]).find(".base-div").aspectRatio();

            var loaders = [];
            $("img.lazy").each(function (index, element) {
                loaders.push(LazyLoadImage(element));
            });

            $.when.apply(null, loaders).done(function () {
                try {
                    //运行当前激活页面的运行脚本
                    eval($(swiper.slides[swiper.activeIndex]).attr("aria-page") + "_run()");
                } catch (error) {
                    $(".anime").show();
                    $(".anime").animateSwiper();
                }
            });
        },
        error: function () {
            console.log("file error");
        }
    });
};

//延迟加载图片
function LazyLoadImage(element) {
    var deferred = $.Deferred();
    var img = new Image();
    img.onload = function () {
        $(element).attr("src", img.src);
        //console.log(element);
        deferred.resolve();
    };

    //console.log($(element).attr("data-src"));
    img.src = $(element).attr("data-src");
    return deferred.promise();
};

$.fn.extend({
    animateSwiper: function () {
        var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
        this.addClass("animated").one(animationEnd, function () {
            $(this).removeClass("animated");
        });
    }
});

$.fn.extend({
    aspectRatio: function () {

        var oldHeight = $(this).height();
        var AR = $(this).width() / $(this).height();
        var baseHeight;
        var baseWidth;
        var scale = 1;
        //console.log(AR);
        if ($(window).height() * AR == $(window).width()) {
            baseHeight = $(window).height();
            baseWidth = $(window).width();
        } else if ($(window).height() * AR > $(window).width()) {
            baseWidth = $(window).width();
            baseHeight = $(window).width() / AR;
        } else if ($(window).height() * AR < $(window).width()) {
            baseHeight = $(window).height();
            baseWidth = $(window).height() * AR;
        }

        $(this).height(baseHeight);
        $(this).width(baseWidth);

        scale = $(this).height() / oldHeight;

        $(this).css({
            "position": "absolute",
            "top": ($(window).height() - baseHeight) / 2 + "px",
            "left": ($(window).width() - baseWidth) / 2 + "px"
        });

        $(this).children(".AR").each(function (index, element) {
            $(element).css({
                "width": parseInt($(element).css("width")) * scale + "px",
                "height": parseInt($(element).css("height")) * scale + "px",
                "top": parseInt($(element).css("top")) * scale + "px",
                "left": parseInt($(element).css("left")) * scale + "px"
            });
        });
    }
});
