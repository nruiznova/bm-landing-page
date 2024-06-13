(function ($) {

    "use strict";

//Placeholder show/hide
    $('input, textarea').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'));
        $(this).attr('placeholder', '');
    });
    $('input, textarea').blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });


//Portfolio
    var grid = $('.grid').imagesLoaded(function () {
        grid.isotope({
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
        //Fix for portfolio item text
        $('.portfolio-text-holder').each(function () {
            $(this).find('.portfolio-text-wrapper').css('margin-top', ($(this).height() - $(this).find('.portfolio-text-wrapper').height()) / 2);
        });
    });
	
	$('.contact-form [type="submit"]').on('click',function(){
        SendMail(); 
    });


    $(window).on('scroll', function () {
        animateElement();
    });


    $(window).on('load', function () {

        //Show-Hide Mobile Menu
        $('.mob-menu').on("click", showHideMobMenu);
        if ($("body").width() <= 925)
        {
            $('.main-menu a').on("click", hideMobMenuItemClick);
        }

        //PrettyPhoto initial                
        $('a[data-rel]').each(function () {
            $(this).attr('rel', $(this).data('rel'));
        });
        $("a[rel^='prettyPhoto']").prettyPhoto({
            slideshow: false, /* false OR interval time in ms */
            overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
            default_width: 1280,
            default_height: 720,
            deeplinking: false,
            social_tools: false,
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
        });


        //Set menu
        $('.main-menu').smartmenus({
            subMenusSubOffsetX: 1,
            subMenusSubOffsetY: -8,
            markCurrentItem: true
        });

        var $mainMenu = $('.main-menu').on('click', 'span.sub-arrow', function (e) {
            var obj = $mainMenu.data('smartmenus');
            if (obj.isCollapsible()) {
                var $item = $(this).parent(),
                        $sub = $item.parent().dataSM('sub');
                $sub.dataSM('arrowClicked', true);
            }
        }).bind({
            'beforeshow.smapi': function (e, menu) {
                var obj = $mainMenu.data('smartmenus');
                if (obj.isCollapsible()) {
                    var $menu = $(menu);
                    if (!$menu.dataSM('arrowClicked')) {
                        return false;
                    }
                    $menu.removeDataSM('arrowClicked');
                }
            }
        });


        // Animate the elemnt if is allready visible on load
        animateElement();

        //Image / Testimonial Slider Config
        $(".image-slider, .testimonial-slider").each(function () {
            var id = $(this).attr('id');
            var auto_value = window[id + '_auto'];
            if (auto_value == 'false') {
                auto_value = false;
            } else {
                auto_value = true;
            }

            var hover_pause = window[id + '_hover'];
            if (hover_pause == 'true') {
                hover_pause = 'resume';
            } else {
                hover_pause = false;
            }

            var speed_value = window[id + '_speed'];

            $('#' + id).slick({
                dots: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 750,
                autoplay: auto_value,
                autoplaySpeed: speed_value,
                pauseOnHover: hover_pause,
                fade: true,
                draggable: false
            });
        });

        //Fix for hash
        var hash = location.hash;
        if (hash !== '') {
            if ($('.mob-menu').is(':visible')) {
                $('html, body').animate({scrollTop: $(hash).offset().top - $('.mob-menu').height()}, 1);
            } else {
                $('html, body').animate({scrollTop: $(hash).offset().top - $('.menu-wrapper').height()}, 1);
            }
        }

        $(window).scrollTop(1);
        $(window).scrollTop(0);

        $('.doc-loader').fadeOut();
    });


    $(window).on('resize', function () {

        if ($("body").width() <= 925) {
            $('.main-menu a').on("click", hideMobMenuItemClick);
        }

        $('.portfolio-text-holder').each(function () {
            $(this).find('.portfolio-text-wrapper').css('margin-top', ($(this).height() - $(this).find('.portfolio-text-wrapper').height()) / 2);
        });
    });


//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------

    function animateElement(e) {
        $(".animate").each(function (i) {
            var top_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if ((bottom_of_window - 50) > top_of_object) {
                $(this).addClass('show-it');
            }
        });
    }

    function showHideMobMenu(e) {
        $('.main-menu').slideToggle();
    }

    function hideMobMenuItemClick(e) {
        if ($('.mob-menu').is(':visible'))
        {
            $('.main-menu').slideUp();
        }
    }

    function is_touch_device() {
        return !!('ontouchstart' in window);
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    }

    function SendMail() {
        var emailVal = $('#contact-email').val();
        if (isValidEmailAddress(emailVal)) {
            var params = {
                'action': 'SendMessage',
                'name': $('#name').val(),
                'email': $('#contact-email').val(),
                'subject': $('#subject').val(),
                'message': $('#message').val()
            };
            $.ajax({
                type: "POST",
                url: "php/sendMail.php",
                data: params,
                success: function (response) {
                    if (response) {
                        var responseObj = $.parseJSON(response);
                        if (responseObj.ResponseData)
                        {
                            alert(responseObj.ResponseData);
                        }
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //xhr.status : 404, 303, 501...
                    var error = null;
                    switch (xhr.status)
                    {
                        case "301":
                            error = "Redirection Error!";
                            break;
                        case "307":
                            error = "Error, temporary server redirection!";
                            break;
                        case "400":
                            error = "Bad request!";
                            break;
                        case "404":
                            error = "Page not found!";
                            break;
                        case "500":
                            error = "Server is currently unavailable!";
                            break;
                        default:
                            error = "Unespected error, please try again later.";
                    }
                    if (error) {
                        alert(error);
                    }
                }
            });
        } else
        {
            alert('Your email is not in valid format');
        }
    }

})(jQuery);