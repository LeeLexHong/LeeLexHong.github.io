$(document).ready(function () {
    var swiper = new Swiper(".swiper-container", {
        grabCursor: true,
        keyboardControl: true,
        mousewheelControl: true,
        pagination: ".swiper-pagination",
        paginationType: "progress"
    });

    $(".base-div").aspectRatio();

    var loaders = [];
    $("img.lazy").each(function (index, element) {
        loaders.push(LazyLoadImage(element));
    });

    $.when.apply(null, loaders).done(function () {
        // callback when everything was loaded
        //console.log("all done");
        $(".anime").show();
        $(".anime").animateSwiper();

    });
});

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
}

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