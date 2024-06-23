$(document).ready(function () {
	
	$('curtain').css('display', 'none');
	$('curtain').css('opacity', 0);
	
	
	$('.consalt').click(function () {
	   
		$('curtain').css('display', 'block');
		$('curtain dialog#orderDialog').removeClass('hidden');
		$('curtain dialog#orderDialog .error_block_modal').addClass('hidden');
		
		$('curtain').animate({'opacity': 1}, 500, function () {
		});
		
	});
		
	$('curtain').click(function (e) {
		if (e.target == e.currentTarget) {
			$('curtain').animate({'opacity': 0}, 500, function () {
				$('curtain dialog').addClass('hidden');
				$('curtain').css('display', 'none');
			});
		}
	});
	
	$('.close_modal').click(function (e) {
		$('curtain').trigger('click');
	});
	
	$("dialog .submit").click(function () {
		
		var numbers = [];
		var correct_data = true;
		
		$(this).parents('dialog').find('cellphone input').each(function (i, item) {
			if ($.trim(item.value) == '')
				correct_data = false;
			numbers[i] = item.value;
		});
		
		if (correct_data) {
				
			var request = $.ajax({
				url: "/post.php",
				type: "POST",
				data: {
					phone: '+7 (' + numbers[0] + ') ' + ' ' + numbers[1] + ' ' + numbers[2] + ' ' + numbers[3],
					prod: $(this).parents('dialog').find('.mail-message').html()
				}
			});
			
			request.done(function (msg) {
				$('curtain').trigger("click");
				document.location.href = '/thanks.html';
			});
			
			request.fail(function (jqXHR, textStatus) {
				alert("По техническим проблемам мы не смогли получить ваш телефон, попробуйте по позже, либо позвоните нам!");
				$('curtain').trigger("click");
			});
			
		} else {
			
			$('dialog .error_block_modal').removeClass('hidden');
			
		}
	});
	
	$('cellphone input').on('keyup', function (event) {
		
		if (event.target.value.length == 0){
			$(event.target).prev('input').focus();
		} else {
			event.target.value = event.target.value.replace(/[^\d]/gi, '');
		}
		
	});
	
	$('cellphone input:nth-child(1), cellphone input:nth-child(2)').on('keyup', function (event) {
		
		if (event.target.value.length > 0) {
			event.target.value = event.target.value == 'NaN' ? '' : event.target.value;
		}
		
		if (event.target.value.length >= 3) {
			event.target.value = event.target.value.substr(0, 3);
			$(event.target).next('input').focus();
		}
		
	});
	
	$('cellphone input:nth-child(3)').on('keyup', function (event) {
		
		if (event.target.value.length > 0) {
			event.target.value = event.target.value == 'NaN' ? '' : event.target.value;
		}
		
		if (event.target.value.length >= 2) {
			event.target.value = event.target.value.substr(0, 2);
			$(event.target).next('input').focus();
		}
		
	});
	
	$('cellphone input:nth-child(4)').on('keyup', function (event) {
		
		if (event.target.value.length > 0) {
			event.target.value = event.target.value == 'NaN' ? '' : event.target.value;
		}
		
		if (event.target.value.length >= 2) {
			event.target.value = event.target.value.substr(0, 2);
			$(event.target).parents('dialog').find('.submit').focus();
		}
		
	});
});