function concatinMass(value, index) {
    k = 0;
    resulti = [];
    while (k != value.length) {
        resulti[k] = value[k] + index[k];
        k++;
    }
    //console.log(resulti);
    return resulti;
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


function declOfNum(number) {
    if (number > 21) {
        if ((number % 10 > 1) && (number % 10 <= 4)) {
            ret = 'человека';
        }
        else {
            ret = 'человек';
        }
    }
    else {
        if (number > 1 && number < 5) {
            ret = 'человека';
        }
        else {

            ret = 'человек';
        }
    }
    return ret;

}


function filter_submit(all_items, form_filter_class) {
    var return_massiv = [];
//------------------------------------------------------ фильтруем по цене----------------------------------------------------

    /*делаем все в цикле для эвсех свойств, которые у нас хранятся в массиве all_items, он у нас ассоциативный, такого вида all_items[i]['id_items'].
     i - порядковый номер
     all_items[i]['id_items'] - элемента id_items
     [i][title_propertys] - значение параметра. причем тут title_propertys это переменная принимающая значение $(this).children('.propertys_val').data('title');
     */

    var i = 0;
    // фильтруем по цене
    min_price = parseInt($('#input-number_left').val());
    max_price = parseInt($('#input-number_right').val());

    while (i != all_items.length) {

        return_massiv[i] = new Array();
        return_massiv.length = all_items.length;

        if (parseInt(all_items[i]['price']) >= min_price && parseInt(all_items[i]['price']) <= max_price) {
            return_massiv[i]['price'] = "visible";
        }
        else {
            return_massiv[i]['price'] = "invisible";
        }
        i++;
    }
    var filter_big_mass = [];
    filt_counter = 0;
    $('.wrap_spisok_poley').each(function () {

        main_title_array = $(this).find(".title_properti_value").html();
        filter_big_mass[filt_counter] = new Array();
        if ($(this).find(".title_properti_value").hasClass('int_class_wrapper')) {
            filter_big_mass[filt_counter]['type'] = "int";
            filter_big_mass[filt_counter]['title_perem'] = main_title_array;
            filter_big_mass[filt_counter]['min'] = $(this).find('.min_epta_elem').val();
            filter_big_mass[filt_counter]['max'] = $(this).find('.max_epta_elem').val();

        }
        else {
            filter_big_mass[filt_counter]['type'] = "string";
            filter_big_mass[filt_counter]['title_perem'] = main_title_array;
            filter_big_mass[filt_counter]['val'] = new Array();
            i = 0;
            $(this).find('.wrapper_ulochka').find('input:checked').each(function () {
                filter_big_mass[filt_counter]['val'][i] = $(this).val();
                i++;
            });

        }
        filt_counter++;
    });
    k = 0;

    // console.log(filter_big_mass);
    // console.log(all_items);

    counterFilterMass = 0;
    resultProm = 0;
    resultMass = new Array(all_items.length);
    resultMassiv = new Array(all_items.length);
    while (counterFilterMass < filter_big_mass.length) {
        counterElementsMass = 0;
        if (counterFilterMass > 1) {
            resultMassiv = concatinMass(resultMassiv, resultMass);
        }
        while (counterElementsMass < all_items.length) {

            if (filter_big_mass[counterFilterMass]['type'] == 'int') {
                /*
                 console.log('-----------------------------------------');
                 console.log('число ->'+all_items[counterElementsMass][filter_big_mass[counterFilterMass]['title_perem']]);
                 console.log('маx ->'+Number(filter_big_mass[counterFilterMass]['max']));
                 console.log('мin ->'+Number(filter_big_mass[counterFilterMass]['min']));
                 */
                if (Number(all_items[counterElementsMass][filter_big_mass[counterFilterMass]['title_perem']]) <= Number(filter_big_mass[counterFilterMass]['max']) && Number(all_items[counterElementsMass][filter_big_mass[counterFilterMass]['title_perem']]) >= Number(filter_big_mass[counterFilterMass]['min'])) {
                    resultProm = 0;
                    //	console.log('да');

                }
                else {
                    resultProm = +1;
                    //						console.log('нет');
                }
                /*
                 console.log(resultMass);
                 console.log('-----------------------------------------');
                 console.log('\n\n');*/
            }
            else {


            }
            resultMass[counterElementsMass] = +resultProm;
            counterElementsMass++;
        }

        counterFilterMass++;
    }
}

$(function () {

    $(".phone").inputmask("+7 (999) 999-99-99");

    popupper_locking = 0;
    potomu = 0;
    if (getCookie('potomu')) {

    }
    else {
        setCookie('potomu', 0);
    }

    if (getCookie('potomu') == 0) {


        $('html').mouseleave(function () {
            if (popupper_locking == 0) {
                $('.black_bg').css({"display": "block"}).animate({"opacity": "1"}, 300);
                popupper_locking = 1;                
            }
        });

        setInterval(function () {
            popupper_locking = 0;            
        }, 120000);

        $('.close_form_popupper').click(function () {
            $('.black_bg').animate({"opacity": "0"}, 300).css({"display": "none"});
            $('.popupper_form input').each(function () {

                switch ($(this).attr('type')) {
                    case 'submit':
                        break;
                    default:
                        $(this).val("");
                        break;
                }

            });
            //$('.popupper_form').find('input').val("");
        });

        $('.popupper_form').submit(function (e) {
            e.preventDefault();
            var www = $(this).find('input');
            console.log(www.parseJSON);
            if (www[0].value || www[0].value) {
                $.getJSON('/podpiska_price.php', www.serialize(), function (data) {
                    if (data.result == 1) {
                        setCookie('potomu', 1);
                        console.log("good");
                        window.location = '/podpiska-snizenie-cen.html';
                    }
                });

            }
        });
    }


    // фильтр для лазерных станков
    var array_items_propery = [];
    var i = 0, k = 0;
    $('.catalog_items').each(function () {
        array_items_propery[i] = new Array();
        array_items_propery[i]['id_items'] = $(this).attr('id');
        k = 0;
        $(this).find('.propertys ul li').each(function () {


            if ($(this).hasClass('custom_value')) {
                p = 0;
                title_propertys = $(this).data('title');
                array_items_propery[i][title_propertys] = new Array();

                $(this).find('.propertys_val').each(function () {
                    array_items_propery[i][title_propertys][p] = $(this).html();
                    p++;
                });

            }
            else {
                title_propertys = $(this).children('.propertys_val').data('title');
                if (title_propertys != undefined) {
                    arry = $(this).children('.propertys_val').html().split('|');
                    kol_arry = 0;
                    end_arry = [];
                    end_kol = 0;
                    while (kol_arry <= arry.length) {
                        if (arry[kol_arry] != "" && arry[kol_arry] != undefined) {
                            end_arry[end_kol] = arry[kol_arry];
                            end_kol++;
                        }
                        kol_arry++;
                    }
                    array_items_propery[i][title_propertys] = end_arry;
                }
            }

            k++;
        });
        i++;
    });
    i = 0;


    $('.button_filter_submit').click(function (e) {
        e.preventDefault();
        filter_submit(array_items_propery, "psevdo_form");

    });


    $('.title_property span').click(function () {
        if ($(this).hasClass('active_punct')) {
            $(this).removeClass('active_punct');
            parent = $(this).parent(".title_property");
            parent.next().addClass("inside_position");
        }
        else {
            $(this).addClass('active_punct');
            parent = $(this).parent(".title_property");
            parent.next().removeClass("inside_position");
        }
    });

    $('.wrapper_questions li').click(function () {

        height = $('.active_answer').height();
        $('.active_answer').animate({"height": 0}, 500, function () {
            $(this).css({"display": "none", "height": height});
            $(this).removeClass('active_answer');
        });
        height_now = $(this).find('.answer').height();
        $(this).find('.answer').css({"height": 0, "display": "block"});
        $(this).find('.answer').animate({"height": height_now}, 500).addClass('active_answer');
    });


    act = $('.active_tabs').data('tab');
    was = $('.' + act).css({"display": "block"});
    $('.tab').click(function () {
        was.css({"display": "none"});
        $('.active_tabs').removeClass('active_tabs');
        $(this).addClass('active_tabs');
        act = $(this).data('tab');
        was = $('.' + act).css({"display": "block"});
    });


    window.setTimeout(function () {
        $('span[class^=skype_pnh_print_container_]').removeClass('^skype_pnh_print_container_');
        $('span.skype_pnh_container').remove();
    }, 1000);
    var str = window.location.pathname;
    if (str.indexOf("komplektuyuschie") > -1) {
        if (str.indexOf("komplektuyuschie/komplektuyuschie-dlja-lazernyh-stankov/sistemy-ohlazhdenija-dlja-lazernoi-trubki") > -1) {

        }
        else {
            $('body').append('<style>catalog item price:nth-of-type(1):before{content:"прямо сейчас"!important;} </style>');
        }
    }


});


$(function () {


    if ($('.jcarousel').length > 0) {

        $('.jcarousel').jcarousel({
            wrap: 'both'
        });
        $('.jcarousel ul').css({"left": 0});


        $('.jcarousel-prev').jcarouselControl({
            target: '-=1'
        });

        $('.jcarousel-next').jcarouselControl({
            target: '+=1'
        });
    }
    //***********


    // Logo move from topmenu to topbar
    $("topbar logo").attr('class', ($(window).scrollTop() <= 60) ? 'hidden' : '');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 60) {
            if (!toplogo_show) {
                toplogo_show = true;
                $("topbar logo").attr('class', '');
            }

        } else {
            if (toplogo_show) {
                toplogo_show = false;
                $("topbar logo").attr('class', 'hidden');
            }
        }
    });



    //pages
    $("pages").each(function (pagesTagindex) {

        $(this).find("tabs tab").each(function (tabIndex) {

            $(this).click(function () {

                if ($(this).attr('class') != "selected") {

                    $(this).parent('tabs').find('tab').attr('class', '');
                    $(this).attr('class', 'selected');


                    $(this).parents('pages').find('page').attr('class', '');
                    $(this).parents('pages').find('page').each(function (pageIndex) {
                        $(this).attr('class', pageIndex == tabIndex ? 'selected' : '');
                    });

                }

            });
        });
    });


    //Photos and album

    $("album").photobox('a', {time: 0});    

    $("picture a:first-child").click(function () {

        switch ($(this).parent()[0].tagName) {
            case "PICTURE":

                if ($(this).parents("picture").find("album").length > 0) {

                    $(this).parents("picture").find("album a:first-of-type").trigger("click");
                    return false;

                }

                break;
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.up_mzf').fadeIn();
        } else {
            $('.up_mzf').fadeOut();
        }
    });

    $('.up_mzf').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
});