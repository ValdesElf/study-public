
; /* Start:"a:4:{s:4:"full";s:91:"/local/templates/bankfirm/components/bitrix/main.register/.default/script.js?16929545542978";s:6:"source";s:76:"/local/templates/bankfirm/components/bitrix/main.register/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(function(){
	var requestId = $('form#registrationForm input[name=REQUEST_ID]').val();
	var manualEnter = false;
	
	$('form#registrationForm').validate({
		errorElement: 'span',
		errorClass: 'error-msg',
		highlight: function( element ){
			$( element ).addClass( 'error' );
		},
		unhighlight: function( element ){
			$( element ).removeClass( 'error' );
		},
		rules: {
			"REGISTER[EMAIL]": {
				required: true,
				email: true,
			},
			"REGISTER[CONFIRM_PASSWORD]": {
				required: true,
				equalTo: "#PASSWORD"
			}
		},
		submitHandler: function( form ){
			if(manualEnter){
				$("#PERSONAL_CITY").val("");
				manualEnter = false;
			}
			
			if( $(form).valid() ){
				$(form).addClass('__loading');
				$(form).find('button[type="submit"]').attr("disabled", "disabled");
				$('#LOGIN').val($(form).find('input#EMAIL').val());
				
				return true;
			}
			
			return false;
		},
		errorPlacement: function( error, element ){
			$( error ).attr( 'alt', $( error ).text() );
			$( error ).attr( 'title', $( error ).text() );
			error.insertBefore( element );
		},
		messages:{
		  agreement: {
			required : BX.message('JS_REQUIRED_LICENSES')
		  },
		  "REGISTER[PERSONAL_CITY]": {
			  required : "Нужно выбрать город из доступного списка городов"
		  }
		}
	});

	if(arSiteOptions['PHONE_MASK'].length){
		$("#PERSONAL_PHONE").mask(arSiteOptions['PHONE_MASK']);
	}
		
		// var sessionID = '<?=bitrix_sessid()?>';
		// $('input#SESSION_ID').val(sessionID);
		
	 $("#PERSONAL_CITY").suggestions({
        token: "57a95c59a42fce1a4698dd21769eeafc2748b705",
        type: "ADDRESS",
		hint: false,
  		bounds: "city-settlement",
        onSelect: function(suggestion) {
			var data = {
				country: suggestion.data.country,
				country_iso_code: suggestion.data.country_iso_code,
				city: suggestion.data.city,
				capital: suggestion.data.capital_marker,
				city_fias_id: suggestion.data.city_fias_id,
				city_kladr_id: suggestion.data.city_kladr_id,
				geo_lat: suggestion.data.geo_lat,
				geo_lon: suggestion.data.geo_lon,
			};
            $('#PERSONAL_STREET').val(JSON.stringify(data));
			$("#PERSONAL_CITY").val(suggestion.data.city ?? suggestion.data.value);
			manualEnter = false;
        }
    });
	
	$("#PERSONAL_CITY").on("keypress", function(){
		manualEnter = true;
	});
	
	if(requestId){
		$('label[for=NAME]').on('click', function(){
			$(this).find('input').removeClass('__disabled').focus();
			return false;
		})
		$('label[for=NAME] input').on('blur', function(){
			$(this).addClass('__disabled');
			return false;
		});
		
		$('label[for=PERSONAL_PHONE]').on('click', function(){
			$(this).find('input').removeClass('__disabled').focus();
			return false;
		})
		$('label[for=PERSONAL_PHONE] input').on('blur', function(){
			$(this).addClass('__disabled');
			return false;
		});
	}
});
/* End */
;; /* /local/templates/bankfirm/components/bitrix/main.register/.default/script.js?16929545542978*/
