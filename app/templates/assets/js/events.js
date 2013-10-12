$(window).resize(function () {
    waitForFinalEvent(function() {
        winW = $(window).width();
        winH = $(window).height();
    }, 500, "reset");
});

$(window).scroll(function() {

});