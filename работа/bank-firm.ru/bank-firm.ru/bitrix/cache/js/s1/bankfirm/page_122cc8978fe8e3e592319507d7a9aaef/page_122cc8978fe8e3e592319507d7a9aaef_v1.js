
; /* Start:"a:4:{s:4:"full";s:87:"/local/templates/bankfirm/components/bitrix/news.detail/company/script.js?1689937519952";s:6:"source";s:73:"/local/templates/bankfirm/components/bitrix/news.detail/company/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(function(){
	$('[data-action=buyCompany]').on('click', function(){
		const id = $(this).data('id');
		
		buyFirmHandler(id);
		
		return false;
	});
	
	$(window).on('nne.onAfterPhoneSave', function(){
		const id = $('.js-detail-company').data('id');
		buyFirmHandler(id);
	})
	
	if($('#buyCompanyForm').length){
		$.get('/ajax/buy_form.php?ID=' + $('#buyCompanyForm').data('id'), function(html){
			$('#buyCompanyForm').html(html);
			$('#buyCompanyForm').removeClass('__loading');
		})
	}
})

function buyFirmHandler(id){
	
	flashMessage('Подготавливаем сделку...');
	Api.Loading(this).To('company.buy').With({
		id: id
	}).Send(function(result){
		if(result.require_phone){
			Noty.closeAll();
			$('#requirUserPhoneBtn').trigger('click');
			return;
		}
		flashSuccess(result.message);
		if(result.deal){
			window.location.href = '/personal/deals/' + result.deal.code + '/';
		}
	});
	
}
/* End */
;; /* /local/templates/bankfirm/components/bitrix/news.detail/company/script.js?1689937519952*/
