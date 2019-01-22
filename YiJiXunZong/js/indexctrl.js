var spotdata;
var soptnode = "<div class='spotitem'><div class='spotimg'></div><div class='spotname'></div><div class='manyoubtn'></div><div class='xunzongbtn' ></div><div class='line'></div></div>";


var urls = [];

$(document).ready(function () {
    $(".popcon").hide();
    $(".popdiv").hide();
    initSpots();
    $("#km_map").click(function () {
        $(".popcon").show();
        $("#kmpop").show();
    });
    $("#yx_map").click(function () {
        $(".popcon").show();
        $("#yxpop").show();
    });

    $(".pop").click(function () {
        $(".popdiv").hide();
        $(".popcon").hide();
    });

    $(".close").click(function () {
        $("#spotdetailcon").hide();
    });

    $("#spotdetailcon").hide();
});

function initSpots() {
    $.getJSON("js/spotdata.json", function (json) {
        spotdata = json;
        for (var i = 0; i < spotdata.km.length; i++) {
            $("#kmpop").append(soptnode);
            $("#kmpop > .spotitem:eq(" + i + ") > .spotimg").css("background-image", "url('images/" + spotdata.km[i].img + "')");
            $("#kmpop > .spotitem:eq(" + i + ") > .spotname").html(spotdata.km[i].title);
            $("#kmpop > .spotitem:eq(" + i + ") > .manyoubtn").attr("onclick", "ClickManYou(" + urls.length + ");");
            $("#kmpop > .spotitem:eq(" + i + ") > .xunzongbtn").attr("onclick", "ClickKMDes(" + i + ");");
            urls.push(spotdata.km[i].url);
        }
        for (var i = 0; i < spotdata.yx.length; i++) {
            $("#yxpop").append(soptnode);
            $("#yxpop > .spotitem:eq(" + i + ") > .spotimg").css("background-image", "url('images/" + spotdata.yx[i].img + "')");
            $("#yxpop > .spotitem:eq(" + i + ") > .spotname").html(spotdata.yx[i].title);
            $("#yxpop > .spotitem:eq(" + i + ") > .manyoubtn").attr("onclick", "ClickManYou(" + urls.length + ");");
            $("#yxpop > .spotitem:eq(" + i + ") > .xunzongbtn").attr("onclick", "ClickYXDes(" + i + ");");
            urls.push(spotdata.yx[i].url);
        }
    });
}

function ClickManYou(idx) {
    if (idx >= 0 && idx < urls.length && urls[idx] != null)
        window.open(urls[idx]);
}

function ClickKMDes(idx) {
    if (idx >= 0 && idx < spotdata.km.length && spotdata.km[idx] != null) {
        $('#spotpic').attr("src", "images/bigimages/" + spotdata.km[idx].img);
        $("#spotdes").html(spotdata.km[idx].des);
        $(".popdiv").hide();
        $("#spotdetailcon").show();
        $(".popcon").hide();
        $('#details').scrollTop(0);
    }
}

function ClickYXDes(idx) {
    if (idx >= 0 && idx < spotdata.yx.length && spotdata.yx[idx] != null) {
        $('#spotpic').attr("src", "images/bigimages/" + spotdata.yx[idx].img);
        $("#spotdes").html(spotdata.yx[idx].des);
        $(".popdiv").hide();
        $("#spotdetailcon").show();
        $(".popcon").hide();
        $('#details').scrollTop(0);
    }
}


