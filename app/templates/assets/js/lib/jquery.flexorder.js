/*
 * jquery.flexorder.js 1.1
 *
 * Copyright 2013, Tommy Fisher http://www.tommyfisher.net
 *
 */

(function($) {

    "use strict";

    $.fn.flexorder = function(options) {

        var settings = {
            breakpoint : 960,
            targetContainer : $(this).parent(),
            targetPosition : "start"
        };

        if (options) {
            $.extend(settings, options);
        }

        return this.each(function(i, el) {
            /* remember selector's original order position */
            var originalLocation = {};
            if ($(el).prev().length) {
                /* not originally first child */
                originalLocation.prev = $(el).prev()[0];
            } else {
                /* originally a first child */
                originalLocation.parent = $(el).parent()[0];
            }

            var initiateFlexorder = function() {
                var winW = $(window).width();

                if (winW < settings.breakpoint && !$(el.parentNode).hasClass("flexorder-flexed")) {
                    /* flex the order of the item */

                    if (settings.targetPosition === "start") {
                        $(el).prependTo(settings.targetContainer[i]);
                    } else {
                        $(el).appendTo(settings.targetContainer[i]);
                    }
                    $(el.parentNode).addClass("flexorder-flexed");
                } else if (winW >= settings.breakpoint && $(el.parentNode).hasClass("flexorder-flexed")) {
                    /* return the flexed item back into the orignal flow */
                    if (originalLocation.parent) {
                        /* element was a first child */
                        $(originalLocation.parent).prepend(el);
                    } else {
                        /* element was not a first child */
                        /* add a line break to preserve inline-block spacing */
                        $(originalLocation.prev).after(el).after("\n");
                    }
                    $(el.parentNode).removeClass("flexorder-flexed");
                }
            };

            initiateFlexorder();

            $(window).resize(function() {
                initiateFlexorder();
            });
        });
    };

}(jQuery));