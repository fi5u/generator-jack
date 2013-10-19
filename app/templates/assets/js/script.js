(function (window, document, $, undefined) {

// ======================================================================= //
//                             SCOPE VARIABLES                             //
// ======================================================================= //

    'use strict';

    var winW,
        winH,

        breakXs,
        breakS,
        breakM,
        breakL,
        maxWidth,
        gridPadding,

        navTrigger,

        retina,
        basicSupport;


// ======================================================================= //
//                             SCOPE FUNCTIONS                             //
// ======================================================================= //

    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = 'uniqueId';
            }
            if (timers[uniqueId]) {
                clearTimeout(timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();


// ======================================================================= //
//                                  INIT                                   //
// ======================================================================= //

    winW = $(window).width();
    winH = $(window).height();
    breakXs = 320;
    breakS = 480;
    breakM = 768;
    breakL = 1024;
    maxWidth = breakL;
    gridPadding = 10;

    navTrigger = breakM;
    retina = window.devicePixelRatio >= 1.5;
    basicSupport = $('html').hasClass('lt-ie9') || $('.touch').length > 0;


// ======================================================================= //
//                                 EVENTS                                  //
// ======================================================================= //

    $(window).resize(function () {
        waitForFinalEvent(function () {
            winW = $(window).width();
            winH = $(window).height();
        }, 500, 'reset');
    });

    $(window).scroll(function () {

    });

})(window, document, jQuery);