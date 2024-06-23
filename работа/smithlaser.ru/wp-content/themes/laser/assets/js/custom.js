
$(document).ready( function() {

    console.log('ready');
	
	$("#js-offer__callback").click(function () {
    var item = $(this).data('item');
    $("#callback-form").append(`<input type="hidden" name="tovar" value="${item}">`);
});

$('.close-now-see').click(function () {
                            $('.was_on_site').animate({'right': -1000}, 300);
                        });
	
    $('body').on('submit', '#feedback-form', function (e) {
        console.log('feedback');
        e.preventDefault();
        let _this = $(this);
        let data = _this.serializeArray();
        console.log(data);
        if (data) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    'action': 'send_email',
                    'formFields': data,
                },
                success: function (result) {
                    let json = $.parseJSON(result);
                    console.log(json);

                }
            });
        }
    });

    $('body').on('submit', '#catalog-subscribe', function (e) {
        e.preventDefault();
        let _this = $(this);
        let data = _this.serializeArray();
        if (data) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    'action': 'send_email',
                    'formFields': data,
                },
                success: function (result) {
                    let json = $.parseJSON(result);
                    console.log(json);

                }
            });
        }
    });
    $('body').on('submit', '#callback-form', function (e) {
        console.log('form#callback-form');
        e.preventDefault();
        let _this = $(this);
        let data = _this.serializeArray();
        if (data) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    'action': 'send_email',
                    'formFields': data,
                },
                success: function (result) {
                    let json = $.parseJSON(result);
                    console.log(json);
					 e.preventDefault();
            $('.js-modal, #js-overlay').fadeOut(300);
            $('body').removeClass('open-modal');
$('.was_on_site .message_text_block').html('Форма отправлена');
$('.was_on_site').animate({'right': 20}, 300);
                }
            });
        }
    });
    $('body').on('submit', 'form#calback-form-frozen', function (e) {
        console.log('form#calback-form-frozen');
        e.preventDefault();
        let _this = $(this);
        let data = _this.serializeArray();
        if (data) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    'action': 'send_email',
                    'formFields': data,
                },
                success: function (result) {
                    let json = $.parseJSON(result);
                    console.log(json);

                }
            });
        }
    });
    $('body').on('submit', 'form#order-form', function (e) {
        e.preventDefault();
        let price = $('body').find('#summary').text();
        console.log(price);
        $(this).append(`<input type="hidden" name="price" value="${price}">`);
        let items = [];
        $('.catalog-products__item').each(function () {
            items.push($(this).find(".catalog-products__title span").text());
        });
        console.log(items);
        let _this = $(this);
        let data = _this.serializeArray();
        if (data) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    'action': 'send_order',
                    'formFields': data,
                    'items' : items,
                },
                success: function (result) {
                    let json = $.parseJSON(result);
                    console.log(json);
                    _this.trigger('reset');
                $('.order-form a span#clean-basket').click();
                }
            });
        }
    });

    $('#searchform').hover(function(event){
        $(this).find('.search-field').fadeIn();
        },
        function(){
            $(this).find('.search-field').fadeOut();
    });

    function cleanBasket(e) {
        e.preventDefault();
        container = $('body').find('.order-form');
        console.log('finded');
        $.ajax({
            method: "POST",
            url: "/wp-admin/admin-ajax.php",
            data: {
                "action": "clean_basket",
            }
        }).done(function (data) {
            console.log(window.location.href);
            $.ajax({
                method: "GET",
                type: 'html',
                url: window.location.href,
            }).done(function(data){
                $(container).html($(data).find('.order-form'));
            })
        }).fail(function (data) {
            console.log(222);
        });
    }

    $('body').on('click', '.order-form a span#clean-basket', cleanBasket);
});
