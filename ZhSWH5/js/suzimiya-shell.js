// JavaScript Document
/**
张胜温主题页
作者：李洪
版本：1.0
时间：2017年12月28日
说明：
默认脚本

**/

var version = parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", ""));
if (navigator.appName == "Microsoft Internet Explorer" && version < 9) {
    alert("您的浏览器版本过低，推荐使用IE9以上版本或换Chrome浏览器！");
}

var swiperOut;
var swiperIn;
var swiperRow2;
var IsFirstOpen = true;
var NowIndex = 0;

var IsRow2FirstOpen = true;

// 等待所有加载
$(window).on("load", function () {
    setTimeout("onLoaded()", 200);
});

function onLoaded() {
    $('body').addClass('loaded');
    $('#loader-wrapper .load_title').remove();
    setTimeout("StartAnim()", 500);
}

function StartAnim() {
    $("#Initwrapper .swiper-slide").show();
    $(".swiper-pagination-in").show();
    $("#InitRow2wrapper .swiper-slide").show();
    $(".swiper-pagination-row2").show();
}


$(document).ready(function () {

    swiperIn = new Swiper(".swiper-container-in", {
        direction: "horizontal",
        grabCursor: true,
        keyboardControl: true,
        mousewheelControl: false,
        pagination: ".swiper-pagination-in",
        paginationClickable: true,
        parallax: true,
        paginationType: "custom",
        paginationCustomRender: function (swiper, current, total) {
            if (IsFirstOpen) {
                IsFirstOpen = false;
                var pgArray = new Array("", "", "", "");

                for (var i = 1; i < pgArray.length + 1; i++) {
                    if (i == current) {
                        pgArray[i - 1] = "<input class=\"anime fadeIn\" type=\"button\" onclick=\"ChangePage(" + (i - 1) + ")\" style=\"opacity: 0;background: url(image/" + (i - 1) + "_hl.png);background-size:100% 100%;background-repeat:no-repeat;" +
                            "animation-delay:" + (0.5 + 3 * i - 1) + "s;-ms-animation-delay: " + (0.5 + 3 * i - 1) +
                            "s;-webkit-animation-delay:" + (0.5 + 3 * i - 1) + "s;-moz-animation-delay:" + (0.5 + 3 * i - 1) + "s;-o-animation-delay:" + (0.5 + 3 * i - 1) + "s;\"/>";
                    } else {
                        pgArray[i - 1] = "<input class=\"anime fadeIn\" type=\"button\" onclick=\"ChangePage(" + (i - 1) + ")\" style=\"opacity: 0;background: url(image/" + (i - 1) + "_def.png);background-size:100% 100%;background-repeat:no-repeat;" +
                            "animation-delay:" + (0.5 + 3 * i - 1) + "s;-ms-animation-delay: " + (0.5 + 3 * i - 1) +
                            "s;-webkit-animation-delay:" + (0.5 + 3 * i - 1) + "s;-moz-animation-delay:" + (0.5 + 3 * i - 1) + "s;-o-animation-delay:" + (0.5 + 3 * i - 1) + "s;\"/>";
                    }
                }

            } else {
                var pgArray = new Array("", "", "", "");

                for (var i = 1; i < pgArray.length + 1; i++) {
                    if (i == current) {
                        pgArray[i - 1] = "<input type=\"button\" onclick=\"ChangePage(" + (i - 1) + ")\" style=\"background: url(image/" + (i - 1) + "_hl.png);background-size:100% 100%;background-repeat:no-repeat;\"/>";
                    } else {
                        pgArray[i - 1] = "<input type=\"button\" onclick=\"ChangePage(" + (i - 1) + ")\" style=\"background: url(image/" + (i - 1) + "_def.png);background-size:100% 100%;background-repeat:no-repeat;\"/>";
                    }
                }

            }
            if (NowIndex != current - 1) {
                GetPage(swiper, swiper.activeIndex);
                $(swiper.slides[swiper.previousIndex]).html("");
                NowIndex = swiper.activeIndex;
            }


            return "<div>" + pgArray.join("") + "</div>";
        },

        onSlideChangeEnd: function (swiper) {
            //console.log("onSlideChangeEnd:"+ swiper.activeIndex + " nowIndex:"+NowIndex);
            GetPage(swiper, swiper.activeIndex);
            $(swiper.slides[swiper.previousIndex]).html("");
            NowIndex = swiper.activeIndex;
        }
    });
    $("#Initwrapper .swiper-slide").hide();
    $(".swiper-pagination-in").hide();
    //调用swiper，启动翻页功能（上下滑动）
    swiperOut = new Swiper(".swiper-container-out", {
        direction: "vertical",
        grabCursor: true,
        keyboardControl: false,
        mousewheelControl: true,
        pagination: ".swiper-pagination-out",
        paginationType: "bullets",
        paginationClickable: true,
        onlyExternal:true,
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

    preload(
        "image/0_def.png",
        "image/1_def.png",
        "image/2_def.png",
        "image/3_def.png",
        "image/0_hl.png",
        "image/1_hl.png",
        "image/2_hl.png",
        "image/3_hl.png",
        "image/c_hl.png",
        "image/row2/0_def.png",
        "image/row2/1_def.png",
        "image/row2/2_def.png",
        "image/row2/3_def.png",
        "image/row2/4_def.png",
        "image/row2/5_def.png",
        "image/row2/0_hl.png",
        "image/row2/1_hl.png",
        "image/row2/2_hl.png",
        "image/row2/3_hl.png",
        "image/row2/4_hl.png",
        "image/row2/5_hl.png"
    );

    window.onorientationchange = function () {
        switch (window.orientation) {
            case -90:
            case 90:
                //$(".swiper-container-out").show();
                break;
            case 0:
            case 180:
                // $(".swiper-container-out").hide();
                //alert("请在横屏状态下浏览！");
                break;
        }
    };

    if (window.orientation != undefined && window.orientation != 90 && window.orientation != -90) {
        //$(".swiper-container-out").hide();
        //alert("请在横屏状态下浏览！");
    }
});



function GetRow2() {
    swiperRow2 = new Swiper(".swiper-container-row2", {
        direction: "horizontal",
        grabCursor: true,
        keyboardControl: true,
        mousewheelControl: false,
        pagination: ".swiper-pagination-row2",
        paginationClickable: true,
        parallax: true,
        paginationType: "custom",
        paginationCustomRender: function (swiper, current, total) {
            var pgArray = new Array("", "", "", "", "", "");
            if (!IsRow2FirstOpen) {
                for (var i = 1; i < pgArray.length + 1; i++) {
                    if (i == current) {
                        pgArray[i - 1] = "<input type=\"button\" onclick=\"ChangeRow2Page(" + (i - 1) + ")\" style=\"background: url(image/row2/" + (i - 1) + "_hl.png);background-size:100% 100%;background-repeat:no-repeat;\"/>";
                    } else {
                        pgArray[i - 1] = "<input type=\"button\" onclick=\"ChangeRow2Page(" + (i - 1) + ")\" style=\"background: url(image/row2/" + (i - 1) + "_def.png);background-size:100% 100%;background-repeat:no-repeat;\"/>";
                    }
                    $(".swiper-pagination-row2").css("bottom", "3%");
                }
            } else {
                IsRow2FirstOpen = false;
                for (var i = 1; i < pgArray.length + 1; i++) {
                    var dt = (0.5 + 0.2 * (i - 1));
                    if (i == current) {
                        pgArray[i - 1] = "<input type=\"button\" onclick=\"ChangeRow2Page(" + (i - 1) + ")\" style=\"background: url(image/row2/" + (i - 1) + "_hl.png);" +
                            "animation-delay:" + dt + "s;-ms-animation-delay: " + dt + "s;-webkit-animation-delay:" + dt +
                            "s;-moz-animation-delay:" + dt + "s;-o-animation-delay:" + dt + "s;background-size:100% 100%;background-repeat:no-repeat;\" class=\"anime BtnMoveAnima forwardani\"/>";
                    } else {
                        pgArray[i - 1] = "<input type=\"button\" onclick=\"ChangeRow2Page(" + (i - 1) + ")\" style=\"background: url(image/row2/" + (i - 1) + "_def.png);" +
                            "animation-delay:" + dt + "s;-ms-animation-delay: " + dt + "s;-webkit-animation-delay:" + dt +
                            "s;-moz-animation-delay:" + dt + "s;-o-animation-delay:" + dt + "s;background-size:100% 100%;background-repeat:no-repeat;\" class=\"anime BtnMoveAnima forwardani\"/>";
                    }
                }
            }
            GetPage(swiper, swiper.activeIndex);
            $(swiper.slides[swiper.previousIndex]).html("");

            return "<div>" + pgArray.join("") + "</div>";
        },
        onSlideChangeEnd: function (swiper) {
            //console.log("onSlideChangeEnd:"+ swiper.activeIndex + " nowIndex:"+NowIndex);
            GetPage(swiper, swiper.activeIndex);
            $(swiper.slides[swiper.previousIndex]).html("");
            // NowIndex = swiper.activeIndex;
        }
    });
    $("#InitRow2wrapper .swiper-slide").hide();
    $(".swiper-pagination-row2").hide();
}


function LoadPage() {
    if ($(swiperOut.slides[swiperOut.activeIndex]).attr("aria-page") == "nested") {
        GetPage(swiperIn, swiperIn.activeIndex);
    } else if ($(swiperOut.slides[swiperOut.activeIndex]).attr("aria-page") == "row02") {
        if (swiperRow2 == null) {
            GetRow2();
            if(swiperOut.activeIndex == 1)
               $(".swiper-pagination-row2").show();
        }
        GetPage(swiperRow2, swiperRow2.activeIndex);
    } else {
        GetPage(swiperOut, swiperOut.activeIndex);
    }
}

function ClearPage() {
    if ($(swiperOut.slides[swiperOut.previousIndex]).attr("aria-page") == "nested") {
        $(swiperIn.slides[swiperIn.activeIndex]).html("");
    } else if ($(swiperOut.slides[swiperOut.previousIndex]).attr("aria-page") == "row02")
        $(swiperRow2.slides[swiperRow2.previousIndex]).html("");
    else
        $(swiperOut.slides[swiperOut.previousIndex]).html("");
}

function ChangePage(index) {
    if (NowIndex != index) {
        NowIndex = index;
        swiperIn.slideTo(index, 500);
    }
};

function ChangeRow2Page(index) {
    swiperRow2.slideTo(index, 500);
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
