
; /* Start:"a:4:{s:4:"full";s:75:"/local/components/nne/filter/templates/index-page/script.js?169961699610206";s:6:"source";s:59:"/local/components/nne/filter/templates/index-page/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(function(){
	$(window).on('nice.onOkvedItemsInit', function(event, id){
		NiceFilter.setItem('OKVED', new FilterItemOkved(id, {
			ID: '19',
			CODE: 'OKVED'
		}));
	})
})

var NiceFilter = {

	activeItem: null,
	items: {},
	filterEl: null,
	params: {},
	
	Init: function(id, params){
		
		this.filterEl = $('#' + id);
		
		if(!this.filterEl.length){
			return false;
		}
		
		this.params = params;
		
		this.BindEvents();
	},
	
	BindEvents: function(){
		var _  = this;
		this.filterEl.find('[data-action=toggleFilterItem]').on('click', function(){
			var id = $(this).data('id'),
				isOpened = $(this).hasClass('__opened'),
				isLoaded = $(this).data('loaded') === 'Y';
			$('.filter-line--item_modal').removeClass('__active');
			$('.filter-line__item_button').removeClass('__opened');
			$(this).toggleClass('__opened', !isOpened);
			
			if(isOpened){
				return false;
			}
			else if(isLoaded){
				_.toggleFilterItemList(id, this);
			}
			else{
				_.loadFilterItemList(id, this);
			}
			
			_.activeItem = $(this).data('code');
			
			return false;
		});
		
		$(document).on('click', function (e) {
			var el = '.filter-line--item_modal';
			if(_.activeItem && _.params[_.activeItem] && _.params[_.activeItem].MODAL_AUTO_CLOSE === false){
				return;
			}
			
			if ($(e.target).closest(el).length) return;
			
			_.checkActiveItems(_.activeItem);
			
			$('.filter-line--item_modal').removeClass('__active');
			_.filterEl.find('.__opened').removeClass('__opened');
			_.activeItem = null;
		});
		
		$('#applyfilter').on('click', this.applyFilter.bind(this));
	},
	toggleFilterItemList: function(id, btn){
		$('#filterModal'+id).addClass('__active');
	},
	
	getUrl: function(code){
		if(this.params[code] !== undefined && this.params[code].url){
			return this.params[code].url;
		}
		return 'filter.item-list';
	},
	
	getModalParams: function(code){
		var params = {};
		
		if(this.params[code] && this.params[code].modalParams){
			return this.params[code].modalParams;
		}
		
		return params;
	},
	
	loadFilterItemList: function(id, btn){
		var _ = this,
			code = $(btn).data('code'),	
			url = this.getUrl(code),
			$template = this.getListTemplate(id, btn, this.getModalParams(code));
			
		$('body').append($template);
		// this.filterEl.append($template);
		Api.Form('filterModal'+id).To(url, 'get').With({
			id: id
		}).Send(function(html){
			$template.html(html);
			// $template.css({});
			
			$(btn).data('loaded', 'Y');
		}, {
			dataType: 'html'
		});
	},
	
	getListTemplate: function(id, btn, params){
		var $template = $('<div class="filter-line--item_modal filter-line--item_modal_'+id+' __active" id="filterModal'+id+'" ' + this.renderParams(params) + '></div>');

		$template.css(this.getPostion(btn));
		
		return $template;
	},
	renderParams: function(params){
		var data = [];
		if(params){
			data = Object.keys(params).map(function(key){
				return 'data-' + key + '=' + '"'+params[key]+'"';
			});
		}
		return data.join(' ');
	},
	
	getPostion: function(btn){
		var code = $(btn).data('code'),
			basePosition = {
				top: $(btn).offset().top + 62,
				left: $(btn).offset().left,
			};
		if(this.params[code] !== undefined && this.params[code].position){
			switch(this.params[code].position){
				case 'wide':
					basePosition.left = this.filterEl.offset().left;
					basePosition.width = this.filterEl.outerWidth();
				break;
			}
			return basePosition;
		}
		
		return basePosition;
	},
	
	setItem: function(code, item){
		this.items[code] = item;
		
		this.setSize(code);
	},
	
	setSize: function(code){
		var filterLeftEdge = this.filterEl.offset().left
			filterWidth = this.filterEl.outerWidth(),
			filterRightEdge = filterLeftEdge + filterWidth;
		switch(code){
			case 'YEAR_DATE_CREATE':
				$('.filter-line--item_modal_37 .item_modal--content').css({
					width: (filterRightEdge - $('#filterModal37').offset().left - parseInt($('#filterModal37').css('paddingLeft')) - parseInt($('#filterModal37').css('paddingRight')))
				});
			break;
		}
	},
	
	applyFilter: function(event){
		var key,
			selectedValues,
			arrUrl = [];
		for(key in this.items){
			selectValues= this.items[key].getUrl();
			if(selectValues){
				arrUrl.push(selectValues);
			}
		}
		
		if(arrUrl.length > 0){
			arrUrl.unshift('filter');
			arrUrl.unshift('catalog');
			arrUrl.push('apply');
			arrUrl.push('');
		}
		else{
			arrUrl.unshift('catalog');
		}
		
		$(event.target).prop('disabled', true).addClass('btn-search-loading');
		window.location.href = arrUrl.join('/');
			
		return false;
	},
	
	closeItem: function(){
		NiceFilter.filterEl.find('.__opened').removeClass('__opened');
	},
	
	checkActiveItems: function(code){
		if(!code){
			return false;
		}
		
		var item = this.items[code];
		
		if(item === undefined){
			return false;
		}

		var selectedValue = item.getSelectedCount();
		
		// this.filterEl.find('.__opened').find('[data-selected-count]').text(selectedValue).toggle(selectedValue > 0);
		this.filterEl.find('.__opened').toggleClass('__active', item.checkActive());
	}
}


class FilterItem{
	constructor(id, params){
		this.id = id;
		this.params = params;
		
		this.bindEvents();
	}
	
	bindEvents(){
		$(this.id).find('input[type=checkbox]').on('change', this.displaySelected.bind(this));
	}
	
	displaySelected(){
		var selectedValue = this.getSelectedCount();
		$('#filterBtn' + this.params.ID).find('[data-selected-count]').text(selectedValue).toggle(selectedValue > 0);
	}
	
	getValue(){
		var arValues = [];
		
		$(this.id).find('input:checked').each(function(){
			arValues.push(this.value);
		});
		
		return arValues;
	}
	
	getUrl(){
		var url = '',
			arValues;
				
		arValues = this.getValue();
		
		if(arValues.length > 0){
			url = this.params.CODE.toLowerCase() + 
			'-is-' + arValues.join('-or-');
		}
		
		return url;
	}
	
	getSelectedCount(){
		return this.getValue().length;
	}
	
	checkActive(){
		return !!this.getValue().length;
	}
}


class FilterItemDouble extends FilterItem{
	constructor(id, params){
		super(id, params);
	}
	
	getValue(){
		var arValues = {};
		$(this.id).find('input:checked').each(function(){
			var code = $(this).data('code');
			if(arValues[code] === undefined){
				arValues[code]= [];
			}
			arValues[code].push(this.value);
		});
		
		return arValues;
	}
	
	getUrl(){
		var arUrl = [],
			key,
			i,
			keys = [],
			arValues;
				
		arValues = this.getValue();
		
		keys = Object.keys(arValues);
		
		if(keys.length > 0){
			for(i=0;i<keys.length;i++){
				key = keys[i];
				if(arValues[key] && arValues[key].length > 0){
					arUrl.push(key.toLowerCase() + 
					'-is-' + arValues[key].join('-or-'));
				}
			}
		}
		
		
		return arUrl.join('/');
	}
	
	getSelectedCount(){
		return Object.values(this.getValue()).flat().length;
	}
	
	checkActive(){
		return Object.values(this.getValue()).flat().length > 0;
	}
}

class FilterItemRange extends FilterItem{

	constructor(id, params){
		super(id, params);

		$('#propYearsRangeMin').on('keyup change', function(){
		  // range.update({
			  // from: parseInt(this.value)
		  // });
		}).on('keypress', function(event){
		  return event.charCode >= 48 && event.charCode <= 57;
		});

		$('#propYearsRangeMax').on('keyup change', function(){
		  // range.update({
			  // to: parseInt(this.value)
		  // });
		}).on('keypress', function(event){
		  return event.charCode >= 48 && event.charCode <= 57;
		});
	}
	
	getValue(){
		return {
			from: parseInt($('#propYearsRangeMin').val()),
			to: parseInt($('#propYearsRangeMax').val()),
		};
	}

	getUrl(){
		var url = '',
			arValues;
				
		arValues = this.getValue();
		
		url = this.params.CODE.toLowerCase() + '-from-' + arValues.from + '-to-' + arValues.to;
		
		return url;
	}
}

class FilterItemOkved extends FilterItem{

	items = [];

	constructor(id, params){
		super(id, params);

		$(window).on('nice.onOkvedItemsUpdate', this.handleSelected.bind(this));
		$(window).on('nice.onOkvedItemsCancel', this.handleCancel.bind(this));
	}
	
	bindEvents(){
		$(this.id).find('input[type=checkbox]').on('change', this.displaySelected.bind(this));
	}

	handleSelected(event, items){
		var active = items && items.length > 0,
			selectedValue;
		$('#filterBtn' + this.params.ID).toggleClass('__active', (items && items.length > 0));
		this.items = items;
		NiceFilter.closeItem();
		// $('#filterModal' + this.params.ID).removeClass('__active');
		
		selectedValue = this.getSelectedCount();
		$('#filterBtn' + this.params.ID).find('[data-selected-count]').text(selectedValue).toggle(selectedValue > 0);
	}
	
	handleCancel(){
		$('#filterBtn' + this.params.ID).toggleClass('__active', false);
		this.items = [];
		NiceFilter.closeItem();
		$('#filterModal' + this.params.ID).find('input:checked').prop('checked', false);
		$('#filterModal' + this.params.ID).removeClass('__active');
	}
	
	getValue(){		
		return this.items && this.items.map(function(item){return item.UF_XML_ID;});
	}
}




function hide_mod_mob_btn(modal_element_btn) { modal_element_btn.parentElement.classList.remove('__active'); 
    var btn_mod_mob = document.getElementsByClassName('filter-line__item_button');
        body = document.getElementsByTagName('body')[0];
    body.classList.remove('mod_open');
    for(let i = 0; i < btn_mod_mob.length; i++) {
          btn_mod_mob[i].classList.remove('__opened');
    };
    }

function hide_mod_mob(modal_element) { modal_element.parentElement.parentElement.classList.remove('__active'); 
    var btn_mod_mob = document.getElementsByClassName('filter-line__item_button');
        body = document.getElementsByTagName('body')[0];
    body.classList.remove('mod_open');
    for(let i = 0; i < btn_mod_mob.length; i++) {
          btn_mod_mob[i].classList.remove('__opened');
    };
    }

function stop_sroll(elem_mod) {
    var body = document.getElementsByTagName('body')[0];
        ok_code = document.getElementsByClassName('okved-search-result-cell-code');
        mediaQuery = window.matchMedia('(max-width: 650px)');

    if (mediaQuery.matches) {
       for(let i = 0; i < ok_code.length; i++) {
          ok_code[i].style.display = 'none';
       };

    body.classList.add('mod_open');
	body.onclick = () => {body.classList.remove('mod_open');};
};
}










/* End */
;
; /* Start:"a:4:{s:4:"full";s:110:"/local/templates/bankfirm/components/bitrix/catalog.smart.filter/index-page-extended/script.js?165761961626887";s:6:"source";s:94:"/local/templates/bankfirm/components/bitrix/catalog.smart.filter/index-page-extended/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
function JCSmartFilter(ajaxURL, viewMode, params)
{
	this.ajaxURL = ajaxURL;
	this.form = null;
	this.timer = null;
	this.cacheKey = '';
	this.cache = [];
	this.viewMode = viewMode;
	this.normal_url=false;
	this.SEF_SET_FILTER_URL=params.SEF_SET_FILTER_URL;
	this.SEF_DEL_FILTER_URL=params.SEF_DEL_FILTER_URL;
	
	// this.bindUrlToButton('set_filter', params.SEF_SET_FILTER_URL);
	this.bindUrlToButton('del_filter', params.SEF_DEL_FILTER_URL);
	
	$(document).on('submit', '#formFilterExtended', function(){
		window.location.href = this.action;
		
		return false;
	});
	
}

JCSmartFilter.prototype.bindUrlToButton = function (buttonId, url)
{
	var button = BX(buttonId);
	if (button){
		var proxy = function(j, func)
		{
			return function()
			{
				return func(j);
			}
		};

		if (button.type == 'submit')
			button.type = 'button';

		$(button).data("href", url);
		BX.unbindAll(button);

		BX.bind(button, 'click', BX.proxy(function(){
			var url_filter=$(button).data('href'),
				id=$(button).attr('id');

			$('#formFilterExtended').addClass('__loading');

			if(id=="del_filter"){
				var values = [],
					url_form =this.normal_url ? $('#formFilterExtended').attr('action') : this.ajaxURL;
				values[0] = {name: 'ajax', value: 'y'};

				if(!this.normal_url){
					this.gatherInputsValues(values, BX.findChildren(document.getElementById("smartfilter"), {'attribute': 'hidden'}, true));
				}
				values[1] = {name: 'reset_form', value: 'y'};
				if (this.sef){
					var set_filter = BX('set_filter'),
						reset_filter = BX('del_filter');

					if(set_filter)
						set_filter.disabled = true;
					if(reset_filter)
						reset_filter.disabled = true;
				}
				this.reset = true;
				$('#formFilterExtended')[0].reset();
				
				$('.adv__col').each(function(){
					$(this).find('.bx_filter_select_text').html('Не важно');
				})
				
				// if(selectList){
					// selectList.forEach(function(el){
						// el.val(null).trigger("change");
					// })
				// }
				
				// $('#formFilterExtended').find('select').each(function(){
					// var select2 = $(this).select2();
					// select2.val(null);
				// })
				BX.ajax.loadJSON(
					url_form,
					this.values2post(values),
					BX.delegate(this.postHandler, this)
				);
			}
			else{
				this.form.submit();
			}
			
			return false;
		}, this));
	}
};

JCSmartFilter.prototype.keyup = function(input)
{
	if(!!this.timer){
		clearTimeout(this.timer);
	}
	this.timer = setTimeout(BX.delegate(function(){
		this.reload(input);
	}, this), 500);
};

JCSmartFilter.prototype.click = function(checkbox)
{
	if(!!this.timer){
		clearTimeout(this.timer);
	}

	var wrapContainer = BX.findParent(BX(checkbox), {className:"bx_filter_parameters_box_container"}, false);
	this.element = wrapContainer;

	this.timer = setTimeout(BX.delegate(function(){
		this.reload(checkbox);
	}, this), 500);
};

JCSmartFilter.prototype.reload = function(input)
{
	if (this.cacheKey !== '')
	{
		//Postprone backend query
		if(!!this.timer)
		{
			clearTimeout(this.timer);
		}
		this.timer = setTimeout(BX.delegate(function(){
			this.reload(input);
		}, this), 1000);
		return;
	}
	this.cacheKey = '|';

	this.position = BX.pos(input, true);
	this.form = BX.findParent(input, {'tag':'form'});

	if (this.form)
	{
		var values = [];
		values[0] = {name: 'ajax', value: 'y'};
		this.gatherInputsValues(values, BX.findChildren(this.form, {'tag': new RegExp('^(input|select)$', 'i')}, true));

		for (var i = 0; i < values.length; i++)
			this.cacheKey += values[i].name + ':' + values[i].value + '|';

		// if (this.cache[this.cacheKey])
		// {
			// this.curFilterinput = input;
			// this.postHandler(this.cache[this.cacheKey], true);
		// }
		// else
		// {
			if(values){
				values = values.map(function(item){
					if(item.name.substr(-3) === 'MIN'
					|| item.name.substr(-3) === 'MAX'){
						item.value = item.value.replace(/[\s]/g, '');
					}
					
					return item;
				})
			}
			this.curFilterinput = input;
			BX.ajax.loadJSON(
				this.ajaxURL,
				this.values2post(values),
				BX.delegate(this.postHandler, this)
			);
		// }
	}
};

JCSmartFilter.prototype.updateItem = function (PID, arItem, reset)
{
	if (arItem.PROPERTY_TYPE === 'N' || arItem.PRICE)
	{
		var trackBar = window['trackBar' + PID];
		if (!trackBar && arItem.ENCODED_ID)
			trackBar = window['trackBar' + arItem.ENCODED_ID];

		if (trackBar && arItem.VALUES)
		{
			if (arItem.VALUES.MIN && arItem.VALUES.MIN.FILTERED_VALUE)
			{
				trackBar.setMinFilteredValue(arItem.VALUES.MIN.FILTERED_VALUE);
			}

			if (arItem.VALUES.MAX && arItem.VALUES.MAX.FILTERED_VALUE)
			{
				trackBar.setMaxFilteredValue(arItem.VALUES.MAX.FILTERED_VALUE);
			}
		}
	}
	else if (arItem.VALUES)
	{
		for (var i in arItem.VALUES)
		{
			if (arItem.VALUES.hasOwnProperty(i))
			{
				var value = arItem.VALUES[i];
				var control = BX(value.CONTROL_ID);
				if (!!control)
				{
					var label = document.querySelector('[data-role="label_'+value.CONTROL_ID+'"]');
						input = document.querySelector('[id="'+value.CONTROL_ID+'"]');

					if (value.DISABLED){
						if (label){
							BX.addClass(label, 'disabled');
							if(input){
								input.setAttribute('disabled','disabled');
								BX.addClass(input, 'disabled');
							}
						}else{
							BX.addClass(control.parentNode, 'disabled');
						}


					}
					else{
						if (label){
							BX.removeClass(label, 'disabled');
							if(input){
								input.removeAttribute('disabled');
								BX.removeClass(input, 'disabled');
							}
							// if(reset=="Y"){
								if($(control)){
									$(control).prop('disabled',false);
									$(control).removeClass('disabled');
								}
								$(label).find('span').removeClass('disabled');
							// }
						}else
							BX.removeClass(control.parentNode, 'disabled');
					}

					if(reset=="Y"){
						if($(control).attr("type")=="checkbox" || $(control).attr("type")=="radio"){
							if($(control).attr("checked")){
								$(control).prop('checked',false);
								// input.removeAttribute('checked');
							}
						}
					}

					if (value.hasOwnProperty('ELEMENT_COUNT'))
					{
						label = document.querySelector('[data-role="count_'+value.CONTROL_ID+'"]');
						if (label)
							label.innerHTML = value.ELEMENT_COUNT;
					}
				}
			}
		}
	}
	// else if (arItem.VALUES)
	// {
		// for (var i in arItem.VALUES)
		// {
			// if (arItem.VALUES.hasOwnProperty(i))
			// {
				// var value = arItem.VALUES[i];
				// var control = BX(value.CONTROL_ID);

				// if (!!control)
				// {
					// if($('select option[value='+value.CONTROL_ID+']').length){
						// $('select option[value='+value.CONTROL_ID+']').prop('disabled', !!value.DISABLED);
					// }
					
					// var label = document.querySelector('[data-role="label_'+value.CONTROL_ID+'"]');
					// if (value.DISABLED)
					// {
						// if (label)
							// BX.addClass(label, 'disabled');
						// else
							// BX.addClass(control.parentNode, 'disabled');
					// }
					// else
					// {
						// if (label) {
							// BX.removeClass(label, 'disabled');
						// } else {
							// BX.removeClass(control.parentNode, 'disabled');
						// }
					// }

					// if (value.hasOwnProperty('ELEMENT_COUNT'))
					// {
						// label = document.querySelector('[data-role="count_'+value.CONTROL_ID+'"]');
						// if (label)
							// label.innerHTML = value.ELEMENT_COUNT;
					// }
				// }
			// }
		// }
	// }
};

JCSmartFilter.prototype.postHandler = function (result, fromCache)
{	
	var hrefFILTER, url, curProp;
	var modef = BX('modef');
	var modef_num = BX('modef_num');

	$('#formFilterExtended').removeClass('__loading');

	if (!!result && !!result.ITEMS)
	{
		for(var PID in result.ITEMS)
		{
			if (result.ITEMS.hasOwnProperty(PID))
			{
				this.updateItem(PID, result.ITEMS[PID]);
			}
		}

		BX('formFilterExtended').setAttribute('action', result.FILTER_URL);

		if (!!modef && !!modef_num)
		{
			modef_num.innerHTML = result.ELEMENT_COUNT;
			hrefFILTER = BX.findChildren(modef, {tag: 'A'}, true);

			if (result.FILTER_URL && hrefFILTER)
			{
				hrefFILTER[0].href = BX.util.htmlspecialcharsback(result.FILTER_URL);
			}

			if (result.FILTER_AJAX_URL && result.COMPONENT_CONTAINER_ID)
			{
				BX.bind(hrefFILTER[0], 'click', function(e)
				{
					url = BX.util.htmlspecialcharsback(result.FILTER_AJAX_URL);
					BX.ajax.insertToNode(url, result.COMPONENT_CONTAINER_ID);
					return BX.PreventDefault(e);
				});
			}

			if (result.INSTANT_RELOAD && result.COMPONENT_CONTAINER_ID)
			{
				url = BX.util.htmlspecialcharsback(result.FILTER_AJAX_URL);
				BX.ajax.insertToNode(url, result.COMPONENT_CONTAINER_ID);
			}
			else
			{
				if (modef.style.display === 'none'){
					modef.style.display = 'inline-block';
				}
				filterTop = $('.bx_filter').offset().top;
				filterLeft = $('.bx_filter').offset().left;
				
				modef.style.left = '-10px';
				
				if(this.element){
					modef.style.top = ($(this.element).offset().top - filterTop + 10) + 'px';
				}
			}
		}

	}

	if (!fromCache && this.cacheKey !== '')
	{
		this.cache[this.cacheKey] = result;
	}
	this.cacheKey = '';
};

JCSmartFilter.prototype.gatherInputsValues = function (values, elements)
{
	if(elements)
	{
		for(var i = 0; i < elements.length; i++)
		{
			var el = elements[i];
			if (el.disabled || !el.type)
				continue;

			switch(el.type.toLowerCase())
			{
				case 'text':
				case 'textarea':
				case 'password':
				case 'hidden':
				case 'select-one':
					if(el.value.length)
						values[values.length] = {name : el.name, value : el.value};
					break;
				case 'radio':
				case 'checkbox':
					if(el.checked)
						values[values.length] = {name : el.name, value : el.value};
					break;
				case 'select-multiple':
					for (var j = 0; j < el.options.length; j++)
					{
						if (el.options[j].selected)
							values[values.length] = {name : el.name, value : el.options[j].value};
					}
					break;
				default:
					break;
			}
		}
	}
};

JCSmartFilter.prototype.values2post = function (values)
{
	var post = [];
	var current = post;
	var i = 0;

	while(i < values.length)
	{
		var p = values[i].name.indexOf('[');
		if(p == -1)
		{
			current[values[i].name] = values[i].value;
			current = post;
			i++;
		}
		else
		{
			var name = values[i].name.substring(0, p);
			var rest = values[i].name.substring(p+1);
			if(!current[name])
				current[name] = [];

			var pp = rest.indexOf(']');
			if(pp == -1)
			{
				//Error - not balanced brackets
				current = post;
				i++;
			}
			else if(pp == 0)
			{
				//No index specified - so take the next integer
				current = current[name];
				values[i].name = '' + current.length;
			}
			else
			{
				//Now index name becomes and name and we go deeper into the array
				current = current[name];
				values[i].name = rest.substring(0, pp) + rest.substring(pp+1);
			}
		}
	}
	return post;
};

JCSmartFilter.prototype.hideFilterProps = function(element)
{
	var easing;
	var obj = element.parentNode;
	var filterBlock = BX.findChild(obj, {className:"bx_filter_block"}, true, false);

	if(BX.hasClass(obj, "active"))
	{
		easing = new BX.easing({
			duration : 300,
			start : { opacity: 1,  height: filterBlock.offsetHeight },
			finish : { opacity: 0, height:0 },
			transition : BX.easing.transitions.quart,
			step : function(state){
				filterBlock.style.opacity = state.opacity;
				filterBlock.style.height = state.height + "px";
			},
			complete : function() {
				filterBlock.setAttribute("style", "");
				BX.removeClass(obj, "active");
			}
		});
		easing.animate();
	}
	else
	{
		filterBlock.style.display = "block";
		filterBlock.style.opacity = 0;
		filterBlock.style.height = "auto";

		var obj_children_height = filterBlock.offsetHeight;
		filterBlock.style.height = 0;

		easing = new BX.easing({
			duration : 300,
			start : { opacity: 0,  height: 0 },
			finish : { opacity: 1, height: obj_children_height },
			transition : BX.easing.transitions.quart,
			step : function(state){
				filterBlock.style.opacity = state.opacity;
				filterBlock.style.height = state.height + "px";
			},
			complete : function() {
			}
		});
		easing.animate();
		BX.addClass(obj, "active");
	}
};

JCSmartFilter.prototype.showDropDownPopup = function(element, popupId)
{
	var contentNode = element.querySelector('[data-role="dropdownContent"]');
	BX.PopupWindowManager.create("smartFilterDropDown"+popupId, element, {
		autoHide: true,
		offsetLeft: 0,
		targetContainer: BX('indexQuickFilter'),
		offsetTop: 3,
		overlay : false,
		draggable: {restrict:true},
		closeByEsc: true,
		content: contentNode
	}).show();
};

JCSmartFilter.prototype.selectDropDownItem = function(element, controlId){
	// this.keyup(BX(controlId));

	// var wrapContainer = BX.findParent(BX(controlId), {className:"bx_filter_select_container"}, false);
	// this.element = wrapContainer;
	
	// var currentOption = wrapContainer.querySelector('[data-role="currentOption"]');
	// currentOption.innerHTML = element.innerHTML;
	
	// if (element.classList.contains('active')) {
		// element.classList.remove('active');
	// } else {
        // element.classList.add('active');
	// }
	// BX.PopupWindowManager.getCurrentPopup().close();
	
	var wrapContainer = BX.findParent(BX(controlId), {className:"bx_filter_select_container"}, false);
	this.element = wrapContainer;
	if(!BX.hasClass(element,'disabled')){
		this.keyup(BX(controlId));

		var wrapContainer = BX.findParent(BX(controlId), {className:"bx_filter_select_container"}, false);

		var currentOption = wrapContainer.querySelector('[data-role="currentOption"]');

		currentOption.innerHTML = element.innerHTML;
		$(element).closest('.bx_filter_select_popup').find('label').removeClass('active');
		BX.addClass(element, "active");

		if(BX.PopupWindowManager.getCurrentPopup())
			BX.PopupWindowManager.getCurrentPopup().close();
	}
};

JCSmartFilter.prototype.selectOptionItem = function(element, controlId){
	this.keyup(BX(controlId));

	var wrapContainer = BX.findParent(BX(controlId), {className:"bx_filter_select_container"}, false);
	this.element = wrapContainer;
};

BX.namespace("BX.Iblock.SmartFilter");
BX.Iblock.SmartFilter = (function()
{
	var SmartFilter = function(arParams)
	{
		if (typeof arParams === 'object')
		{
			this.leftSlider = BX(arParams.leftSlider);
			this.rightSlider = BX(arParams.rightSlider);
			this.tracker = BX(arParams.tracker);
			this.trackerWrap = BX(arParams.trackerWrap);

			this.minInput = BX(arParams.minInputId);
			this.maxInput = BX(arParams.maxInputId);

			this.minPrice = parseFloat(arParams.minPrice);
			this.maxPrice = parseFloat(arParams.maxPrice);

			this.curMinPrice = parseFloat(arParams.curMinPrice);
			this.curMaxPrice = parseFloat(arParams.curMaxPrice);

			this.fltMinPrice = arParams.fltMinPrice ? parseFloat(arParams.fltMinPrice) : parseFloat(arParams.curMinPrice);
			this.fltMaxPrice = arParams.fltMaxPrice ? parseFloat(arParams.fltMaxPrice) : parseFloat(arParams.curMaxPrice);

			this.precision = arParams.precision || 0;

			this.priceDiff = this.maxPrice - this.minPrice;

			this.leftPercent = 0;
			this.rightPercent = 0;

			this.fltMinPercent = 0;
			this.fltMaxPercent = 0;

			this.colorUnavailableActive = BX(arParams.colorUnavailableActive);//gray
			this.colorAvailableActive = BX(arParams.colorAvailableActive);//blue
			this.colorAvailableInactive = BX(arParams.colorAvailableInactive);//light blue

			this.isTouch = false;

			this.init();

			if ('ontouchstart' in document.documentElement)
			{
				this.isTouch = true;

				BX.bind(this.leftSlider, "touchstart", BX.proxy(function(event){
					this.onMoveLeftSlider(event)
				}, this));

				BX.bind(this.rightSlider, "touchstart", BX.proxy(function(event){
					this.onMoveRightSlider(event)
				}, this));
			}
			else
			{
				BX.bind(this.leftSlider, "mousedown", BX.proxy(function(event){
					this.onMoveLeftSlider(event)
				}, this));

				BX.bind(this.rightSlider, "mousedown", BX.proxy(function(event){
					this.onMoveRightSlider(event)
				}, this));
			}

			BX.bind(this.minInput, "keyup", BX.proxy(function(event){
				this.onInputChange();
			}, this));

			BX.bind(this.maxInput, "keyup", BX.proxy(function(event){
				this.onInputChange();
			}, this));
		}
	};

	SmartFilter.prototype.init = function()
	{
		var priceDiff;

		if (this.curMinPrice > this.minPrice)
		{
			priceDiff = this.curMinPrice - this.minPrice;
			this.leftPercent = (priceDiff*100)/this.priceDiff;

			this.leftSlider.style.left = this.leftPercent + "%";
			this.colorUnavailableActive.style.left = this.leftPercent + "%";
		}

		this.setMinFilteredValue(this.fltMinPrice);

		if (this.curMaxPrice < this.maxPrice)
		{
			priceDiff = this.maxPrice - this.curMaxPrice;
			this.rightPercent = (priceDiff*100)/this.priceDiff;

			this.rightSlider.style.right = this.rightPercent + "%";
			this.colorUnavailableActive.style.right = this.rightPercent + "%";
		}

		this.setMaxFilteredValue(this.fltMaxPrice);
	};

	SmartFilter.prototype.setMinFilteredValue = function (fltMinPrice)
	{
		this.fltMinPrice = parseFloat(fltMinPrice);
		if (this.fltMinPrice >= this.minPrice)
		{
			var priceDiff = this.fltMinPrice - this.minPrice;
			this.fltMinPercent = (priceDiff*100)/this.priceDiff;

			if (this.leftPercent > this.fltMinPercent)
				this.colorAvailableActive.style.left = this.leftPercent + "%";
			else
				this.colorAvailableActive.style.left = this.fltMinPercent + "%";

			this.colorAvailableInactive.style.left = this.fltMinPercent + "%";
		}
		else
		{
			this.colorAvailableActive.style.left = "0%";
			this.colorAvailableInactive.style.left = "0%";
		}
	};

	SmartFilter.prototype.setMaxFilteredValue = function (fltMaxPrice)
	{
		this.fltMaxPrice = parseFloat(fltMaxPrice);
		if (this.fltMaxPrice <= this.maxPrice)
		{
			var priceDiff = this.maxPrice - this.fltMaxPrice;
			this.fltMaxPercent = (priceDiff*100)/this.priceDiff;

			if (this.rightPercent > this.fltMaxPercent)
				this.colorAvailableActive.style.right = this.rightPercent + "%";
			else
				this.colorAvailableActive.style.right = this.fltMaxPercent + "%";

			this.colorAvailableInactive.style.right = this.fltMaxPercent + "%";
		}
		else
		{
			this.colorAvailableActive.style.right = "0%";
			this.colorAvailableInactive.style.right = "0%";
		}
	};

	SmartFilter.prototype.getXCoord = function(elem)
	{
		var box = elem.getBoundingClientRect();
		var body = document.body;
		var docElem = document.documentElement;

		var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
		var clientLeft = docElem.clientLeft || body.clientLeft || 0;
		var left = box.left + scrollLeft - clientLeft;

		return Math.round(left);
	};

	SmartFilter.prototype.getPageX = function(e)
	{
		e = e || window.event;
		var pageX = null;

		if (this.isTouch && event.targetTouches[0] != null)
		{
			pageX = e.targetTouches[0].pageX;
		}
		else if (e.pageX != null)
		{
			pageX = e.pageX;
		}
		else if (e.clientX != null)
		{
			var html = document.documentElement;
			var body = document.body;

			pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
			pageX -= html.clientLeft || 0;
		}

		return pageX;
	};

	SmartFilter.prototype.recountMinPrice = function()
	{
		var newMinPrice = (this.priceDiff*this.leftPercent)/100;
		newMinPrice = (this.minPrice + newMinPrice).toFixed(this.precision);

		if (newMinPrice != this.minPrice)
			this.minInput.value = newMinPrice;
		else
			this.minInput.value = "";
		smartFilter.keyup(this.minInput);
	};

	SmartFilter.prototype.recountMaxPrice = function()
	{
		var newMaxPrice = (this.priceDiff*this.rightPercent)/100;
		newMaxPrice = (this.maxPrice - newMaxPrice).toFixed(this.precision);

		if (newMaxPrice != this.maxPrice)
			this.maxInput.value = newMaxPrice;
		else
			this.maxInput.value = "";
		smartFilter.keyup(this.maxInput);
	};

	SmartFilter.prototype.onInputChange = function ()
	{
		var priceDiff;
		if (this.minInput.value)
		{
			var leftInputValue = this.minInput.value;
			if (leftInputValue < this.minPrice)
				leftInputValue = this.minPrice;

			if (leftInputValue > this.maxPrice)
				leftInputValue = this.maxPrice;

			priceDiff = leftInputValue - this.minPrice;
			this.leftPercent = (priceDiff*100)/this.priceDiff;

			this.makeLeftSliderMove(false);
		}

		if (this.maxInput.value)
		{
			var rightInputValue = this.maxInput.value;
			if (rightInputValue < this.minPrice)
				rightInputValue = this.minPrice;

			if (rightInputValue > this.maxPrice)
				rightInputValue = this.maxPrice;

			priceDiff = this.maxPrice - rightInputValue;
			this.rightPercent = (priceDiff*100)/this.priceDiff;

			this.makeRightSliderMove(false);
		}
	};

	SmartFilter.prototype.makeLeftSliderMove = function(recountPrice)
	{
		recountPrice = (recountPrice === false) ? false : true;

		this.leftSlider.style.left = this.leftPercent + "%";
		this.colorUnavailableActive.style.left = this.leftPercent + "%";

		var areBothSlidersMoving = false;
		if (this.leftPercent + this.rightPercent >= 100)
		{
			areBothSlidersMoving = true;
			this.rightPercent = 100 - this.leftPercent;
			this.rightSlider.style.right = this.rightPercent + "%";
			this.colorUnavailableActive.style.right = this.rightPercent + "%";
		}

		if (this.leftPercent >= this.fltMinPercent && this.leftPercent <= (100-this.fltMaxPercent))
		{
			this.colorAvailableActive.style.left = this.leftPercent + "%";
			if (areBothSlidersMoving)
			{
				this.colorAvailableActive.style.right = 100 - this.leftPercent + "%";
			}
		}
		else if(this.leftPercent <= this.fltMinPercent)
		{
			this.colorAvailableActive.style.left = this.fltMinPercent + "%";
			if (areBothSlidersMoving)
			{
				this.colorAvailableActive.style.right = 100 - this.fltMinPercent + "%";
			}
		}
		else if(this.leftPercent >= this.fltMaxPercent)
		{
			this.colorAvailableActive.style.left = 100-this.fltMaxPercent + "%";
			if (areBothSlidersMoving)
			{
				this.colorAvailableActive.style.right = this.fltMaxPercent + "%";
			}
		}

		if (recountPrice)
		{
			this.recountMinPrice();
			if (areBothSlidersMoving)
				this.recountMaxPrice();
		}
	};

	SmartFilter.prototype.countNewLeft = function(event)
	{
		var pageX = this.getPageX(event);

		var trackerXCoord = this.getXCoord(this.trackerWrap);
		var rightEdge = this.trackerWrap.offsetWidth;

		var newLeft = pageX - trackerXCoord;

		if (newLeft < 0)
			newLeft = 0;
		else if (newLeft > rightEdge)
			newLeft = rightEdge;

		return newLeft;
	};

	SmartFilter.prototype.onMoveLeftSlider = function(e)
	{
		if (!this.isTouch)
		{
			this.leftSlider.ondragstart = function() {
				return false;
			};
		}

		if (!this.isTouch)
		{
			document.onmousemove = BX.proxy(function(event) {
				this.leftPercent = ((this.countNewLeft(event)*100)/this.trackerWrap.offsetWidth);
				this.makeLeftSliderMove();
			}, this);

			document.onmouseup = function() {
				document.onmousemove = document.onmouseup = null;
			};
		}
		else
		{
			document.ontouchmove = BX.proxy(function(event) {
				this.leftPercent = ((this.countNewLeft(event)*100)/this.trackerWrap.offsetWidth);
				this.makeLeftSliderMove();
			}, this);

			document.ontouchend = function() {
				document.ontouchmove = document.touchend = null;
			};
		}

		return false;
	};

	SmartFilter.prototype.makeRightSliderMove = function(recountPrice)
	{
		recountPrice = (recountPrice === false) ? false : true;

		this.rightSlider.style.right = this.rightPercent + "%";
		this.colorUnavailableActive.style.right = this.rightPercent + "%";

		var areBothSlidersMoving = false;
		if (this.leftPercent + this.rightPercent >= 100)
		{
			areBothSlidersMoving = true;
			this.leftPercent = 100 - this.rightPercent;
			this.leftSlider.style.left = this.leftPercent + "%";
			this.colorUnavailableActive.style.left = this.leftPercent + "%";
		}

		if ((100-this.rightPercent) >= this.fltMinPercent && this.rightPercent >= this.fltMaxPercent)
		{
			this.colorAvailableActive.style.right = this.rightPercent + "%";
			if (areBothSlidersMoving)
			{
				this.colorAvailableActive.style.left = 100 - this.rightPercent + "%";
			}
		}
		else if(this.rightPercent <= this.fltMaxPercent)
		{
			this.colorAvailableActive.style.right = this.fltMaxPercent + "%";
			if (areBothSlidersMoving)
			{
				this.colorAvailableActive.style.left = 100 - this.fltMaxPercent + "%";
			}
		}
		else if((100-this.rightPercent) <= this.fltMinPercent)
		{
			this.colorAvailableActive.style.right = 100-this.fltMinPercent + "%";
			if (areBothSlidersMoving)
			{
				this.colorAvailableActive.style.left = this.fltMinPercent + "%";
			}
		}
		if (recountPrice)
		{
			this.recountMaxPrice();
			if (areBothSlidersMoving)
				this.recountMinPrice();
		}
	};

	SmartFilter.prototype.onMoveRightSlider = function(e)
	{
		if (!this.isTouch)
		{
			this.rightSlider.ondragstart = function() {
				return false;
			};
		}

		if (!this.isTouch)
		{
			document.onmousemove = BX.proxy(function(event) {
				this.rightPercent = 100-(((this.countNewLeft(event))*100)/(this.trackerWrap.offsetWidth));
				this.makeRightSliderMove();
			}, this);

			document.onmouseup = function() {
				document.onmousemove = document.onmouseup = null;
			};
		}
		else
		{
			document.ontouchmove = BX.proxy(function(event) {
				this.rightPercent = 100-(((this.countNewLeft(event))*100)/(this.trackerWrap.offsetWidth));
				this.makeRightSliderMove();
			}, this);

			document.ontouchend = function() {
				document.ontouchmove = document.ontouchend = null;
			};
		}

		return false;
	};

	return SmartFilter;
})();


$(function(){
	$(document).on('click', "[data-toggle-dropodown]", function(e){
		e.stopPropagation();
		
		var $form = $(this).parents('form');
		var target = e.target;
		var _this = $(this);
		
		
		if (!_this.closest(".bx_filter_parameters_box_container").hasClass("active")) {
			/*if(window.matchMedia('(min-width:768px)').matches) {*/
				_this.next(".bx_filter_block").stop().show();
				_this.closest(".bx_filter_parameters_box_container").addClass("active");
			/*}*/
		}
		else{
			/*if(window.matchMedia('(min-width:769px)').matches) {*/
				_this.next(".bx_filter_block").hide();
				_this.closest(".bx_filter_parameters_box_container").removeClass("active");
			/*}*/
		}
		
		
		$(document).on('click', function(event){
			if ($(event.target).closest('.active').length == 0) {
				_this.next(".bx_filter_block").stop().hide();
				_this.closest(".bx_filter_parameters_box_container").removeClass("active");
			}
		});
	});
	
	// $('[data-action=quickSearch]').hideseek({
		// highlight: true,
		// ignore_accents: true,
		// min_chars: 0,
		// nodata: 'Совпадений не найдено'
	// });
	
	// $('#catalogSmartFilter').on('submit', function(){
		// $('.js-input-range').each(function(){
			// this.value = this.value.replace(/[\s]/g, '');
		// });
		
		// return true;
	// });
	
	// $('.input-general_turnovers').on('keyup', function(){
		// this.value.replace(/[^\d]/,'');
	// })
})
/* End */
;
; /* Start:"a:4:{s:4:"full";s:77:"/local/components/nne/general.stat/templates/.default/script.js?1644910318178";s:6:"source";s:63:"/local/components/nne/general.stat/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(function(){
	$('.numbers__number span').css('opacity', '1');
    $('.numbers__number span').spincrement({
        thousandSeparator: "",
        duration: 5000
    });
})
/* End */
;; /* /local/components/nne/filter/templates/index-page/script.js?169961699610206*/
; /* /local/templates/bankfirm/components/bitrix/catalog.smart.filter/index-page-extended/script.js?165761961626887*/
; /* /local/components/nne/general.stat/templates/.default/script.js?1644910318178*/
