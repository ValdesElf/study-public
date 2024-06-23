/**
 * Created by gromniki on 10.01.2017.
 */

// ��������/�������� ���������� ����������
$(document).ready(function () {
    var navMain = document.querySelector('.mobile-nav');
    var navToggle = document.querySelector('.mobile-nav__toggle');

    navMain.classList.remove('mobile-nav--nojs');

    navToggle.addEventListener('click', function () {
        if (navMain.classList.contains('mobile-nav--closed')) {
            navMain.classList.remove('mobile-nav--closed');
            navMain.classList.add('mobile-nav--opened');
        } else {
            navMain.classList.add('mobile-nav--closed');
            navMain.classList.remove('mobile-nav--opened');
        }
    });
});


// �������
function cartWidgetRenew() {

    $.ajax({
        method: "GET",
        url: "/wp-admin/admin-ajax.php",
        data: {
            "action": "renew_cart",
            "session_id": session_id
        },
        success: function (data) {
            obj = jQuery.parseJSON(data);
            $(".basket-numbers").html(obj.count);
            $(".basket-price").html(obj.massege);
        }
    }).done(function (data) {

        //console.log('cartWidgetRenew: ');
        //console.log(data);

    }).fail(function (data) {
        $(".basket-price").html('fail');
    });
}


// Catalog from other Roma
// $(document).ready(function () {
//     var lc_catalog = $('catalog.lc2016');
//
//
//     $('.product-card').each(function () {
//
//         $(this).find('.item:not(.banner)').each(function () {
//
//             var __curr_item = $(this);
//
//             $(this).find('button').click(function (event) {
//                 event.stopPropagation();
//
//                 console.log('item:button: click() !!');
//
//                 return false;
//             });
//
//
//             // ��������� ���� � ������� ��������� ������
//             $(this).find('#js-offer__callback').click(function (event) {
//                 event.stopPropagation();
//
//                 $('.js-modal, #js-overlay').fadeIn(500);
//                 $('body').addClass('open-modal');
//                 //console.log('js-offer__callback: click() !!');
//                 return false;
//             });
//             $('#js-overlay, .js-modal-close').on('click', function (e) {
//                 e.preventDefault();
//                 $('.js-modal, #js-overlay').fadeOut(300);
//                 $('body').removeClass('open-modal');
//             });
//
//
//             $(this).click(function () {
//
//                 //console.log('item #' + __curr_item.attr('shop_item_id') + ': click() !! to ' + __curr_item.find('a').attr('href'));
//
//                 window.location = __curr_item.find('a').attr('href');
//
//                 return false;
//             });
//
//
//             $(this).find("button.to_cart.order").click(function () {
//
//                 $.ajax({
//                     method: "POST",
//                     url: "/wp-admin/admin-ajax.php",
//                     data: {
//                         "action": "push_item",
//                         "session_id": session_id,
//                         "item_id": __curr_item.attr('shop_item_id'),
//                     }
//                 }).done(function (data) {
//
//                     var result = $.parseJSON(data);
//
//                     $(".basket-numbers").html(result.count);
//                     $(".basket-price").html(result.massege);
//
//                     $("#js-add-to-basket-window").slideDown('slow');
//                     setTimeout(function () {
//                         $("#js-add-to-basket-window").slideUp('slow');
//                     }, 2000);
//
//                     //cart_plus();
//
//                 }).fail(function (data) {
//                     //$(".basket-price").html('fail');
//                 });
//             });
//
//
//             $(this).find("button.to_cart.store").click(function () {
//
//                 $.ajax({
//                     method: "POST",
//                     url: "/wp-admin/admin-ajax.php",
//                     data: {
//                         "action": "push_item",
//                         "session_id": session_id,
//                         "item_id": __curr_item.attr('shop_item_id'),
//                         'option': 'from store',
//                     }
//                 }).done(function (data) {
//
//                     var result = $.parseJSON(data);
//
//                     $(".basket-numbers").html(result.count);
//                     $(".basket-price").html(result.massege);
//
//                     $("#js-add-to-basket-window").slideDown('slow');
//                     setTimeout(function () {
//                         $("#js-add-to-basket-window").slideUp('slow');
//                     }, 2000);
//
//                     //cart_plus();
//
//                 }).fail(function (data) {
//                     //$(".basket-price").html('fail');
//                 });
//             });
//         });
//     });
// });


$(document).ready(function () {
    cartWidgetRenew();

    $("item").each(function () {

        var item_id = $(this).attr("shop_item_id");

        $(this).find(".by_now").click(function () {

            $.ajax({
                method: "POST",
                url: "/cart_ops.php",
                data: {
                    "action": "push item",
                    "session_id": session_id,
                    "item_id": item_id
                }
            }).done(function (data) {

                var result = $.parseJSON(data);

                $(".basket-numbers").html(result.count);
                $(".basket-price").html(result.massege);

                //cart_plus();

            }).fail(function (data) {
                //$(".basket-price").html('fail');
            });
        });


        $(this).find('.warehouse-price').click(function () {

            console.log('warehouse-price:');
            console.log(parseInt($(this).find('p').html().replace(/\s/g, '')));

            $.ajax({
                method: "POST",
                url: "/cart_ops.php",
                data: {
                    "action": "push item",
                    "session_id": session_id,
                    "item_id": item_id,
                    'option': 'from store',
                }
            }).done(function (data) {

                var result = $.parseJSON(data);

                $(".basket-numbers").html(result.count);
                $(".basket-price").html(result.massege);

                //cart_plus();

            }).fail(function (data) {
                //$(".basket-price").html('fail');
            });

        });

    });
});

<!-- ������ ���������� ������ � ������� � ��������� �������� ������-->
$(document).ready(function () {
    $('#js-quick-card').each(function () {

        var __curr_item = $(this);

        $(this).find('button').click(function (event) {
            event.stopPropagation();

            console.log('button: click() !!');

            return false;
        });

        $(this).find("button.to_cart.order").click(function () {
            $.ajax({
                method: "POST",
                url: "/wp-admin/admin-ajax.php",
                data: {
                    "action": "push_item",
                    "session_id": session_id,
                    "item_id": __curr_item.attr('shop_item_id')
                }
            }).done(function (data) {
                console.log("push data");
                console.log(__curr_item.attr('shop_item_id'));
                var result = $.parseJSON(data);
                console.log(result);
                console.log(result.count);
                $(".basket-numbers").html(result.count);
                $(".basket-price").html(result.message);

                $("#js-add-to-basket-window").slideDown('slow');
                setTimeout(function () {
                    $("#js-add-to-basket-window").slideUp('slow');
                }, 2000);
            }).fail(function (data) {
                //$(".basket-price").html('fail');
            });
        });

        $(this).find("button.to_cart.store").click(function () {
            $.ajax({
                method: "POST",
                url: "/wp-admin/admin-ajax.php",
                data: {
                    "action": "push_item",
                    "session_id": session_id,
                    "item_id": __curr_item.attr('shop_item_id'),
                    'option': 'from_store',
                }
            }).done(function (data) {
                var result = $.parseJSON(data);

                $(".basket-numbers").html(result.count);
                $(".basket-price").html(result.message);

                $("#js-add-to-basket-window").slideDown('slow');
                setTimeout(function () {
                    $("#js-add-to-basket-window").slideUp('slow');
                }, 2000);
            }).fail(function (data) {
                //$(".basket-price").html('fail');
            });
        });


        // ��������� ���� � ������� ��������� ������
        $(this).find('#js-offer__callback').click(function (event) {
            event.stopPropagation();

            $('.js-modal, #js-overlay').fadeIn(500);
            $('body').addClass('open-modal');
            //console.log('js-offer__callback: click() !!');
            return false;
        });
        $('#js-overlay, .js-modal-close').on('click', function (e) {
            e.preventDefault();
            $('.js-modal, #js-overlay').fadeOut(300);
            $('body').removeClass('open-modal');
        });
    });
});


// ����� �������� ����� �� �������
// $(document).ready(function () {
//
//     $('#js-feedback-main').each(function () {
//
//         var fb_form = $(this);
//
//         fb_form.find('input').keyup(function () {
//             $(this).removeClass('wrong');
//         });
//
//         $(this).find('button[action="submit"]').click(function () {
//
//             var formData = {
//                 name: fb_form.find('input[name="name"]').val(),
//                 phone: fb_form.find('input[name="phone"]').val(),
//                 email: fb_form.find('input[name="email"]').val()
//             };
//
//             var __vaild = true;
//
//             //console.log(formData);
//             if (!formData['name']) {
//                 fb_form.find('input[name="name"]').addClass('wrong');
//                 __vaild = false;
//             }
//             if (!formData['phone']) {
//                 fb_form.find('input[name="phone"]').addClass('wrong');
//                 __vaild = false;
//             }
//             if (!formData['email']) {
//                 fb_form.find('input[name="email"]').addClass('wrong');
//                 __vaild = false;
//             }
//
//             if (__vaild) {
//
//                 $.ajax({
//                     type: 'post',
//                     url: '/subscribe_handler.php',
//                     response: 'text',
//                     data: {
//                         request_type: 'Lasercut feedback',
//                         name: formData['name'],
//                         phone: formData['phone'],
//                         email: formData['email']
//                     },
//                     success: function (data) {
//                         console.log('subscribe success');
//                     }
//                 }).done(function (msg) {
//                     console.log('subscribe done');
//                     console.log(msg);
//                     window.location = '/podpiska-main.html';
//                 }).fail(function (msg) {
//                     console.log('subscribe fail');
//                 });
//             } else {
//                 console.log('Feedback form: invalid');
//             }
//             return false;
//         });
//     });
// });


$(document).ready(function () {

    // ������� ����� (�������)
    // ������ ��� ��������, ������� ������ ���� ������
    $('.js-faq-card__answer').hide("slow");
    // ��� ����� �� �������� � ������� spoiler-title
    // ���������� ��� �������� �������, ������� ��� �� ���
    $('.js-faq-card__question').click(function () {
        $(this).next().toggle("slow");
        //$('.faq-card__question').css("border-bottom", "0");
    });


    // ������������ �����
    // fluidvids.init({
    //     selector: ['iframe', 'object'], // runs querySelectorAll()
    //     players: ['www.youtube.com', 'player.vimeo.com'] // players to support
    // });

    // ��������� ���� � ������� ��������� ������
    $('.js-offer__callback').on('click', function (e) {
        e.preventDefault();
        $('.js-modal, #js-overlay').fadeIn(500);
        $('body').addClass('open-modal');
    });

    $('#js-overlay, .js-modal-close').on('click', function (e) {
        e.preventDefault();
        $('.js-modal, #js-overlay').fadeOut(300);
        $('body').removeClass('open-modal');
    });

    // ��������� ���� ���������� �������
    $('.js-show-modal-frozen').on('click', function (e) {
        e.preventDefault();
        $('.js-modal-frozen, .js-overlay-frozen').fadeIn(500);
        $('body').addClass('open-modal-frozen');
    });

    $('.js-overlay-frozen, .js-modal-frozen-close').on('click', function (e) {
        e.preventDefault();
        $('.js-modal-frozen, .js-overlay-frozen').fadeOut(300);
        $('body').removeClass('open-modal-frozen');
    });

    // WOW.js � https://github.com/matthieua/WOW.git
    var wow = new WOW(
        {
            boxClass: 'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 50,          // distance to the element when triggering the animation (default is 0)
            mobile: true,       // trigger animations on mobile devices (default is true)
            live: true,       // act on asynchronously loaded content (default is true)
            scrollContainer: null // optional scroll container selector, otherwise use window
        }
    );
    wow.init();

    // �������� ����� ������� � �������
    $('.js-article__text').find('ul').addClass('triangular-marker');

    // �������
    $('.js-crosslink__list').slick({
        infinite: true,
        slidesToShow: 4,
        //centerMode: true,
        //centerPadding: '40px',
        slidesToScroll: 1,
        lazyLoad: 'ondemand',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 930,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Slider on Main Page
    $('.js-sliders-2018').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 7000,
        fade: true,
        speed: 1000,
        lazyLoad: 'ondemand'
    });

    // Gallery in detail card of product
    $('.js-gallery-2018-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.js-gallery-2018-slider-nav'
    });
    $('.js-gallery-2018-slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.js-gallery-2018-slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true
    });
});





// ������������
// � ����� ���������������� ��� ����������� api-maps.yandex
// $(document).ready(function () {
//     if (YMaps.location) {
//         if (YMaps.location.region !== '') {
//             var youRegion = (YMaps.location.city);
//             if (youRegion === "�����-���������") {
//                 $('.show-my-geo__phone').text('+7 (812) 309-98-04');
//                 $('.show-my-geo__city').text('(�����-���������)');
//                 $('.show-my-geo__delivery').text('�������� � ��������� � ���');
//             } else if (youRegion === "������") {
//                 $('.show-my-geo__phone').text('+7 (495) 268-12-99');
//                 $('.show-my-geo__city').text('(������)');
//                 $('.show-my-geo__delivery').text('�������� � ��������� � ���');
//             } else if (youRegion === "���������") {
//                 $('.show-my-geo__phone').text('+7 (861) 203-47-04');
//                 $('.show-my-geo__city').text('(���������)');
//                 $('.show-my-geo__delivery').text('�������� �� ���� ������');
//             } else {
//                 $('.show-my-geo__phone').text('+7 (800) 777-17-87');
//                 $('.show-my-geo__city').text('(������)');
//                 $('.show-my-geo__delivery').text('�������� �� ���� ������');
//             }
//         }
//     } else {
//         console.log('YMaps.location is unavailable');
//     }
// });
