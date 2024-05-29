/*
	var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '650',
                width: '100%',
                videoId: 'uzp7j5TvDlk',
				playerVars: { 'rel': 0, 'showinfo': 0 },
                events: {
                    'onReady': onPlayerReady,
                }
            });
        }

        function onPlayerReady(event) {
            $('.play-btn').click(function() {
                event.target.playVideo();
            });
        }
*/

	// Видео - начало

	  //соединяемся с API Youtube
	  var player;

	  function checkPosition(){
	  //функция проверки видимости элемента на jquery
	  var div_position = $('#player_video').offset();
	  var div_top = div_position.top;
	  var div_left = div_position.left;
	  var div_width = $('#player_video').width();
	  var div_height = $('#player_video').height();
	  var top_scroll = $(document).scrollTop();
	  var left_scroll = $(document).scrollLeft();
	  var screen_width = $(window).width()+div_width;
	  var screen_height = $(window).height();
	  var see_x1 = left_scroll;
	  var see_x2 = screen_width + left_scroll;
	  var see_y1 = top_scroll;
	  var see_y2 = top_scroll + screen_height;
	  var see_y3 = top_scroll + div_height*2;
	  var div_x1 = div_left;
	  var div_x2 = div_left + div_height;
	  var div_y1 = div_top;
	  var div_y2 = div_top + div_height;

	  if ($(document).scrollTop() + $(window).height() > $('#player_video').offset().top && $(document).scrollTop() - $('#player_video').offset().top < $('#player_video').height()){

	  //$('#player').show();
          //$('.video-home').hide();
	  //если элемент видим на экране, запускаем видео Youtube
	  if(player)
	      {
		  if(typeof player.playVideo == 'function')
		  {
				  if (($(document).scrollTop() + $(window).height() - $('#player_video').height() / 3 ) < $('#player_video').offset().top) {
				  //player.setVolume(25);
				  //console.log("111");
				  }
				  if (($(document).scrollTop() + $(window).height() - $('#player_video').height() / 3 ) > $('#player_video').offset().top && ($(document).scrollTop() - $('#player_video').offset().top) < ($('#player_video').height() / 3)) {
				  //player.setVolume(70);
				  //console.log("222");
				  }
				  if (($(document).scrollTop() - $('#player_video').offset().top) > ($('#player_video').height() / 3)) {
				  //player.setVolume(25);
				  //console.log("333");
				  }
				  player.playVideo();

			  }
		  }

	  }else{
	  //если не видим, ставим видео на паузу
	  if(player)
	      {
		  if(typeof player.playVideo == 'function')
		  {
				  player.pauseVideo();
			  }
		  }
	  }
	  }

	  
	  $(document).ready(function(){
	  //запускаем функцию проверки видимости элемента
	  $(document).scroll(function(){
	  checkPosition();
	  });
	  $(window).resize(function(){
	  checkPosition();
	  });
	  
	  //////Маска для телефона//////////////////////////
		[].forEach.call(document.querySelectorAll('.tel'), function (input) {
			var keyCode;
			function mask(event) {
				event.keyCode && (keyCode = event.keyCode);
				var pos = this.selectionStart;
				if (pos < 3) event.preventDefault();
				var matrix = "+7 (___) ___-__-__",
					i = 0,
					def = matrix.replace(/\D/g, ""),
					val = this.value.replace(/\D/g, ""),
					new_value = matrix.replace(/[_\d]/g, function (a) {
						return i < val.length ? val.charAt(i++) || def.charAt(i) : a
					});
				i = new_value.indexOf("_");
				if (i != -1) {
					i < 5 && (i = 3);
					new_value = new_value.slice(0, i)
				}
				var reg = matrix.substr(0, this.value.length).replace(/_+/g,
					function (a) {
						return "\\d{1," + a.length + "}"
					}).replace(/[+()]/g, "\\$&");
				reg = new RegExp("^" + reg + "$");
				if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
				if (event.type == "blur" && this.value.length < 5) this.value = ""
			}

			input.addEventListener("input", mask, false);
			input.addEventListener("focus", mask, false);
			input.addEventListener("blur", mask, false);
			input.addEventListener("keydown", mask, false)

		});

	  });

	  $.getScript( "https://www.youtube.com/iframe_api", function( data, textStatus, jqxhr ) {
	  function onYouTubeIframeAPIReady() {
	  //рисуем видеопроигрыватель Youtube
	  player = new YT.Player('player_video', {
	  width: '100%', height: '650', //размеры окна видео
	  playerVars: { 'autoplay': 0, 'controls': 1, 'showinfo': 0, 'rel': 0}, //тонкие настройки видеопроигрывателя
	  videoId: 's7kbVr32edE', //здесь id ролика
		  events: {
		  'onReady': onPlayerReady
		}
	  });
	  }

	  onYouTubeIframeAPIReady();

	  function onPlayerReady(event) {
		event.target.setVolume(0);
        checkPosition();


	  $('#player_video').on('mouseover',function(){
		event.target.setVolume(70);
	  });

	  $('#player_video').on('mouseout',function(){
		event.target.setVolume(0);
	  });
      }

	 });



	//Видео - конец

jQuery(document).ready(function() {


$(document).on("click", ".tabs__content a",  function(e) {
	e.preventDefault();
	gallery = $(this).closest('.tabs__content').find('.photo_json');
	click_id = $(this).data('foto');
	click_index = 0;

	for (var t = gallery.data("gallery"), n = [], i = 0; i < t.length; i++) {
		 if (t[i].id == click_id) click_index = i;
         var o = {
         src: t[i].src
         };
        t[i].caption && (o.caption = t[i].caption), n.push(o)
    }

	$.fancybox.open(n, {
        loop: true,
	  arrows  : false,
	  buttons : [
		'slideShow',
		'fullScreen',
		'thumbs'
		],
	  animationEffect : "fade",
	  afterLoad : function( instance, current ) {
		if ( instance.group.length > 1 && current.$content ) {
		  current.$content.append('<a data-fancybox-next class="button-next" href="javascript:;">&rsaquo;</a><a data-fancybox-prev class="button-previous" href="javascript:;">&lsaquo;</a>');
		}

		current.$content.append('<a data-fancybox-close class="button-close" href="javascript:;">×</a>');
	  },
	  beforeShow : function( instance, current ) {
		instance.update();
		}
    }, click_index)

})

	$('div[data-html]').each(function() {
	   var testdata = $(this).data('html');
			console.log(testdata);
			var addelement = $(this);
			$.ajax({
				type:'POST',
				url: "/ajax/block_temp.php",
				data: {id : testdata},
				cache:false,
				success:function(result){
					if(testdata){
						addelement.after(result);
					}
				}
			});
	});

	$('#block_instagram').each(function() {
			var addelement = $(this);
			$.ajax({
				type:'POST',
				url: "/ajax/block_instagram.php",
				data: {id : 'block_instagram'},
				cache:false,
				success:function(result){
						addelement.after(result);
				}
			});
	});

    $("body").on("click", ".no_index", function(){
	url = $(this).data("href");
	window.open(url, '_blank');
    });

    /*
    $('.play-btn').click(function() {
            $('#player').show();
            $('.video-home').hide();
    });
    */

	var pageurl = document.location.href;

	jQuery('.open-popup-link').magnificPopup({
		type: 'inline',
		midClick: true
	});


  jQuery.datetimepicker.setLocale('ru');
  if ($("#datetimepicker").length > 0) {
    $('#datetimepicker').datetimepicker({
      format: 'd.m.Y H:i',
      minDate: 0,
      minTime: '09:00',
      step: 15,
      maxTime: '20:00',
      dayOfWeekStart: 1
    });
  }

  $("[data-fancybox]").fancybox({
    loop: false,
    infobar: false,
    toolbar: "auto",
    keyboard: true,
	arrows  : false,
	buttons: [
			//"zoom",
			//"share",
			//"slideShow",
			//"fullScreen",
			//"download",
			//"thumbs",
			"close"
	]

  });

  $(".fancybox").fancybox({
	   loop: true,
	  arrows  : false,
	  buttons : [
		'slideShow',
		'fullScreen',
		'thumbs'
		],
	  animationEffect : "fade",
	  afterLoad : function( instance, current ) {
		if ( instance.group.length > 1 && current.$content ) {
		  current.$content.append('<a data-fancybox-next class="button-next" href="javascript:;">&rsaquo;</a><a data-fancybox-prev class="button-previous" href="javascript:;">&lsaquo;</a>');
		}

		current.$content.append('<a data-fancybox-close class="button-close" href="javascript:;">×</a>');
	  },
	  beforeShow : function( instance, current ) {
		instance.update();
		}
  });

  $('.go_to').click(function() {
    var scroll_el = $(this).attr('href');
    if ($(scroll_el).length != 0) {
      $('html, body').animate({
        scrollTop: $(scroll_el).offset().top
      }, 500);
    }
    return false;
  });

  /*
    $('.play-btn').click(function() {
		$('#video-home').addClass('active');
		$(this).parent().css('display', 'none');
		  $('.video-home').addClass('visible');
		$('#video-home').get(0).play();
    });
*/


  //$("#call_phone").mask("+7 (999) 999-99-99");
  //$("#consul_phone").mask("+7 (999) 999-99-99");
  //$("#zapis_phone").mask("+7 (999) 999-99-99");
  //$("#question_phone").mask("+7 (999) 999-99-99");
  //$("#contact_phone2").mask("+7 (999) 999-99-99");

  $('.vse-tegi').click(function() {
    if ($('.tag-cat').hasClass('active')) {
      $('.tag-cat').removeClass('active');
      $(this).html('Все варианты');
    } else {
      $('.tag-cat').addClass('active');
      $(this).html('Скрыть');
    }
  });


  var topMargin = jQuery('header').outerHeight();
  jQuery(window).scroll(function() {
    var width = jQuery(window).width();
    var top = jQuery(document).scrollTop();
  if (width > '767') {
    if (top > '130') {
      jQuery('.header-bottom').addClass('scroll');
      jQuery('header').addClass('scroll');
      jQuery('header').next().next().css('margin-top', topMargin);
    } else {
      jQuery('.header-bottom').removeClass('scroll');
      jQuery('header').removeClass('scroll');

      jQuery('header').next().next().css('margin-top', 0);
    };
      };
  });


  // Кнопка Еще в услугах

  if ($(window).width() < '576') {
    $('.uslugi-menu.services').find('.services-item_title').append('<div class="services-item_title-arrow"></div>');
    $('.uslugi-menu.services').find('.services-item_title-arrow').click(function() {
      $(this).toggleClass('open');
      $(this).closest('.services-item_box').find('.services-item_box-link').slideToggle('open');
    });
    $('.uslugi-menu.services').find('.menu-top-mobile .dropdown-link').append('<div class="menu-top-mobile-arrow"></div>');
    $('.uslugi-menu.services').find('.menu-top-mobile-arrow').click(function() {
      $(this).toggleClass('open');
      $(this).prev().slideToggle('open');
    });
  };


  if ($(window).width() > '576') {
    $('.services-item_box').each(function() {

      var t = $(this).find('ul').children().length;
      if (t > 5) {
        $(this).append('<div class="services-item_more">Еще</div>');
      }
      $(this).find('.services-item_more').click(function() {
        $(this).parent().find('.services-item_box-link').toggleClass('open');
        if ($(this).parent().find(".services-item_box-link").hasClass("open")) {
          $(this).html("Скрыть");
          $(this).addClass("pclose");
        } else {
          $(this).html("Еще");
          $(this).removeClass("pclose");
        }
      });
    });
  }

  $('.price-all-box').click(function() {
    $(this).find('.price-all-box-positions').slideToggle();

  });
  // показывать,скрыть поиск
  $('#showSearchInp').click(function() {
    if ($(".header__search--input-box").data('search_click')) {
      $(".header__search--input-box").fadeOut();
      $('.header-bottom.scroll .header-bottom-right-block_social').fadeIn();
      $(".header__search--input-box").data('search_click', false);
      $(this).removeClass('active');
	  if ($("#search input").val() != ''){
      $("#search").submit();
	  }
    } else {
      $(".header__search--input-box").fadeIn();
      $(".header__search--input-box").focus();
      $('.header-bottom.scroll .header-bottom-right-block_social').fadeOut();

      $(this).addClass('active');
      $(".header__search--input-box").data('search_click', true);

    }
  });

  $('#showSearchInp .search-btn').click(function() {
    $("#search").submit();
  });

  $('#search-mobile .search-btn').click(function() {
    $("#search-mobile").submit();
  });

  $(document).on('mouseup touchend', function(e) {
    var div = $("#showSearchInp");
    var next = div.next();
    if (!div.is(e.target) && !next.is(e.target) && div.has(e.target).length === 0) {
      div.data('search_click', false);
      div.removeClass('active');
      next.fadeOut();
    }
  });

  jQuery('.portfolio-carousel').flickity({
    cellAlign: 'center',
    pageDots: false,
wrapAround: true,
    contain: true,
    prevNextButtons: false
  });
  jQuery('.portfolio-carousel-nav').flickity({
    cellAlign: 'center',
wrapAround: true,
    pageDots: false,
    asNavFor: '.portfolio-carousel',
    contain: true,
    arrowShape: 'M31.106,15H3.278l8.325-8.293  c0.391-0.391,0.391-1.024,0-1.414c-0.391-0.391-1.024-0.391-1.414,0l-9.9,9.899c-0.385,0.385-0.385,1.029,0,1.414l9.9,9.9  c0.391,0.391,1.024,0.391,1.414,0c0.391-0.391,0.391-1.024,0-1.414L3.278,17h27.828c0.552,0,1-0.448,1-1  C32.106,15.448,31.658,15,31.106,15z'
  });

  var $carousels = jQuery('.portfolio-carousel-nav');

  // sync Flickity instances
  // select index on any Flickity select
  $carousels.on('select.flickity', function(event) {
    var $target = jQuery(event.currentTarget);
    var flkty = $target.data('flickity');
    var selectedIndex = flkty.selectedIndex;
    $carousels.each(function(i, carousel) {
      var $carousel = jQuery('.portfolio-carousel');
      flkty = $carousel.data('flickity');
      if (flkty.selectedIndex != selectedIndex) {
        $carousel.flickity('select', selectedIndex);
      }
    });
  });

  jQuery.scrollUp({
    animation: 'fade',
    activeOverlay: '#00FFFF',
    scrollText: '',
  });

  var wrapperMenu = document.querySelector('.menu-btn-box');
  wrapperMenu.addEventListener('click', function() {
    wrapperMenu.classList.toggle('open');
    $('.uslugi-menu').toggleClass('open');
  });

  $('.close-uslugi-menu').click(function() {
    wrapperMenu.classList.toggle('open');
    $('.uslugi-menu').toggleClass('open');

  });

  var wrapperMenumobile = document.querySelector('.menu-btn-box-mobile');
  wrapperMenumobile.addEventListener('click', function() {
    wrapperMenumobile.classList.toggle('open');
    $('.uslugi-menu').toggleClass('open');
    $('.menu-top-mobile').toggleClass('open');
    $('.search-mobile').toggleClass('open');
  });

  if ($(".js-carousel").length > 0) {
    var dot = '<svg width="36" height="36" class="svg-dot" data-percent="100"><circle class="svg-dot--circle" cx="16" cy="16" r="11"></circle><circle class="svg-dot--animation" cx="16" cy="16" r="11"></circle></svg>';
    $(".js-carousel--item").attr("data-dot", dot);
    $(".js-carousel").addClass("owl-carousel").owlCarousel({
      items: 1,
      autoplay: true,
      dotsData: true,
      loop: true,
      nav: true,
      navText: ['', '']
    });
  }

	if ($(".podpiska-aksii-slider").length > 0) {
		$(".podpiska-aksii-slider").addClass("owl-carousel").owlCarousel({
			items: 1,
			stagePadding: 1,
			margin: 0,
			autoplay: true,
			dots: false,
			loop: true,
			nav: true,
			navText: ['', '']
		});
	}

  if ($(".js-carousel-reviews").length > 0) {

		var owlreviews = $(".js-carousel-reviews").addClass("owl-carousel");

    owlreviews.owlCarousel({
      items: 1,
      stagePadding: 180,
      margin: 40,
      autoplay: true,
			autoplayTimeout:4000,
			autoplayHoverPause:false,
      dots: true,
      loop: true,
      nav: true,
      navText: ['', ''],
      responsive: {
        0: {
          stagePadding: 0
        },
        480: {
          stagePadding: 0
        },
        768: {
          stagePadding: 0
        },
        991: {
          stagePadding: 120
        },
        1200: {
          stagePadding: 180
        }
      }
    });
	  $('.js-carousel-reviews').on('mouseenter',function(){ //Kiedy myszka najedzie na element slidera
	      owlreviews.trigger('stop.owl.autoplay'); // Zatrzymaj przewijanie slidera
	  })
	  $('.js-carousel-reviews').on('mouseleave',function(){ //Kiedy kursor wyjedzie z slidera
     owlreviews.trigger('play.owl.autoplay',[1000]); // Rozpocznij przewijanie
	  });
  }



  if ($(".js-carousel-doctors").length > 0) {
    $(".js-carousel-doctors").addClass("owl-carousel").owlCarousel({
      items: 2,
      margin: 0,
      autoplay: false,

      dots: false,
      loop: true,
      nav: true,
      navText: ['', ''],
      responsive: {
        0: {
          autoHeight: true,
          items: 1
        },
        480: {
          autoHeight: true,
          items: 1
        },
        768: {
          autoHeight: false,
          items: 1
        },
        991: {
          items: 2
        },
        1200: {
          items: 2
        }
      }
    });
  }

  if ($(".js-carousel-news-home").length > 0) {
    $(".js-carousel-news-home").addClass("owl-carousel").owlCarousel({
      items: 3,
      stagePadding: 1,
      margin: 0,
      autoplay: true,
      dots: true,
      loop: true,
      nav: true,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        577: {
          items: 2
        },
        768: {
          items: 2
        },
        991: {
          items: 3
        },
        1200: {
          items: 3
        }
      }
    });
  }

  $("#content_1").mCustomScrollbar({
    scrollInertia: 550,
    horizontalScroll: true,
	//contentTouchScroll:false,
    mouseWheel: true,
    autoDraggerLength: false,
    scrollButtons: {
      enable: true,
      scrollType: "pixels",
      scrollAmount: 300
    },
    callbacks: {
      onScroll: function() {
        snapScrollbar();
      }
    }
  });

$("#content_1").on("touchstart", function() {
	//console.log(23232);

});

  var content = $("#content_1");
  $("a[rel='toggle-buttons-scroll-type']").html("<code>scrollType: \"" + content.data("scrollButtons_scrollType") + "\"</code>");
  $("a[rel='toggle-buttons-scroll-type']").click(function(e) {
    e.preventDefault();
    var scrollType;
    if (content.data("scrollButtons_scrollType") === "pixels") {
      scrollType = "continuous";
    } else {
      scrollType = "pixels";
    }
    content.data({
      "scrollButtons_scrollType": scrollType
    }).mCustomScrollbar("update");
    $(this).html("<code>scrollType: \"" + content.data("scrollButtons_scrollType") + "\"</code>");
  });

  var snapTo = [];
  function windowSize() {
    $("#content_1 .images_container .sert-item").each(function() {
      if ($(window).width() <= '577') {
        var $this = $(this),
          thisX = $this.position().left - 0;
        snapTo.push(thisX);
      } else {
        var $this = $(this),
          thisX = $this.position().left - 40;
        snapTo.push(thisX);
      }
    });
  };
  $(window).on('load resize', windowSize);

  function snapScrollbar() {
    var posX = $("#content_1 .mCSB_container").position().left,
      closestX = findClosest(Math.abs(posX), snapTo);
    $("#content_1").mCustomScrollbar("scrollTo", closestX, {
      scrollInertia: 350,
      callbacks: false
    });
  }

  function findClosest(num, arr) {
    var curr = arr[0];
    var diff = Math.abs(num - curr);
    for (var val = 0; val < arr.length; val++) {
      var newdiff = Math.abs(num - arr[val]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = arr[val];
      }
    }
    return curr;
  }

  //redy

  	$("input[name=radio-clinic]").on("change", function() {

		$url = '//'+window.location.hostname+'/ajax/get_doctors.php';
		var doc = $(this).data("clinik");

		$.ajax({
			url: $url,
			type: 'POST',
			data: {doc : doc},
			success: function(result) {

					$(".js-carousel-doctors").owlCarousel('destroy');

					$(".js-carousel-doctors").removeClass("owl-loaded");
					$(".js-carousel-doctors").removeClass("owl-drag");

					$(".js-carousel-doctors").html(result.html);

				    $owl = $(".js-carousel-doctors").owlCarousel({
					  items: 2,
					  margin: 0,
					  autoplay: false,
					  dots: false,
					  loop: true,
					  nav: true,
					  navText: ['', ''],
					  responsive: {
						0: {
						  items: 1
						},
						480: {
						  items: 1
						},
						768: {
						  items: 1
						},
						991: {
						  items: 2
						},
						1200: {
						  items: 2
						}
					  }
					});
		   }
		});

	});

	$("input[name=zapis_name]").on("change", function() {
	$("#zapis_form").find("button").removeAttr("disabled");
	});

	$('#zapis_form').on('submit', function(e){
		e.preventDefault();
	});

	$("#zapis_form").validate({
    rules: {
      zapis_name: {
        required: true,
      },
      zapis_phone: {
        required: true,
      },
	  checkbox_zapis: {
        required: true,
      },
	  datetimepicker: {
        required: true,
      },
    },
    messages: {
      zapis_name: {
        required: "Это поле обязательно для заполнения",
      },
      zapis_phone: {
        required: "Это поле обязательно для заполнения",
      },
	  checkbox_zapis: {
        required: "Чекбокс обязателен для выбора",
      },
	  datetimepicker: {
        required: "Это поле обязательно для заполнения",
      },
    },
    submitHandler: function(form) {

		$url = '//'+window.location.hostname+'/ajax/form_zapis.php';
		var datas = $('#zapis_form').serialize()+'&url='+pageurl;
		$(form).find('button[type=submit]').attr('disabled', 'disabled');

		$.ajax({
			url: $url,
			type: 'POST',
			data: datas,
			success: function(result) {

				$('#zapis_form').find('input:not(.not_clear)').val('');
				$(form).find('button[type=submit]').prop("disabled", false);
				
				var magnificPopup = $.magnificPopup.instance;
				magnificPopup.close();

				$.magnificPopup.open({
				  items: {
					src: '#call-order'
				  },
				  type: 'inline'
				});

				setTimeout(function(){
						var magnificPopup = $.magnificPopup.instance;
						magnificPopup.close();
				},3000);

				sendEvent('admission', 'admission');

		   }
		});
    }
	});

	$("#form-contact-call input, #form-consul input ").on("change keyup", function() {
		$(this).closest('form').find("*[type=submit]").removeAttr("disabled");
		$(this).closest('form').find("input[name=spam_check]").val("Y");
	});

	$('#form-contact-call').on('submit', function(e){
		e.preventDefault();
	});

	$("#form-contact-call").validate({
    rules: {
      call_name: {
        required: true,
      },
      call_phone: {
        required: true,
      },
	  checkbox_call: {
        required: true,
      },
    },
    messages: {
      call_name: {
        required: "Это поле обязательно для заполнения",
      },
      call_phone: {
        required: "Это поле обязательно для заполнения",
      },
	  checkbox_call: {
        required: "Чекбокс обязателен для выбора",
      },
    },
    submitHandler: function(form) {

		$url = '//'+window.location.hostname+'/ajax/form_call.php';
		var datas = $('#form-contact-call').serialize()+'&url='+pageurl;
		$(form).find('button[type=submit]').attr('disabled', 'disabled');
		
		$.ajax({
			url: $url,
			type: 'POST',
			data: datas,
			success: function(result) {

				$('#form-contact-call').find('input:not(.not_clear)').val('');
				$(form).find('button[type=submit]').prop("disabled", false);
				
				var magnificPopup = $.magnificPopup.instance;
				magnificPopup.close();

				$.magnificPopup.open({
				  items: {
					src: '#call-order'
				  },
				  type: 'inline'
				});

				setTimeout(function(){
						var magnificPopup = $.magnificPopup.instance;
						magnificPopup.close();
				},3000);

				sendEvent('callback', 'callback');

		   }
		});
    }
	});

	$.validator.addMethod("consul_name", function( value, element ) {
	  $.validator.messages.consul_name = '';
	  return this.optional( element ) || /[а-яё]/i.test( value );
	});

    $('#form-consul input[name=consul_name]').on('input', function(){ $('#form-consul input[name=submit]').removeAttr('disabled'); $('#form-consul input[name=not_spam]').val('');})

	$('#form-consul').on('submit', function(e){
		e.preventDefault();
	});

	$("#form-consul").validate({
    rules: {
      consul_name: {
        required: true,
		consul_name: true
      },
      consul_phone: {
        required: true,
      },
	  consul_text: {
        required: true,
      },
      consul_email: {
        required: true,
      },
	  consul_checkbox: {
        required: true,
      },
    },
    messages: {
      consul_name: {
        required: "Это поле обязательно для заполнения",
      },
      consul_phone: {
        required: "Это поле обязательно для заполнения",
      },
	  consul_text: {
        required: "Это поле обязательно для заполнения",
      },
      consul_email: {
        required: "Это поле обязательно для заполнения",
      },
	  consul_checkbox: {
        required: "Чекбокс обязателен для выбора",
      },
    },
    submitHandler: function(form) {

		$url = '//'+window.location.hostname+'/ajax/form_consul.php';
		var datas = $('#form-consul').serialize()+'&url='+pageurl;
		$(form).find('button[type=submit]').attr('disabled', 'disabled');

		$.ajax({
			url: $url,
			type: 'POST',
			data: datas,
			success: function(result) {

				$('#form-consul').find('input:not(.not_clear)').val('');
				$('#form-consul').find('textarea').val('');
				$(form).find('button[type=submit]').prop("disabled", false);

				var magnificPopup = $.magnificPopup.instance;
				magnificPopup.close();

				$.magnificPopup.open({
				  items: {
					src: '#call-order'
				  },
				  type: 'inline'
				});

				setTimeout(function(){
						var magnificPopup = $.magnificPopup.instance;
						magnificPopup.close();
				},3000);

				sendEvent('feedback', 'feedback');

		   }
		});
    }
	});

  	$("#form_question input").on("change keyup", function() {
		$(this).closest('form').find("*[type=submit]").removeAttr("disabled");
	});

	$('#form_question').on('submit', function(e){
		e.preventDefault();
	});

	$("#form_question").validate({
    rules: {
      question_name: {
        required: true,
      },
      question_phone: {
        required: true,
      },
	  question_email: {
        required: true,
      },
	  question_checkbox: {
        required: true,
      },
    },
    messages: {
      question_name: {
        required: "Это поле обязательно для заполнения",
      },
      question_phone: {
        required: "Это поле обязательно для заполнения",
      },
	  question_email: {
        required: "Это поле обязательно для заполнения",
      },
	  question_checkbox: {
        required: "Чекбокс обязателен для выбора",
      },
    },
    submitHandler: function(form) {

		$url = '//'+window.location.hostname+'/ajax/form_question.php';
		var datas = $('#form_question').serialize()+'&url='+pageurl;
		$(form).find('button[type=submit]').attr('disabled', 'disabled');

		$.ajax({
			url: $url,
			type: 'POST',
			data: datas,
			success: function(result) {

				$('#form_question').find('input:not(.not_clear)').val('');
				$('#form_question').find('textarea').val('');
				$(form).find('button[type=submit]').prop("disabled", false);
				
				var magnificPopup = $.magnificPopup.instance;
				magnificPopup.close();

				$.magnificPopup.open({
				  items: {
					src: '#call-order'
				  },
				  type: 'inline'
				});

				setTimeout(function(){
						var magnificPopup = $.magnificPopup.instance;
						magnificPopup.close();
				},3000);

				sendEvent('feedback', 'feedback');

		   }
		});
    }
	});

	$("#form_zapis_small input").on("change keyup", function() {
		$(this).closest('form').find("*[type=submit]").removeAttr("disabled");
	});

	$('#form_zapis_small').on('submit', function(e){
		e.preventDefault();
	});

	$("#form_zapis_small").validate({
    rules: {
      zapis_name: {
        required: true,
      },
      zapis_phone: {
        required: true,
      },
	  zapis_email: {
        required: true,
      },
      consul_checkbox: {
        required: true,
      },
    },
    messages: {
      zapis_name: {
        required: "Это поле обязательно для заполнения",
      },
      zapis_phone: {
        required: "Это поле обязательно для заполнения",
      },
	  zapis_email: {
        required: "Это поле обязательно для заполнения",
      },
	  consul_checkbox: {
        required: "Чекбокс обязателен для выбора",
      },
    },
    submitHandler: function(form) {

		$url = '//'+window.location.hostname+'/ajax/form_zapis_small.php';
		var datas = $('#form_zapis_small').serialize()+'&url='+pageurl;
		$(form).find('button[type=submit]').attr('disabled', 'disabled');
		
		$.ajax({
			url: $url,
			type: 'POST',
			data: datas,
			success: function(result) {

				$('#form_zapis_small').find('input:not(.not_clear)').val('');
				$('#form_zapis_small').find('textarea').val('');
				$(form).find('button[type=submit]').prop("disabled", false);
				
				var magnificPopup = $.magnificPopup.instance;
				magnificPopup.close();

				$.magnificPopup.open({
				  items: {
					src: '#call-order'
				  },
				  type: 'inline'
				});

				setTimeout(function(){
						var magnificPopup = $.magnificPopup.instance;
						magnificPopup.close();
				},3000);

				sendEvent('admission', 'admission');

		   }
		});
    }
	});




    $("#doctor_filter select").on("change", function() {
		var datas = {};

		datas['clinik'] = $( "#doctor_filter select[name=clinik]").val();
		datas['spec'] = $( "#doctor_filter select[name=spec]").val();
		datas['gender'] = $( "#doctor_filter select[name=gender]").val();

		jQuery.ajax({
				type: 'GET',
				url: "/ajax/get_doctor_filters.php",
				data: datas,
				success: function (result) {
					$(".doctor_html").html(result.html);

					if (result.last == true || result.html == ""){

					  $('.doctors-more').hide();

					}else{

						$('.doctors-more').show();
					}
					console.log(result);
					return false;
				}
		});

		return false;

	});


   $('.reviews-page-more').click(function() {

		var viewed = [];
		var datas = {};
		$(".reviews-page .reviews-page-box").each(function() {
		  viewed.push($( this ).data("id"));
		});

		datas['ids'] = viewed;


		jQuery.ajax({
				type: 'GET',
				url: "/ajax/get_reviews.php",
				data: datas,
				success: function (result) {
					$(".reviews-page .col-md-12").before(result.html);

					if (result.last == true || result.html == ""){

					  $('.reviews-page-more').hide();

					}
					console.log(result);
					return false;
				}
		});

		return false;

	});

    $('html').on("click", '.doctors-more:not(.filters)', function() {
		var viewed = [];
		var datas = {};
		$(".doctors .data_doctor").each(function() {
		  viewed.push($( this ).data("doctor"));
		});

		datas['ids'] = viewed;

		var attr = $(this).attr('data-section');

		if (typeof attr !== typeof undefined && attr !== false) {
		  datas['section'] = attr;
		}

		jQuery.ajax({
				type: 'GET',
				url: "/ajax/get_more.php",
				data: datas,
				success: function (result) {
					$(".doctors .doctors-more").before(result.html);

					if (result.last == true || result.html == ""){

					  $('.doctors-more').hide();

					}
					console.log(result);
					return false;
				}
		});

		return false;

	});

	$('.doctors-more.filters').click(function() {

		var viewed = [];
		var datas = {};
		$(".doctors .data_doctor").each(function() {
		  viewed.push($( this ).data("doctor"));
		});

		datas['ids'] = viewed;

		var attr = $(this).attr('data-section');

		if (typeof attr !== typeof undefined && attr !== false) {
		  datas['section'] = attr;
		}

		datas['clinik'] = $( "#doctor_filter select[name=clinik]").val();
		datas['spec'] = $( "#doctor_filter select[name=spec]").val();
		datas['gender'] = $( "#doctor_filter select[name=gender]").val();

		jQuery.ajax({
				type: 'GET',
				url: "/ajax/get_doctor_filters.php",
				data: datas,
				success: function (result) {
					$(".doctor_html").append(result.html);

					if (result.last == true || result.html == ""){

					  $('.doctors-more').hide();

					}else{

					  $('.doctors-more').show();

					}
					console.log(result);
					return false;
				}
		});

		return false;

	});

	$('.foto-more').click(function() {

		var viewed = [];
		var datas = {};
		$(".tabs__content.active li").each(function() {
		  viewed.push($( this ).data("foto"));
		});

		datas['ids'] = viewed;

		var attr = $(".tabs__content.active").data("section");
		var number = $(".tabs__content.active").data("number");

		if (typeof attr !== typeof undefined && attr !== false) {
		  datas['section'] = attr;
		}

		if (typeof number !== typeof undefined && number !== false) {
		  datas['number'] = number;
		}

		jQuery.ajax({
				type: 'GET',
				url: "/ajax/get_photo.php",
				data: datas,
				success: function (result) {
					$(".tabs__content.active .box2").append(result.html);

					if (result.last == true || result.html == ""){

					  $(".tabs__content.active").attr("data-last", "true");
					  $('.foto-more').hide();

					}

					return false;
				}
		});

		return false;

	});

	$('.tabs-sert-more').click(function() {

		var viewed = [];
		var datas = {};
		$(".tabs-sert .tabs__content.active .col-md-6").each(function() {
		  viewed.push($( this ).data("id"));
		});

		datas['ids'] = viewed;

		var attr = $(".tabs__content.active").data("section");

		if (typeof attr !== typeof undefined && attr !== false) {
		  datas['section'] = attr;
		}

		jQuery.ajax({
				type: 'GET',
				url: "/ajax/get_sert.php",
				data: datas,
				success: function (result) {
					$(".tabs__content.active .tabs-sert-more-razdel").before(result.html);

					if (result.last == true || result.html == ""){

					  $(".tabs__content.active").attr("data-last", "true");
					  $('.tabs__content.active .tabs-sert-more').hide();

					}

					return false;
				}
		});

		return false;

	});


	$('.news-more').click(function() {

		var viewed = [];
		var datas = {};
		$(".news-page--ul .news-page--item").each(function() {
		  viewed.push($( this ).data("news"));
		});

		datas['ids'] = viewed;

		jQuery.ajax({
				type: 'GET',
				url: "/ajax/get_news.php",
				data: datas,
				success: function (result) {
					$(".news-page--ul").append(result.html);

					if (result.last == true || result.html == ""){

					  $('.news-more').hide();

					}
					console.log(result);
					return false;
				}
		});

		return false;

	});

	$('.articles-more').click(function() {

		var viewed = [];
		var datas = {};
		$(".news-page--ul .news-page--item").each(function() {
		  viewed.push($( this ).data("news"));
		});

		datas['ids'] = viewed;

		jQuery.ajax({
				type: 'GET',
				url: "/ajax/get_articles.php",
				data: datas,
				success: function (result) {
					$(".news-page--ul").append(result.html);

					if (result.last == true || result.html == ""){

					  $('.articles-more').hide();

					}
					console.log(result);
					return false;
				}
		});

		return false;

	});

	$('.page-doposle-more').click(function() {

		var viewed = [];
		var datas = {};
		$(".page-doposle .col-md-4").each(function() {
		  viewed.push($( this ).data("id"));
		});

		datas['ids'] = viewed;

		jQuery.ajax({
				type: 'GET',
				url: "/ajax/get_doposle.php",
				data: datas,
				success: function (result) {
					$(".page-doposle .page-doposle-more-razdel").before(result.html);

					if (result.last == true || result.html == ""){

					  $('.page-doposle-more').hide();

					}
					console.log(result);
					return false;
				}
		});

		return false;

	});


    $("body").on("click", ".ista--more", function(){
	var count = $(".ista-photos a").length;
			$.ajax({
				type:'POST',
				url: "/ajax/get_more_i.php",
				data: {count : count},
				cache:false,
				success:function(result){
						last = $(".ista-photos a").last();
						last.after(result.html);

						if (result.last < 40) $(".ista--more").hide();

				}
			});
      return false;
    })

    $("body").on("click", ".ista-photos a", function(){

    if (typeof($(this).data("href")) !== 'undefined') {
	event.preventDefault();
	window.open($(this).data("href"), '_blank');
    }
      return false;
    })

	$('.tag-cat').find("li").each(function() {
	if ($(this).is(":hidden")){
		$('.vse-tegi').css('display', 'inline-block');
	}
	});

	if(!window.Kolich){
	  Kolich = {};
	}

	Kolich.Selector = {};
	Kolich.Selector.getSelected = function(){
	  var t = '';
	  if(window.getSelection){
		t = window.getSelection();
	  }else if(document.getSelection){
		t = document.getSelection();
	  }else if(document.selection){
		t = document.selection.createRange().text;
	  }
	  t = t.toString().replace(/^\s+/,'');
	  t = t.replace(/\s+$/,'');
	  return t;
	}

	Kolich.Selector.mouseup = function(){
	  var st = Kolich.Selector.getSelected();
	  if(st!=''){
		var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if(re.test(st)){
		  sendEvent('e-mail', 'e-mail');
		}
	  }
	}

	Kolich.Selector.mouseup2 = function(){
	  var st2 = Kolich.Selector.getSelected();
	  if(st2!=''){
		var re2 = /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/i;
		if(re2.test(st2)){
		  sendEvent('tel', 'tel');
		}
	  }
	}

	jQuery( document ).ready(function( $ ) {
	  $(document).mouseup( Kolich.Selector.mouseup );
	  $(document).mouseup( Kolich.Selector.mouseup2 );
	});

	$('.email').click(function() {
		sendEvent('e-mail', 'e-mail');
	});

	$('.tel').click(function() {
		sendEvent('tel', 'tel');
	})

	$(document).on('click', '.data_doctor', function(e) {
    var href = $(this).data("url");

	if ($(this).attr('data-url') ){
    document.location.href = href;
	}
  });

	function sendEvent(event, category, virtual) {
	var c = typeof console !== "undefined";
		if (event == "")
				return;
		if (typeof category == "undefined")
				category = 'form';
		if (typeof yaCounter45081078 !== "undefined"){
				yaCounter45081078.reachGoal(event);
		if (c)
			console.log("yaCounter45081078.reachGoal('"+event+"');");
		}
		if (typeof _gaq !== "undefined"){
				_gaq.push(['_trackEvent', category, event]);
		if (c)
				console.log("_gaq.push(['_trackEvent', '"+category+"', '"+event+"']);");
	}
		if (typeof ga !== "undefined"){
		if(typeof virtual !== "undefined"){
		ga('send', 'pageview', virtual)
			if (c)
					console.log("ga('send', 'pageview', '"+virtual+"');");
		}

			gtag('event', event, { 'event_category': category});
			//ga('send', 'event', category, event);
		if (c)
				console.log("gtag('event', '"+event+"', { 'event_category': '"+category+"', });");
		}
		return true;
	}
});

	function check_all() {
	divs = false;

	//last = jQuery('.tag-cat li').last();

    jQuery('.tag-cat li').each(function() {

    last = $(this);

	var collides_fist = last.overlaps(jQuery('.doctors'));

	if (collides_fist.length == 1){
		jQuery('.vse-tegi').css('display', 'inline-block');
		divs = true;
	}

	var collides_second = last.overlaps(jQuery('.item-service-page-padding'));

	if (collides_second.length == 1){
		jQuery('.vse-tegi').css('display', 'inline-block');
		divs = true;
	}

	var collides_third = last.overlaps(jQuery('.desc'));

	if (collides_third.length == 1){
		jQuery('.vse-tegi').css('display', 'inline-block');
		divs = true;
	}

	})

	if (divs != true){
		jQuery('.vse-tegi').hide();
	}

	}

	check_all();

	jQuery(window).resize(function() {
		check_all();
	});

if ($(".doctors-filter").length > 0) {
  (function($) {
    $(function() {
      $('select').styler();
    });
  })(jQuery);
}

(function($) {
  $(function() {

    $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
      $(this)
        .addClass('active').siblings().removeClass('active')
        .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');

		//console.log($(this).closest('div.tabs').find('div.tabs__content').eq($(this).index()).data("count"));
		//console.log($(this).closest('div.tabs').find('div.tabs__content').eq($(this).index()).data("last"));

		if ($(this).closest('div.tabs').find('div.tabs__content').eq($(this).index()).data("count") > 5 && $(this).closest('div.tabs').find('div.tabs__content').eq($(this).index()).data("last") == false) {
			$('.foto-more').show();
		}else{
			$('.foto-more').hide();
		}

    });

  });
	
  $('html').on('submit', '#podpis_form', function(e) {
		e.preventDefault();
		$url = '//'+window.location.hostname+'/ajax/form_podpis.php';
        var pageurl = document.location.href;
		var datas = $('#podpis_form').serialize()+'&url='+pageurl;


		$.ajax({
			url: $url,
			type: 'POST',
			data: datas,
			success: function(result) {
				var magnificPopup = $.magnificPopup.instance;
				magnificPopup.close();

				$.magnificPopup.open({
				  items: {
					src: '#podpiska_spasibo'
				  },
				  type: 'inline'
				});
		   }
		});
	});
  
  
})(jQuery);

if ($("#map").length > 0) {
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
        center: [59.80, 30.35],
        zoom: 10,
        controls: ['zoomControl', 'fullscreenControl']
      }, {
        searchControlProvider: 'yandex#search'
      }),

      myPlacemark1 = new ymaps.Placemark([59.844060, 30.212712], {
        hintContent: 'Санкт-Петербург, пр. Маршала Жукова, 48/1'
      }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: '/bitrix/templates/medicor/img/metka.png',
        iconImageSize: [69, 109],
        iconImageOffset: [-34.5, -109]
      }),

      myPlacemark2 = new ymaps.Placemark([59.726202, 30.406639], {
        hintContent: 'Пушкин, Октябрьский б-р, 8/2'
      }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: '/bitrix/templates/medicor/img/metka.png',
        iconImageSize: [69, 109],
        iconContentOffset: [0, 0],
        iconImageOffset: [-34.5, -109]
      });
    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects
      .add(myPlacemark1)
      .add(myPlacemark2)
  }
}

  if ($("#video-home").length > 0) {
$("#video-home")[0].onpause = function () {
  $(this).removeClass('active');
  $('.play-box').css('display', 'block');
  $('.video-home').removeClass('visible');
};
}

$('.services-item_box-link .dropdown').each(function() {
    $(this).on("click", function(e) {
        $(this).toggleClass('open');
        var t = $(this).siblings(".mobile-nav__children");
        t.length && t.hasClass("mobile-nav__children--closed") && (t.slideDown().removeClass("mobile-nav__children--closed"), e.preventDefault())
    });
});
