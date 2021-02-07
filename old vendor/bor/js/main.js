/*!
 * Author: Infospica, http://www.infospica.com/
 * Copyright @ 2015 Infospica Consultancy Services
 */

/*global $, jQuery, alert, console*/

$(function () {
	"use strict";
	$('[data-rel="tooltip"]').tooltip();
	$('[data-control="dialog"]').dialog({
		action: 'init',
		backdrop: true
	});
	$('[data-rel="popover"]').popover();
	// $('[data-selector]').multiselector({
	// 	search: true,
	// 	selectAll: true,
	// 	captionFormat: '{0} selected',
	// 	outputTemplate: "<span class='badge bg-info m-r-5'> {{$}} <i class='fa fa-times' {{$action=removeTag()}}></i> </span>",
	// 	selectMsgAll: 'All selected'
	// });

	$('[data-type="selector"]').multiselector({
		search: true,
		selectAll: true,
		captionFormat: '{0} selected',
		outputTemplate: "<span class='badge bg-info m-r-5'> {{$}} <i class='fa fa-times' {{$action=removeTag()}}></i> </span>",
		selectMsgAll: 'All selected'
	});

	$('.togglerBtn').on('click', function() {
		var tgt = $(this).data('target');
		$(this).toggleClass('opened');
		$(tgt).toggleClass('open');
	});

	$('.sideMenu').on('click', function (e) {
		if ( $(e.target).is('.sideMenu.open') || $(e.target).is('[data-close="sidemenu"]') || $(e.target).closest('[data-close="sidemenu"]').length > 0 ) {
			$(this).removeClass('open');
			$('.togglerBtn').removeClass('opened');
		}
	});

	$('.menu.stack>li>a').on('click', function (e) {
		$('.menu.stack>li').removeClass('active');
		$(this).parents('li').addClass('active');
	});
	$('.domainLangChooser.flagList>li>a').on('click', function (e) {
		$('.domainLangChooser.flagList>li').removeClass('active');
		$(this).closest('li').addClass('active');
	});
	
	page.refresh();
	page.getRatio();

	// $('.owl-carousel *').on('keypress', function(e){
	// 	console.log(e.which)
	// 	console.log(e)
	// });

	if (w <= 1024) {
		$('body').removeClass('invertColors');
	}

	$('[data-toggle="droppopup"]').on('click', function(e) {
		e.stopPropagation();
		var tgt = $(this).attr('data-target');
		$(tgt).toggleClass('open');
		$(this).attr('aria-expanded', true);
	});

	$('a.sr-only-focusable').on('click', function() {
		var tgt = '#' + $(this).attr('data-focus');
		if( $(tgt).length > 0 ) {
			$(tgt).focus();
			// console.log($(tgt).is('[data-toggle]'))
			// if( $(tgt).is('[data-toggle]') ){
			// 	$(tgt).trigger('click');
			// }
		}
	});

	$('.menu li').off('mouseover.global').on('mouseover.global', function() {
		$(".menu li.open").removeClass('open');
		$(this).addClass('open');
		$(".menu li.open").off('mouseout.global').on('mouseout.global', function () {
			$(this).removeClass('open');
		});
	});

	$('.menu li a').off('focus.global').on('focus.global', function() {
		$(".menu li.open").removeClass('open');
		$(this).closest('li').addClass('open').trigger('mouseover');
	});
	$(".menu li > a.last").off('blur.global').on('blur.global', function () {
		$(this).closest('.open').removeClass('open');
	});
	$(".menu li a.sr-only-focusable").off('click.global').on('click.global', function () {
		$(this).closest('.open').removeClass('open');
	});

	$(document).on('click', function(e) {
		e.stopPropagation();
		if ( $(e.target).is('[data-toggle="droppopup"]') ) {
			var tgt = $(this).attr('data-target');
			$(tgt).toggleClass('open');
			$(this).attr('aria-expanded', true);
		} else if ( $(e.target).closest('[data-rel="droppopup"]').length <= 0 ) {
			$('[data-rel="droppopup"]').each(function() {
				$(this).removeClass('open');
			});
			$('[data-toggle="droppopup"]').each(function(i, el) {
				$(this).attr('aria-expanded', false);
			});
		}
	});

	// Bootstrap data-API Reinit
	$('.popup [data-toggle="dropdown"]').dropdown();
	$('.popup [data-toggle="collapse"]')
	.off('click.popup.collapse').on('click.popup.collapse',
	function (e) {
		e.preventDefault();
		var tgt = $(this).attr('href') || $(this).attr('data-target');
		$(tgt).collapse("toggle");
	});

	$('.nav-tabs a[data-toggle="tab"]').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('.popup, .modalOverlay').on('click', function (event) {
		// event.stopPropagation();
		if (!$(event.target).closest('.dropdown').length) {
			$('.dropdown').removeClass('open');
		}
		if ($(this).find('.SumoSelect').length > 0 && !($(event.target).closest('.SumoSelect').length > 0)) {
			$(this).find('select[data-type="selector"]').each(function (i, el) {
				el.sumo.reload();
			});
		}
	});

	$(".date").datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		dateFormat: "d:s M yy",
		onSelect: function (dateText, inst) {
			var suffixArray = new Array('', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st');
			var day = Number(inst.selectedDay);
			var suffix = suffixArray[day];
			$(this).val($(this).val().replace(inst.selectedDay + ":s", inst.selectedDay + suffix));
		}
	});

	$('.domainLangChooser li a').on('click', function() {
		$('.domainLangChooser li').removeClass('active');
		var domain = $(this).attr('data-id').toLowerCase(),
			lang = $('.header .radio.btnGroup input:radio:checked').attr('data-lang').toLowerCase();
		var styleurl = (styleurl === undefined || styleurl === '') ? 'css/' : styleurl;

		if (lang === 'ar') {
			$('html').attr({
				dir: 'rtl',
				lang: 'ar'
			});
		} else {
			$('html').attr({
				dir: 'ltr',
				lang: lang
			});
		}
		
		if (domain !== '' || domain === 'global' ) {
			$('html').find('link[rel="stylesheet"][href^="' + styleurl + '"]').attr('href', styleurl + 'style-' + domain + '.' + lang + '.css');
		} else {
			$('html').find('link[rel="stylesheet"][href^="' + styleurl + '"]').attr('href', styleurl + 'style.en.css');
		}
		$(this).closest('li').addClass('active');
	});

	$('.collapse').on('shown.bs.collapse hidden.bs.collapse', function () {
		page.refresh();
	});

	// $('body').removeClass('onLoading');
});

$(window).resize(function () {
	"use strict";
	page.refresh();
	page.getRatio();
	if (w < 768) {
		$('body').removeClass('invertColors');
	}
});

$(window).scroll(function () {
	"use strict";
});

var w, h;
var /*desktop=1200,*/tablet = 767/*,mobile=320*/;

var sidemenu = {
	init: function() {
		$('ul.menu li').on('click', function() {
			if (!$(this).is('.open')) {
				$('ul.menu li').removeClass('open');
				$(this).addClass('open');
			} else {
				$('ul.menu li').removeClass('open');
				$(this).removeClass('open');
			}
		});
	}
}

var page = {
	refresh: function () {
		"use strict";
		//$(window).trigger('resize');
		link.init();
		popup.init();
		sidemenu.init();
		carousel.init();
		duplicator.init();
		popup.refresh();

		$('[data-control="material"]').materialise({});
		// $('.popup').popup("refresh");
		$('[data-fast-input="true"]').fastInput('init');
		// $('[data-fastinput="true"]').fastInput('init');

		$('[data-disabled="true"]').preventAccess({});
		$('[data-disabled-group="true"]').preventAccess({
			formControl: '.form-control',
			groupPrevent: true,
			group: '[data-disabled-group]'
		});

		$('[data-draggable]').dragger();
		
		page.reInitLayout();
	},
	getRatio: function () {
		"use strict";
		w = $(window).width();
		h = $(window).height();
	},
	reInitLayout: function () {
		"use strict";
		page.getRatio();

		if (!$('.sideMenu').is('.init')) {
			var menu = $('header.header').find('nav.menu > ul > li').clone(false),
				brand = $('header.header').find('nav.menu .brand').html();
			// console.log(menu);
			$(menu).find('.tab-content').remove();
			$(menu).find('.nav-tabs').removeClass('.nav-tabs').removeAttr('role').find('li a').attr({
				"data-toggle": "",
				"aria-controls": "",
				"aria-expanded": ""
			}).each(function(i, el){
				$(el).attr('href', $(el).attr('data-xs-url') || "/");
			});
			$('.sideMenu ul.menu').append(menu);
			$('.sideMenu ul.menu .brand').append(brand);
			$('.sideMenu').addClass('init');
		}

		$('.spyAffix').each(function(i, el) {
			$(el).css('width', $(el).closest('div').width());
		});
		
		setTimeout( function(){
			var hh = $('header.header').outerHeight();
			var conHgt =  h - $('footer.footer').outerHeight();
			if($('.page').is('.inner')){
				$('.page').css({
					'padding-top': hh,
					'min-height': conHgt
				});
			} else {
				$('.page').css({
					'padding-top': hh + parseInt($('header.header').css('marginBottom')),
					'min-height': conHgt
				});
			}

			if ($(window).width() >= 991) {
				$('.filterBar, .highlightsBar, .sideBar').css('min-height', $('.page').height() - 60 );
				// if (browser.msie === true) {
				// 	$('.filterBar, .highlightsBar, .sideBar').css('height', $('.page').height() - 60 );
				// } else {
				// 	$('.filterBar, .highlightsBar, .sideBar').css('min-height', $('.page').height() - 55 );
				// }
			} else {
				$('.sideBar,.filterBar,.highlightsBar').removeAttr('style');
			}
		}, 100);
		
		// var wa = $('.conArea').find('.workArea');
		// $(wa).each(function (i, el) {
		// 	if ($(wa).is('[data-scroll]') || $(wa).is('[data-scroll-x]') || $(wa).is('[data-scroll-y]')) {
		// 		$(el).parents('.page').css({
		// 			'height': (h - fh),
		// 			'overflow': "hidden"
		// 		});
		// 		/*$(el).parents('body').find('.sidebar > .fwhFixer').css('height','auto');
		// 		$(el).parents('body').find('.sidebar').css('height','auto');*/
		// 		var p = $(el).offset().top;
		// 		//console.log('pos = '+p)
		// 		//console.log('wh > h = ' + h + ' > ' + hgt)
		// 		$(el).parent('.conArea').css({
		// 			'height': (hgt) - $(el).parent('.conArea').offset().top
		// 		});
		// 		p = p + (parseInt($(el).parent('.conArea').css('padding-bottom')));
		// 		//console.log('pos++ = '+p)
		// 		$(el).css('height', h - (p + fh));
		// 	}
		// });
	}
};

// $('.menuToggler[data-toggle="mainSideBar"]').click(function () {
// 	"use strict";
// 	page.getRatio();
// 	if (w > tablet && $('.header .navbar-brand').hasClass('minimize')/* && !$('[data-name="mainSideBar"]').hasClass('minimise')*/) {
// 		$('.header .navbar-brand').removeClass('minimize');
// 	} else if (w <= tablet) {
// 		$('.header .navbar-brand').addClass('minimize');
// 	} else {
// 		$('.header .navbar-brand').addClass('minimize');
// 	}
// });
