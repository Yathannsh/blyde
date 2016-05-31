$(function() {

    $(window).load(function(){
       $('.preloader').fadeOut(400);
    });


    $.fn.removeClassWild = function(mask) {
        return this.removeClass(function(index, cls) {
            var re = mask.replace(/\*/g, '\\S+');
            return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
        });
    };



    // Slideshow
    var slidePos = 0;
    var slideAuto = null;

    var clTT = '.top-tab';
    var clTTLink = clTT + '__link';
    var clTTLinkA = clTTLink + '--active';
    var idTTUl = '#' + clTT.substr(1) + '__ul';

    var clHBg = 'header--bg_';

    function sliderInterval() {

        slideAuto = setInterval(function(){

            slidePos = (slidePos + 1) > 3 ? 0 : (slidePos + 1);

            $('.header').removeClassWild(clHBg + '*').addClass(clHBg + (slidePos + 1));

            $(idTTUl).find(clTTLinkA).removeClass(clTTLinkA.substr(1)).closest(idTTUl).children().eq(slidePos).children().addClass(clTTLinkA.substr(1));

        }, 10000);
    }

    $(document).ready(sliderInterval);

    $(clTTLink).click(function(){

        clearInterval(slideAuto);

        slidePos = $(this).parent().index();

        $(this).closest('.header').removeClassWild(clHBg + '*').addClass(clHBg + (slidePos + 1));

        $(idTTUl).find(clTTLinkA).removeClass(clTTLinkA.substr(1));
        $(this).addClass(clTTLinkA.substr(1));

        sliderInterval();
    });

    // Active Spy Scroll (module/navi)
    inScrolling = false;

    $('a[href*=#]:not([href=#])').click(function() {

        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

            var target = $(this.hash);

            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

            if (target.length) {

                // Lock Spy Scroll
                inScrolling = true;

                var oS = target.offset().top;
                var topBack = 30;
                var top = oS > topBack ? oS - topBack : 0;
                var time = Math.abs($(window).scrollTop() - oS)/50 * 100;

                $('html,body').animate({ scrollTop: top }, time, function(){ inScrolling = false; });

                return false;
            }
        }
    });
});