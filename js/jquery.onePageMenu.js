(function ($) {
    "use strict";

    $(window).on('scroll resize', function () {
        var currentSection = null;

        $('.section').each(function () {
            var element = $(this).attr('id');
            if ($('#' + element).is('*')) {
                if ($(window).scrollTop() >= $('#' + element).offset().top - 90) {
                    currentSection = element;
                }
            }
        });

        $('#header-main-menu ul li').removeClass('active').find('a[href*="#' + currentSection + '"]').parent().addClass('active');

        $('.menu-wrapper').removeClass(function (index, css) {
            return (css.match(/(^|\s)section-\S+/g) || []).join(' ');
        }).addClass('section-' + currentSection);

    });

    $(".menu-wrapper").sticky({topSpacing: 0});
    $('#header-main-menu ul li a, .slow-scroll').on('click', function () {
        if ($('.mob-menu').is(':visible')) {
            $('html, body').animate({scrollTop: $(this.hash).offset().top - $('.mob-menu').outerHeight()}, 1500);
        } else {
            $('html, body').animate({scrollTop: $(this.hash).offset().top - $('.menu-wrapper').outerHeight()}, 1500);
        }
        return false;
    });

})(jQuery);