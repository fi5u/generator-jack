var winW = $(window).width(),
    winH = $(window).height(),

    breakXs = 320,
    breakS = 480,
    breakM = 768,
    breakL = 1024,
    maxWidth = breakL,
    gridPadding = 10,

    navTrigger = breakM,

    retina = window.devicePixelRatio >= 1.5,
    basicSupport = $("html").hasClass("lt-ie9") || $(".touch").length;