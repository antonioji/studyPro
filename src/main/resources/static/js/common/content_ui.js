
//calendar  :::: Common area :::: The code to open the calendar
function datepickerBtn() {
	$(".inp_datepicker").datepicker({
		 dateFormat: 'dd/mm/yy'
	});
	$(".img_datepicker").click(function(){
		$(this).prev().focus();
	});

	function getCalculatedDate(iYear, iMonth, iDay, seperator){
	 //Gets current date object.
	 var gdCurDate = new Date();
	 //Calculate date on current date.
	 gdCurDate.setYear( gdCurDate.getFullYear() + iYear );
	 gdCurDate.setMonth( gdCurDate.getMonth() + iMonth );
	 gdCurDate.setDate( gdCurDate.getDate() + iDay );
	 
	 //Receive year, month, and day variables for actual use.
	 var giYear = gdCurDate.getFullYear();
	 var giMonth = gdCurDate.getMonth()+1;
	 var giDay = gdCurDate.getDate();
	 //Set the month, day digits to 2 digits.
	 giMonth = "0" + giMonth;
	 giMonth = giMonth.substring(giMonth.length-2,giMonth.length);
	 giDay   = "0" + giDay;
	 giDay   = giDay.substring(giDay.length-2,giDay.length);
	 //display Shape fitting.
	 return giDay + seperator + giMonth + seperator + giYear ;
	}

	$("#1week").click(function(){
        $("#searchEndDt").val(getCalculatedDate(0,0,0,'/'));
        $("#searchSrtDt").val(getCalculatedDate(0,0,-7,'/'));
    });

    $("#1month").click(function(){
        $("#searchEndDt").val(getCalculatedDate(0,0,0,'/'));
        $("#searchSrtDt").val(getCalculatedDate(0,-1,0,'/'));
    });

    $("#3month").click(function(){
        $("#searchEndDt").val(getCalculatedDate(0,0,0,'/'));
        $("#searchSrtDt").val(getCalculatedDate(0,-3,0,'/'));
    });
}


//Layer Popup Vertical Center Alignment  :::: Common area ::::
function layer_open(el,dimmed){
	var temp = $('#' + el);		//Storing the layer's id in the temp variable
	var el_parent = $(temp).parent().parent();

	if(el_parent.hasClass("layerpop_further_wrap")){
		if(dimmed === false){
			$('.laydim').show();
			$(temp).parent().parent().show();
			$(temp).show();
		}else{
			$(temp).parent().parent().show();
			$(temp).show();
		}
	}else{
		if(dimmed === false){
			var el_wrap = temp.wrap('<div class="layerpop_further_wrap"></div>');
			var el_further_wrap = el_wrap.wrap('<div class="layerpop_wrap"></div>');
			var el_dimmed = $('#wrap').prepend('<div class="laydim"></div>');
			$('.laydim').css("height", $(document).height());
			temp.show();
		}else{
			var el_wrap = temp.wrap('<div class="layerpop_further_wrap"></div>');
			var el_further_wrap = el_wrap.wrap('<div class="layerpop_wrap"></div>');
			temp.show();
		}
	}

	//Close layer pop-up
	temp.find('.btn_modal_close').click(function(){
		if(dimmed === false){
			$('.laydim').fadeOut();
			$(temp).parent().parent().fadeOut();
		}else{
			$(temp).parent().parent().fadeOut();
		}
	});
}

function loading_layer_close(el){
	$(el).unwrap();
	$(el).unwrap();
	$(el).fadeOut();
	$('.laydim').fadeOut().remove();
	
}

//Layer Popup Vertical Center Alignment - 04_EC_PR_v0.7.0_product_detail_deal View Details
function layer_open_slide(el,dimmed,slideIdx){
	var temp = $('#' + el);		//Storing the layer's id in the temp variable
	var el_parent = $(temp).parent().parent();

	if(el_parent.hasClass("layerpop_further_wrap")){
		if(dimmed === false){
			$('.laydim').show();
			$(temp).parent().parent().show();
			$(temp).show();
		}else{
			$(temp).parent().parent().show();
			$(temp).show();
		}
	}else{
		if(dimmed === false){
			var el_wrap = temp.wrap('<div class="layerpop_further_wrap"></div>');
			var el_further_wrap = el_wrap.wrap('<div class="layerpop_wrap"></div>');
			var el_dimmed = $('#wrap').prepend('<div class="laydim"></div>');
			$('.laydim').css("height", $(document).height());
			temp.show();
		}else{
			var el_wrap = temp.wrap('<div class="layerpop_further_wrap"></div>');
			var el_further_wrap = el_wrap.wrap('<div class="layerpop_wrap"></div>');
			temp.show();
		}
	}

	//Close layer pop-up
	temp.find('.btn_modal_close').click(function(){
		if(dimmed === false){
			$('.laydim').fadeOut();
			$(temp).parent().parent().fadeOut();
		}else{
			$(temp).parent().parent().fadeOut();
		}
	});

	if (prdtlay_banner == undefined) {
		prdtlaypop_Slider();
	}

	prdtlay_banner.goToSlide(slideIdx);


}

//Layer_ui layer popup mouse position individual :::: Common area ::::
function lay_open(el, event){
	event = event || window.event; 
	var temp = $('#' + el);
	var divTop = event.pageY; //Top Coordinates
	var divLeft = event.pageX; //Left Coordinates
 
	var laywidth = temp.width();
	var wrapX = $('#wrap').width();

	temp.find('.lay_close').click(function(){
		$(temp).hide();
	});

	if((wrapX - divLeft > laywidth) === true){
		$(temp).css({
	     "top": (divTop-30) +"px"
	     ,"left": divLeft +"px"
	     , "position": "absolute"
		 }).show();
		
	}else{
		$(temp).css({
	     "top": (divTop-30) +"px"
	     ,"left": (divLeft-laywidth/2)-200 +"px"
	     , "position": "absolute"
		 }).show();
	}
}
function promo_open(el, event){
	var temp = $('#' + el);
	var layheight = temp.height();
	var laywidth = temp.width();
	var innerbox = $(".appear_area");

	temp.find('.promo_close').click(function(){
		$(temp).hide();
	});

	$(temp).css({
	"position": "absolute",
	"margin-top": - layheight/2,
	"margin-left": - laywidth/2,
	"top": innerbox.offset().top + (innerbox.height()/2) ,
	"left": "50%"
	}).show();
}


//select_ui layer  :::: Common area :::: Various pages select_ui layer open
function selui_Layer(){
	$('.select_ui > button').on('click', function(e) {
      	var btny = e.clientY;
      	var divy = $(this).parent().children("div").height();
      	var winy = $( window ).height();
      	var lery = divy + $(this).parent().children("button").height();

      	if((winy-btny > divy) === true ){
      		if(!$(this).parent().hasClass('on')){
				$('.select_ui').removeClass('on');
				$(this).parent().children("div").css('margin-top','-1px');
				$(this).parent().addClass('on');
			}else{
				$(this).parent().removeClass('on');
			}
      	}else{
      		if(!$(this).parent().hasClass('on')){
				if((btny>divy) === false ){
					$('.select_ui').removeClass('on');
					$(this).parent().addClass('on');
					$(this).parent().children("div").css('margin-top', '-1px');
				}else{
					$('.select_ui').removeClass('on');
					$(this).parent().addClass('on');
					$(this).parent().children("div").css({'margin-top': '-'+lery + 'px'});
				}
			}else{
				$(this).parent().removeClass('on');
				$(this).parent().children("div").css('margin-top','-1px');
			}
      	}

	});
}


//select_ui layer When selected - Top search area  :::: Common area :::: Header search area selectbox layer open
function selui_Search(){
	$('.gnb_innr .select_ui > .poplayer_wrap a').on('click', function() {
		var selbtn = $(this).parent().parent().parent().parent().children('button');
		var seltxt = $(this);
		var selectul = $('.select_ui');
		$(selbtn).text('');
		$(seltxt).clone().appendTo(selbtn);
		$(selectul).removeClass('on');
		$('.poplayer_wrap li').removeClass('on');
		$(this).parent().addClass('on');
	});
}


//Change selected option when select_ui option is selected
function selui_Laycheck(){
	$('.select_ui > .poplayer_wrap .layer_sellist_type1.celltype a').on('click', function() {
		var selbtn = $(this).parent().parent().parent().parent().children('button');
		var seltxt = $(this).children();
		var selectul = $('.select_ui');
		$(selbtn).text('');
		$(seltxt).clone().appendTo(selbtn);
		$(selectul).removeClass('on');
		$('.poplayer_wrap .layer_sellist_type1.celltype a').removeClass('on');
		$(this).addClass('on');
	});
}

//Change selected option when select_ui option is selected
function seluiprd_Laycheck(){
	$('.poplayer_wrap.prd_otp .layer_sellist_type1.celltype li').css('cursor', 'pointer');
	$('.select_ui > .poplayer_wrap.prd_otp .layer_sellist_type1.celltype li').on('click', function() {
		/* 2017-03-29 : Add a development part request */
		if($(this).hasClass('sold_out')) {
			return;
		}
		/*// 2017-03-29 : Add a development part request */
		var selbtn = $(this).parent().parent().parent().parent().children('button');
		var seltxt = $(this).children();
		var selectul = $('.select_ui');
		$(selbtn).text('');
		$(seltxt).clone().appendTo(selbtn);
		$(selectul).removeClass('on');
		$('.poplayer_wrap.prd_otp .layer_sellist_type1.celltype li').removeClass('on');
		$(this).addClass('on');
	});

	$('.poplayer_wrap.prd_otp2 .layer_sellist_type1.celltype li').css('cursor', 'pointer');
	$('.select_ui > .poplayer_wrap.prd_otp2 .layer_sellist_type1.celltype li').on('click', function() {
		/* 2017-03-29 : Add a development part request */
		if($(this).hasClass('sold_out')) {
			return;
		}
		/*// 2017-03-29 : Add a development part request */
		var selbtn = $(this).parent().parent().parent().parent().children('button');
		var seltxt = $(this).children();
		var selectul = $('.select_ui');
		$(selbtn).text('');
		$(seltxt).clone().appendTo(selbtn);
		$(selbtn).children("span:first-child").remove();
		$(selectul).removeClass('on');
		$('.poplayer_wrap.prd_otp2 .layer_sellist_type1.celltype li').removeClass('on');
		$(this).addClass('on');
	});

	//04_EC_PR_v0.7.0_product_detail_deal selectbox Specification
	$('.poplayer_wrap.prd_otp3 .layer_sellist_type1.cellimg li').css('cursor', 'pointer');
	$('.prd_opt_detail').hide();
	$('.prd_opt_detail:first').show();
	$('.select_ui.prd_select > .poplayer_wrap.prd_otp3 .layer_sellist_type1.cellimg li').on('click', function() {
		if($(this).hasClass('sold_out')) {
			return;
		}
		var selindex = $(this).index();
		var seldetail = $('.prd_opt_detail');
		var selbtn = $(this).parent().parent().parent().parent().children('button');
		var seltxt = $(this).children();
		var selectul = $('.select_ui');
		$(selbtn).text('');
		$(seltxt).clone().appendTo(selbtn);
		$(selectul).removeClass('on');
		$('.poplayer_wrap.prd_otp3 .layer_sellist_type1.cellimg li').removeClass('on');
		$(this).addClass('on');
		$(seldetail).hide();
		$('.prd_opt_detail:eq('+selindex+')').show();
	});
	//04_EC_PR_v0.7.0_product_detail_deal selectbox Review
	$('.poplayer_wrap.prd_otp3_2 .layer_sellist_type1.cellimg li').css('cursor', 'pointer');
	$('.prd_opt_review').hide();
	$('.prd_opt_review:first').show();
	$('.select_ui.prd_select2 > .poplayer_wrap.prd_otp3_2 .layer_sellist_type1.cellimg li').on('click', function() {
		if($(this).hasClass('sold_out')) {
			return;
		}
		var selindex = $(this).index();
		var seldetail = $('.prd_opt_review');
		var selbtn = $(this).parent().parent().parent().parent().children('button');
		var seltxt = $(this).children();
		var selectul = $('.select_ui');
		$(selbtn).text('');
		$(seltxt).clone().appendTo(selbtn);
		$(selectul).removeClass('on');
		$('.poplayer_wrap.prd_otp3_2 .layer_sellist_type1.cellimg li').removeClass('on');
		$(this).addClass('on');
		$(seldetail).hide();
		$('.prd_opt_review:eq('+selindex+')').show();
	});

	//EC_PR_v0.7.0_product_detail_deal Option selectbox
	$('.img_select .poplayer_wrap.prd_otp3 .layer_sellist_type1 li').css('cursor', 'pointer');
	$('.select_ui.img_select > .poplayer_wrap.prd_otp3 .layer_sellist_type1 li').on('click', function() {
		if($(this).hasClass('sold_out')) {
			return;
		}
		var selbtn = $(this).parent().parent().parent().parent().children('button');
		var seltxt = $(this).children();
		var selectul = $('.select_ui');
		$(selbtn).text('');
		$(seltxt).clone().appendTo(selbtn);
		$(selectul).removeClass('on');
		$('.img_select .poplayer_wrap.prd_otp3 .layer_sellist_type1 li').removeClass('on');
		$(this).addClass('on');
	});
}


//layer_ui layer :::: Common area :::: Navigation bar location Level layer open
function layui_Layer(){
	$('.layer_ui > .layer_ui_btn').on('click', function(e) {
		var btny = e.clientY;
      	var divy = $(this).parent().children("div").height();
      	var winy = $( window ).height();
      	var lery = divy + $(this).parent().children("button").height();
		var check = $(this).hasClass("none");
		var check1 = $(this).hasClass("logo");
		
		if(!check && !check1){
			if((winy-btny > divy) === true ){
				if(!$(this).parent().hasClass('on')){
					$('.layer_ui').removeClass('on');
					$(this).parent().children("div").css('margin-top','-1px');
					$(this).parent().addClass('on');
				}else{
					$(this).parent().removeClass('on');
				}
			}else{
				if(!$(this).parent().hasClass('on')){
					$('.layer_ui').removeClass('on');
					$(this).parent().addClass('on');
					$(this).parent().children("div").css({'margin-top': '-'+lery + 'px'});
				}else{
					$(this).parent().removeClass('on');
					$(this).parent().children("div").css('margin-top','-1px');
				}
			}
		};
		
		if ($(this).hasClass('ex_layer_ui')) {
		
		} else {
			if(e.stopPropagation()){
				e.stopPropagation();
			}else{
				e.cancelBubbling = true;
			};
		}

		//header - top lang icon
		/*if($(this).parent().parent().hasClass('util_menus')){
			var util = $(this).parent().parent().children('li:eq(2)');
			if (util.hasClass('on')) {
				$('.poplayer_wrap.lang .pop_lang a').on('click', function() {
					var util_a = $(this).parent().children('a:first-child');
					var util_css = $('#header .utils .util_menus > li:nth-child(3)');
					if (util_a.hasClass('on')) {
						 $(util_css).removeClass('lang_id');
						 $(util_css).addClass('lang_en');
					}else{
						$(util_css).removeClass('lang_en');
						$(util_css).addClass('lang_id');
					}
				});
			}			
		}*/
	});
	$('.layer_ui > .layer_ui_btn.logo span').on('click', function(e) {
		var btny = e.clientY;
      	var divy = $(this).parent().parent().children("div").height();
      	var winy = $( window ).height();
      	var lery = divy + $(this).parent().parent().children("button").height();
		var check = $(this).hasClass("none");
		var check1 = $(this).hasClass("logo");
		
		if((winy-btny > divy) === true ){
			if(!$(this).parent().parent().hasClass('on')){
				$('.layer_ui').removeClass('on');
				$(this).parent().parent().children("div").css('margin-top','-1px');
				$(this).parent().parent().addClass('on');
			}else{
				$(this).parent().parent().removeClass('on');
			}
		}else{
			if(!$(this).parent().parent().hasClass('on')){
				$('.layer_ui').removeClass('on');
				$(this).parent().addClass('on');
				$(this).parent().parent().children("div").css({'margin-top': '-'+lery + 'px'});
			}else{
				$(this).parent().removeClass('on');
				$(this).parent().parent().children("div").css('margin-top','-1px');
			}
		}
		if(e.stopPropagation()){
			e.stopPropagation();
		}else{
			e.cancelBubbling = true;
		};

	});
	/*$(".layer_ui").click(function(e){
		var check = $(this).find(".layer_ui_btn").length, hasClass = $(this).hasClass("on");
		if(check && !hasClass){
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
		}else if(check && hasClass){
			$(this).removeClass("on");
		};
		if(e.stopPropagation()){
			e.stopPropagation();
		}else{
			e.cancelBubbling = true;
		};
	});*/

	//Layer_ui layer close
	$('.btn_layer_close, .quick_innr .btn_close').on('click', function() {
		$('.poplayer_wrap').parent().removeClass('on');
		$('#quick').addClass("mall_off");
	});
}


//layer_ui layer over :::: Common area :::: Various page layers Open when mouse over
function layui_Layover(){
	$('.layer_ui.lay_over').on('mouseenter', function(e) {
		var btny = e.clientY;
      	var divy = $(this).children("div").height();
      	var winy = $( window ).height();
      	var lery = divy + $(this).children("button").height();

      	if((winy-btny > divy) === true ){
			if(!$(this).hasClass('on')){
				$('.layer_ui').removeClass('on');
				$(this).children("div").css('margin-top','-1px');
				$(this).addClass('on');
			}else{
				$(this).removeClass('on');
			}
		}else{
			if(!$(this).hasClass('on')){
				$('.layer_ui').removeClass('on');
				$(this).addClass('on');
				$(this).children("div").css({'margin-top': '-'+lery + 'px'});
			}else{
				$(this).removeClass('on');
				$(this).children("div").css('margin-top','-1px');
			}
		}
	});

	//layer_ui layer out
	$('.layer_ui.lay_over').on('mouseleave', function() {
		$(this).removeClass('on');
	});
}


//select_ui, layer_ui layer  lay_pop Outside click :::: Common area :::: Closing layer pop-up when clicking outside layer
function uiLayer_ready() {
	$('#wrap').click(function(e){
		var selectul = $('.select_ui');
		if(selectul.has(e.target).length === 0){
			selectul.removeClass('on');
		}

		var layerul = $('.layer_ui');
		if(layerul.has(e.target).length === 0){
			layerul.removeClass('on');
		}

		var laypop = $('.poplayer_wrap.lay_pop');
		if($(laypop).is(":visible")) {
			if($(e.target).hasClass('lay_txt') || $(e.target).find('.lay_txt').length) {
				$(laypop).show();
			}else{
				if(!$('.poplayer_wrap').has(e.target).length) {
					$(laypop).hide();
				}
			}
		}

		var laypop = $('.poplayer_wrap.lay_pop2');
		if($(laypop).is(":visible")) {
			if($(e.target).hasClass('lay_txt') || $(e.target).find('.lay_txt').length) {
				$(laypop).hide();
			}
		}

		var tsrchkwdslay = $('.top_search_keywordlayer');
		if($(tsrchkwdslay).is(":visible")) {
			if(!$(e.target).is('#gnb .search_input > input') && !$(e.target).parents().is(tsrchkwdslay)) {
				$(tsrchkwdslay).hide();
			}
		}

		/*var tmalllay = $('#header .util_mall .mall');
		if($(tmalllay).is(":visible")) {
			if(!$(e.target).is('.btn_mall') && !$(e.target).parents().is(tmalllay)) {
				$(tmalllay).removeClass('on');
				$(tmalllay).prev('.btn_mall').removeClass('on');
			}
		}*/
	});

	//EC-CS-0101_Customer Service Info - Live Chat layer popup 닫기
	$(document).on('click', 'body', function(e) {
		var livechat = $('.poplayer_wrap.livechat');
		if($(livechat).is(":visible")) {
			if($(e.target).hasClass('lay_txt')) {
				$(livechat).show();
			}else{
				if(livechat.has(e.target).length === 0){
					$(livechat).hide();
				}else{
					$(livechat).show();
				}
			}
		}
	});
 }


//Layer_popup mouse position - ECM_EC_PR_0228 
function dimnotPop(el) {
	var temp = $('#' + el);
	$(temp).show();

	temp.find('.lay_close').click(function(){
		$(temp).hide();
	});
}


//Close layer_popup - ECM_EC_PR_0228 
function dimnotPopclose() {
	$('.pop_layer').hide();
}


//main layout animate  :::: Common area :::: Header, quick Controls movement and menu when scrolling
function mainLayout_ani() {
	var $header = $('#header');
	var $headermain = $('#header.main_header');
	var $quick = $('#quick');
	var $allMenus = $('.allmenus');

	//utils mall banner
	$('.utils').find('.mall>li').on({
		'mouseenter focusin': function(e) {
			if ($header.hasClass('scr') == false) {
				var checkClass = $("#header > .header_innr").attr("class").replace(/header\_innr /g, ''),check_num = $(this).index();
				if(($("#header > .header_innr").hasClass("avenue") == true || $("#header > .header_innr").hasClass("mart") == true || $("#header > .header_innr").hasClass("lejel") == true) && check_num == 0){
					$(".banner_group").children().hide().end().children(":eq(0)").show().end().siblings().hide();
				}else if(($("#header > .header_innr").hasClass("lotter") == true || $("#header > .header_innr").hasClass("mart") == true || $("#header > .header_innr").hasClass("lejel") == true) && check_num == 1){
					$(".banner_group").children().hide().end().children(":eq(1)").show().end().siblings().hide();
				}else if(($("#header > .header_innr").hasClass("lotter") == true || $("#header > .header_innr").hasClass("avenue") == true || $("#header > .header_innr").hasClass("lejel") == true) && check_num == 2){
					$(".banner_group").children().hide().end().children(":eq(2)").show().end().siblings().hide();
				}else if(($("#header > .header_innr").hasClass("lotter") == true || $("#header > .header_innr").hasClass("avenue") == true || $("#header > .header_innr").hasClass("mart") == true) && check_num == 3){
					$(".banner_group").children().hide().end().children(":eq(3)").show().end().siblings().hide();
				}else{
					$(".banner_group").children().hide().end().siblings().show();
				};
				if(!$(this).hasClass("brand")){
					$('.utils .mall>li').removeClass('hover').eq($(this).index()).addClass('hover');
				};
			}
			logo_show_hide();
			e.stopPropagation();
		}, 'mouseleave focusout': function() {
			/*
			if ($header.hasClass('scr') == false) {
				$('.utils .mall>li').removeClass('hover').filter(function() {return $(this).hasClass('on') == true}).addClass('hover')
			}
			*/
		}
	}).end().find('.btn_mall').on('click', function() {
		$(this).toggleClass('on').next('.mall').toggleClass('on');
	});
	if($("#gnb").length){
		$("#gnb").mouseover(function(e){
			e.stopPropagation();
		});
	};
	if($(".header_innr").length){
		$("#wrap").mouseover(function(){
			var checkClass = $(".header_innr").attr("class").replace(/header\_innr /g, '');
			if($("#header > .header_innr").hasClass("lotter") == true){
				$(".mall li").removeClass("hover").eq(0).addClass("hover");
			}else if($("#header > .header_innr").hasClass("avenue") == true){
				$(".mall li").removeClass("hover").eq(1).addClass("hover");
			}else if($("#header > .header_innr").hasClass("mart") == true){
				$(".mall li").removeClass("hover").eq(2).addClass("hover");
			}else if($("#header > .header_innr").hasClass("lejel") == true){
				$(".mall li").removeClass("hover").eq(3).addClass("hover");
			};
			$(".mall_banner, .search_box, .top_banner, .top_mart").attr("style","");
			logo_show_hide();
		});
	};
	logo_show_hide();
	/* logo */
	function logo_show_hide(){
		$(".logo_group h1").hide();
		$(".logo_group h1").eq($(".util_mall .mall li.hover").index()).show();
	};
	//all-category button
	$('.allmenus .btn_menu').not(".none").click(function() {
		if ($header.is('.scr')) {
			$allMenus.toggleClass('header_scr_on');
		}
		else {
			if (!$('body').is('#main')) {
				$allMenus.toggleClass('on');
				if($headermain.length){
					$allMenus.addClass('on');
				}
			}
		}
	});

	//all-category menus
	/* 2017-03-13 : mouse over event -> click event
	$('.allmenus_ctgs>li').on('mouseenter focusin', function() {
		$('.allmenus_ctgs>li').removeClass('on');
		$(this).addClass('on');
	}).on('mouseleave focusout', function() {
		$(this).removeClass('on');
	}); */
	var linon = $('.allmenus_ctgs>li');
	$('.allmenus_ctgs>li').on('mouseenter', function(e) {
//		$('.allmenus_ctgs>li').removeClass('on');
		if(!$(this).hasClass("none")){
			$(".allmenus_ctgs_subin").attr("style","");
			$(this).addClass('on').siblings().removeClass('on');
			if($(".main_header.mart_main").length){$("#header").addClass("open_menu");};
			var src = $(this).find(".t1 > img").attr("src").replace(/_on/g, '');
			src = src.replace(/(.*)(\.[jJpPgG][pPnNiI][gGfF])/g, '$1\_on$2');
			$(this).find(".t1 > img").attr("src",src);
			$(".allmenus_view").addClass("ham main");
		}else {
			if($('.allmenus_ctgs > li.on').length){
				$('.allmenus_ctgs > li.on .allmenus_ctgs_subin').show();
				var src = $('.allmenus_ctgs > li.on .t1 img').attr("src").replace(/(.*)(\.[jJpPgG][pPnNiI][gGfF])/g, '$1\_on$2');
				$('.allmenus_ctgs > li.on .t1 img').attr("src",src);
			}else{
//				$(".allmenus_view").removeClass("main");
			};
		};

//		$(linon).css('border-right','1px solid #777');
//		$(this).css('border-right','1px solid #fff');
		
	}).on('mouseleave', function() {
		/*$('.allmenus_ctgs>li').removeClass('on');
		if ($('.allmenus').hasClass('header_scr_on')) {
			$('.allmenus.header_scr_on').find('.allmenus_view').hide();
		}*/
		var index3 = Math.abs($('.allmenus_ctgs > li.on').index());
		if(!$(this).hasClass("none")){
			var src = $(this).find(".t1 > img").attr("src").replace(/(.*)(\_on)(\.[jJpPgG][pPnNiI][gGfF])/g, '$1$3');
			$(this).find(".t1 > img").attr("src",src);
			$(linon).css('border-right','1px solid #fff');
		}else if($('.allmenus_ctgs > li.on').length && $(this).hasClass("none")){
			var src = $('.allmenus_ctgs > li:eq(' + index3 + ') .t1 img').attr("src").replace(/(.*)(\_on)(\.[jJpPgG][pPnNiI][gGfF])/g, '$1$3');
			$('.allmenus_ctgs > li:eq(' + index3 + ') .t1 img').attr("src",src);
		}else{
		};
	});

	//all-category banner slide
	if ($('.allmenus_adbanner').length > 0) {
		$('.allmenus_adbanner >ul').bxSlider({
			controls: false
		});
	}

	//quick
	$quick.find('.btn_close').click(function() {
		$quick.removeClass('on');
	}).end().find('.btn_open').click(function() {
		$quick.addClass('on').removeClass('mall_off');
	}).end().find('.btn_top').click(function() {
		$('html, body').stop().animate({scrollTop:0}, '500', 'swing');
	});

	//scroll header
	$(window).scroll(function(){
		if ($header.length > 0) {
			if ($('body').attr('id') === 'main') {
				if ($('.main_top').length){
					var mainScrTop = $('.main_top').offset().top + $('.main_top').outerHeight();
					if ($(window).scrollTop() <= mainScrTop) {
						$header.removeClass('scr').find('.utils .btn_mall, .utils .mall').removeClass('on');
						$header.find('.layer_ui').removeClass('on');
						$header.find('.select_ui').removeClass('on');
						$('body').css('paddingTop',0);
						if($headermain.length){
							$allMenus.removeClass('header_scr_on').addClass('on');
						}
					} else {				
						$allMenus.removeClass('on');
						$header.find('.layer_ui').removeClass('on');
						$header.find('.select_ui').removeClass('on');
						$('body').css('paddingTop',$header.height());
						if($headermain.length){
							$header.addClass('scr');
						}
					}
				}
			} else {
				if ($(window).scrollTop() <= $header.next().offset().top) {
					$header.removeClass('scr').find('.utils .btn_mall, .utils .mall').removeClass('on');
					$('body').css('paddingTop',0);
					$header.find('.layer_ui').removeClass('on');
					$header.find('.select_ui').removeClass('on');
					if($headermain.length){
						$allMenus.removeClass('header_scr_on').addClass('on');
					}
				} else {
					$header.addClass('scr');
					$allMenus.removeClass('on');
					$('body').css('paddingTop',$header.height());
					$header.find('.layer_ui').removeClass('on');
					$header.find('.select_ui').removeClass('on');
					$allMenus.removeClass('header_scr_on');
				}
			}
		}
	});

	//search keyword layer
	$('.top_search_keywordlayer .btn_close').click(function() {
		$('.top_search_keywordlayer').hide();
	});

	//top_popbanner
	$('.top_popbanner .btn_close').click(function() {
		$('.top_popbanner_wrap').slideUp(200);
		$('body').addClass('top_pop_close');
	});
	$(".search_input input[type = 'search']").focus(function(){
	});
}


 //main quick WISH LIST & HISTORY slider :::: Common area :::: Controls the slides that appear in the lower quickbar
function quickSlid_footer() {

	//quick Notice slider
	var quick_noti_slide = $('.quick_noti_slide').bxSlider({
		mode: 'vertical'
	});


	//quick Recent slider
	/*$(function() {

		function isMobile2() {
		  return window.innerWidth < 20;
		}

		function isTablet2() {
		  return window.innerWidth > 500 && window.innerWidth < 1280;
		}

		function isDesktop2() {
		  return window.innerWidth > 1281;
		}

		var $slider2 = $('.quick_favo_slide');
		var $items2 = $('.quick_favo_slide .item');
		var bxslider2;

		function sliderLoad2() {
		  var group = [];
		  var circle = isMobile2() ? 2 : isTablet2() ? 2 : 1;

		  $items2.each(function(index,e) {
		    var key = Math.floor(index/circle)
		    var arr = group[key];
		    if(!arr) {
		      arr = group[key] = []
		    }
		    arr.push(index);
		  });

		  group.forEach(function(arr) {
		    var $wrap = $('<div class="wrap-item">');
		    arr.forEach(function(index) {
		      $wrap.append($items2.eq(index));
		    });
		    $slider2.append($wrap);
		  });

		  bxslider2 = $slider2.bxSlider({
		    auto: false,
		    mode: "vertical",
		    pager: false,
		    controls: true,
		    autoHover: true,
		    pause: 3000,
		    onSliderLoad: function(currentIndex){
		      var $slideElement = this.getCurrentSlideElement();
		      $slideElement.addClass('in');
		    },
		    onSlideBefore: function($slideElement, oldIndex, newIndex){
		      $slideElement.siblings().addClass('out').removeClass('in')
		    },
		    onSlideAfter: function($slideElement, oldIndex, newIndex){
		      $slideElement.removeClass('out');
		      setTimeout(function(){
		        $slideElement.addClass('in');
		      }, 300)},
		  });
		}

		$('.quick_favo_slide').each(function(index, slider) {
		  sliderLoad2();
		});

		$(window).on('resize', function(e){
		  if(!bxslider2) {
		    return;
		  }
		  bxslider2.destroySlider();
		  $slider2.html('');
		  sliderLoad2();
		});

	});*/



	//quick Recent slider - ilotte
	$(function() {
		function isMobile() {
		  return window.innerWidth < 20;
		}

		function isTablet() {
		  return window.innerWidth > 20 && window.innerWidth < 1280;
		}

		function isDesktop() {
		  return window.innerWidth > 1023;
		}

		var $slider = $('.quick_his_slide.ilotte');
		var $items = $('.quick_his_slide.ilotte .item');
		var bxslider;

		function sliderLoad() {
			
		var s_num = 5, b_num = 5, check = $('#quick').hasClass("mall_wrap");
		  if(check){
			  s_num = 3;
			  b_num = 6;
		  };
		  var group = [];
		  var circle = isMobile() ? 1 : isTablet() ? s_num : b_num;

		  $items.each(function(index,e) {
		    var key = Math.floor(index/circle)
		    var arr = group[key];
		    if(!arr) {
		      arr = group[key] = []
		    }
		    arr.push(index);
		  });

		  group.forEach(function(arr) {
		    var $wrap = $('<div class="wrap-item">');
		    arr.forEach(function(index) {
		      $wrap.append($items.eq(index));
		    });
		    $slider.append($wrap);
		  });

		  bxslider = $slider.bxSlider({
		    auto: false,
		    mode: "vertical",
		    pager: false,
		    controls: true,
		    autoHover: true,
		    pause: 3000,
		    onSliderLoad: function(currentIndex){
		      var $slideElement = this.getCurrentSlideElement();
		      $slideElement.addClass('in');
		    },
		    onSlideBefore: function($slideElement, oldIndex, newIndex){
		      $slideElement.siblings().addClass('out').removeClass('in')
		    },
		    onSlideAfter: function($slideElement, oldIndex, newIndex){
		      $slideElement.removeClass('out');
		      setTimeout(function(){
		        $slideElement.addClass('in');
		      }, 300)},
		  });
		}

		$('.quick_his_slide.ilotte').each(function(index, slider) {
		  sliderLoad();
		});

		$(window).on('resize', function(e){
		  if(!bxslider) {
		    return;
		  }
		  bxslider.destroySlider();
		  $slider.html('');
		  sliderLoad();
		});
	});
}


//Login / Sign Up information page banner slider
function logjoin_Slider() {
	$('.baning_me').bxSlider({
		mode: 'horizontal',
		auto: true,
		pause: 2000
	});

	// Resolved clicks on click //
	$(document).on('click mouseover','.banner_area .bx-pager-link, .banner_area .bx-pager-item',function() {
		var bxSliderObj = $(this).parents(".banner_area").find('.baning_me').data("bxSlider");

		bxSliderObj.stopAuto();
		bxSliderObj.startAuto();
	});
	//login tab banner slider
	/*$(".login_wrap .tab_cont_wrap .tab_cont").hide();
    $(".login_wrap .tab_cont_wrap .tab_cont:first").show();

    $(".login_wrap ul.tab_list li").click(function () {
        $(".login_wrap ul.tab_list li").removeClass("on");
        $(this).addClass("on");
        $(".login_wrap .tab_cont_wrap .tab_cont").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn();

		if ($(this).hasClass("on")) {
			setTimeout(function() {
			banner_area1.reloadSlider();
			banner_area2.reloadSlider();
		}, 200);}
		else{
			setTimeout(function() {
			banner_area1.reloadSlider();
			banner_area2.reloadSlider();
		}, 200);
		}
    });

    var banner_area1 = $('.banners1').bxSlider({
	  mode: 'horizontal',
	  auto: true,
	  pause: 2000
	});

	var banner_area2 = $('.banners2').bxSlider({
	  mode: 'horizontal',
	  auto: true,
	  pause: 2000
	});

 	// Resolved clicks on click
	$(document).on('click','.signon_wrap .bx-pager-link, .signon_wrap .bx-pager-item',function() {
		banner_area1.stopAuto();
		banner_area1.startAuto();
		banner_area2.stopAuto();
		banner_area2.startAuto();
	});
	$(document).on('mouseover','.signon_wrap .bx-pager-link, .signon_wrap .bx-pager-item',function() {
		banner_area1.stopAuto();
		banner_area1.startAuto();
		banner_area2.stopAuto();
		banner_area2.startAuto();
	});*/
}

//5 products banner slider :::: Common area ::::
function prd5_Slider() {
   var prd5_banner = $('.prd5_slider').bxSlider({
   		pause: 3000,
	   	minSlides: 5,
	  	maxSlides: 5,
	  	slideWidth: 240,
		auto: false
	});

    //Resolved clicks on click //
	/*$(document).on('click','.bx_prdbox .bx-pager-link, .bx_prdbox .bx-pager-item, .bx_prdbox .bx-prev, .bx_prdbox .bx-next', function() {
		prd_banner.stopAuto();
		prd_banner.startAuto();
		prd_banner2.stopAuto();
		prd_banner2.startAuto();
	});
	$(document).on('mouseover','.bx_prdbox .bx-pager-link, .bx_prdbox .bx-pager-item, .bx_prdbox .bx-prev, .bx_prdbox .bx-next', function() {
		prd_banner.stopAuto();
		prd_banner.startAuto();
		prd_banner2.stopAuto();
		prd_banner2.startAuto();
	});*/

	//Left and right button color change
	/*$('.bx_prdbox .bx-prev, .bx_prdbox .bx-next').mouseover(function(){
        $(this).css('opacity', '1');
    }).mouseout( function () {
        $(this).css('opacity', '0.5');
    });*/
}
//4 products banner slider :::: Common area ::::
function prd4_Slider() {
   var prd4_slider = $('.prd4_slider'), check = true, first = new Array, obj = new Array; max_width = 1280 - 17;
   if(prd4_slider.length){
		prd4_slider.each(function(index, node){
			first[index] = true;
			obj[index] = $(node);
		});
		ex();
		$(window).on("resizeEnd", function (){
			ex();
		});
		function ex(){
			prd4_slider.each(function(index, node){
				if(resize() > max_width){
					check = true;
				}else{
					check = false;
				};
				roll_fn(index);
			});
		};
		function resize(){
			return $(window).innerWidth();
		};
		function roll_fn(index){
			if(resize() > max_width && check){
				first_check(index);
				if(obj[index].children().length > 4){
					obj[index].bxSlider({
						minSlides: 4,
						maxSlides: 4,
						slideWidth: 320
					});
					check = false;
				}else{
					first[index] = true;
				};
			}else if(resize() <= max_width  && !check){
				first_check(index);
				if(obj[index].children().length > 3){
					obj[index].bxSlider({
						minSlides: 3,
						maxSlides: 3,
						slideWidth: 320
					});
					check = true;
				}else{
					first[index] = true;
				};
			};
			/*
			$('.prd_area.type02.category_new .bx-wrapper .bx-pager.bx-default-pager a').hover(function(){
			     obj[index].goToNextSlide();
			     
			}, function(){
				return false;
			});
			*/
		};
		function first_check(index){
			if(first[index]){
				first[index] = false;
			}else{
				obj[index].destroySlider();
			};
		};
		
   };
}

//8 products banner slider :::: Common area ::::
function prd8_Slider() {
   var prd8_Slider = $('.prd8_slider'), check = true, first = new Array, obj = new Array; max_width = 1280 - 17;
   if(prd8_Slider.length){
		prd8_Slider.each(function(index, node){
			first[index] = true;
			obj[index] = $(node);
		});
		ex();
		$(window).on("resizeEnd", function (){
			ex();
		});
		function ex(){
			prd8_Slider.each(function(index, node){
				if(resize() > max_width){
					check = true;
				}else{
					check = false;
				};
				roll_fn(index);
			});
		};
		function resize(){
			return $(window).innerWidth();
		};
		function roll_fn(index){
			if(resize() > max_width && check){
				first_check(index);
				if(obj[index].children().length > 5){
					obj[index].bxSlider({
						minSlides: 5,
						maxSlides: 5,
						moveSlides: 5,
						slideWidth: 240
					});
					check = false;
				}else{
					first[index] = true;
				};
			}else if(resize() <= max_width  && !check){
				first_check(index);
				if(obj[index].children().length > 4){
					obj[index].bxSlider({
						minSlides: 4,
						maxSlides: 4,
						moveSlides: 4,
						slideWidth: 240
					});
					check = true;
				}else{
					first[index] = true;
				};
			};
			/*
			$('.prd_area.type02.category_new .bx-wrapper .bx-pager.bx-default-pager a').hover(function(){
			     obj[index].goToNextSlide();
			     
			}, function(){
				return false;
			});
			*/
		};
		function first_check(index){
			if(first[index]){
				first[index] = false;
			}else{
				obj[index].destroySlider();
			};
		};
		
   };
}

//7 products banner slider :::: Common area ::::
function prd7_Slider() {
   var prd7_Slider = $('.prd7_slider'), check = true, first = true, max_width = 1280 - 17;
	if(prd7_Slider.length){
		if(resize() > max_width){
			check = true;
		}else{
			check = false;
		};
		roll_fn();
		$(window).on("resizeEnd", function (){
			roll_fn();
		});
		function resize(){
			return $(window).innerWidth();
		};
		function roll_fn(){
			if(resize() > max_width && check){
				first_check2();
				prd7_Slider.bxSlider({
					pause: 3000,
					minSlides: 5,
					maxSlides: 5,
					slideWidth: 320,
					auto: false
				});
				check = false;
			}else if(resize() <= max_width  && !check){
				first_check2();
				prd7_Slider.bxSlider({
					pause: 3000,
					minSlides: 3,
					maxSlides: 3,
					slideWidth: 320,
					auto: false
				});
				check = true;
			};
		};
		function first_check2(){
			if(first){
				first = false;
			}else{
				prd7_Slider.destroySlider();
			};
		};
	};
}
(function ($, window) {
    var jqre = {};

    // Settings
    // eventName: the special event name.
    jqre.eventName = "resizeEnd";

    // Settings
    // delay: The numeric interval (in milliseconds)
    // at which the resizeEnd event polling loop executes.
    jqre.delay = 250;

    // Poll function
    // triggers the special event jqre.eventName when resize ends.
    // Executed every jqre.delay milliseconds while resizing.
    jqre.poll = function () {
        var elem = $(this),
            data = elem.data(jqre.eventName);

        // Clear the timer if we are still resizing
        // so that the delayed function is not exectued
        if (data.timeoutId) {
            window.clearTimeout(data.timeoutId);
        }

        // triggers the special event
        // after jqre.delay milliseconds of delay
        data.timeoutId = window.setTimeout(function () {
            elem.trigger(jqre.eventName);
        }, jqre.delay);
    };

    // Special Event definition
    $.event.special[ jqre.eventName ] = {

        // setup:
        // Called when an event handler function
        // for jqre.eventName is attached to an element
        setup: function () {
            var elem = $(this);
            elem.data(jqre.eventName, {});

            elem.on("resize", jqre.poll);
        },

        // teardown:
        // Called when the event handler function is unbound
        teardown: function () {
            var elem = $(this),
                data = elem.data(jqre.eventName);

            if (data.timeoutId) {
                window.clearTimeout(data.timeoutId);
            }

            elem.removeData(jqre.eventName);
            elem.off("resize", jqre.poll);
        }
    };

    // Creates an alias function
    $.fn[ jqre.eventName ] = function (data, fn) {
        return arguments.length > 0 ?
            this.on(jqre.eventName, null, data, fn) :
            this.trigger(jqre.eventName);
    };

}(jQuery, this));

//6 products banner slider :::: Common area ::::
var prd6_banner;
var prd6_banner2;
function prd6_Slider() {
	if ($('.prd6_slider').length){
		var w = $(document).width();
		if (w <= 1280) {
			if($('.prd6_slider li').length > 5) {
				prd6_banner = $('.prd6_slider').bxSlider({
					pause: 3000,
					minSlides: 5,
					maxSlides: 5,
					slideWidth: 200,
					auto: false
				});
			}
		}else{
			if ($('.prd6_slider li').length > 6) {
				prd6_banner = $('.prd6_slider').bxSlider({
					pause: 3000,
					minSlides: 6,
					maxSlides: 6,
					slideWidth: 200,
					auto: false
				});
			}
		}
		$(window).on("resizeEnd", function () { 
			var w = $(document).width(); 
			if (w <= 1280) {
				if (!(prd6_banner == undefined)){
					prd6_banner.destroySlider();
				};
				
				if ($('.prd6_slider li').length > 5) {
					prd6_banner = $('.prd6_slider').bxSlider({
			   		pause: 3000,
				   	minSlides: 5,
				  	maxSlides: 5,
				  	slideWidth: 200,
					auto: false
					});
				}
				if (!(prd6_banner == undefined)){
					prd6_banner.reloadSlider();
				};
				
			} else {
				if (!(prd6_banner == undefined)){
					prd6_banner.destroySlider();
				};
				if ($('.prd6_slider li').length > 6) {
				prd6_banner = $('.prd6_slider').bxSlider({
			   		pause: 3000,
				   	minSlides: 6,
				  	maxSlides: 6,
				  	slideWidth: 200,
					auto: false
				});
				}
			}
		});		
	}
}
//6 products banner slider :::: Common area ::::
function prd6_Slider2() {
	if ($('.prd6_slider2').length){
		var w = $(document).width();
		if (w <= 1280) {
			if($('.prd6_slider2 li').length > 5) {
				prd6_banner2 = $('.prd6_slider2').bxSlider({
					pause: 3000,
					minSlides: 5,
					maxSlides: 5,
					slideWidth: 200,
					auto: false
				});
			};
		}else{
			if ($('.prd6_slider2 li').length > 6) {
				prd6_banner2 = $('.prd6_slider2').bxSlider({
					pause: 3000,
					minSlides: 6,
					maxSlides: 6,
					slideWidth: 200,
					auto: false
				});
			};
		}
		$(window).on("resizeEnd", function () { 
			var w = $(document).width(); 
			if (w <= 1280) {
				if (!(prd6_banner2 == undefined)){
					prd6_banner2.destroySlider();
				};
				if ($('.prd6_slider2 li').length > 5) {
					prd6_banner2 = $('.prd6_slider2').bxSlider({
						pause: 3000,
						minSlides: 5,
						maxSlides: 5,
						slideWidth: 200,
						auto: false
					});
				};
				if (!(prd6_banner2 == undefined)){
					prd6_banner2.reloadSlider();
				};
			} else {
				if (!(prd6_banner2 == undefined)){
					prd6_banner2.destroySlider();
				};
				if ($('.prd6_slider2 li').length > 6) {
					prd6_banner2 = $('.prd6_slider2').bxSlider({
						pause: 3000,
						minSlides: 6,
						maxSlides: 6,
						slideWidth: 200,
						auto: false
					});
				};
			}
		});		
	}
}



//Main banner slider - big slider banner
function bigmain_Slider() {
	/*
	var main_banner = $('.bigmain_slider').bxSlider({
		auto: true,
		speed: 500,
		pause: 3000,
		autoHover: true,
		pagerCustom: '.slide_wrap'
	});

	$(".slide_wrap li").hover(function(){
		var newSlideNo = $($(this).find("a")[0]).attr('data-slide-index');
		if(newSlideNo != main_banner.getCurrentSlide()){
			main_banner.goToSlide(newSlideNo);
		}
	});
	*/

	//Resolved clicks on click //
	/*
	$(document).on('mouseover','.slide_wrap li',function() {
		main_banner.stopAuto();
		main_banner.startAuto();
	});
	*/
}


//CategoryLevel1_Main banner slider - FO-DI-ID-Category
function category_Slider() {
	/*
    var cate_banner = $('.cate_slider').bxSlider({
   		pause: 3000,
		auto: true
	});
	*/

    //Resolved clicks on click //
	$(document).on('click','.bx_catebox .bx-prev, .bx_catebox .bx-next',function() {
		cate_banner.stopAuto();
		cate_banner.startAuto();
	});


	//Categories main mini slide banner
	var mini_banner = $('.min_slider').bxSlider({
   		pause: 3000,
		auto: true
	});

	// Resolved clicks on click //
	$(document).on('click','.bx_minibox .bx-pager-link, .bx_minibox .bx-pager-item',function() {
		mini_banner.stopAuto();
		mini_banner.startAuto();
	});

	//Category main bottom Slide banner
	/*var bot_banner = $('.bot_slider').bxSlider({
	  auto: true,
	  speed: 500,
	  delay: 500,
	  autoHover: true,
	  stopAuto: false,
	  pagerCustom: '#bx-pager'
	});

	$("#bx-pager li").hover(function(){
		var newSlideNo = $($(this).find("a")[0]).attr('data-slide-index');
		if(newSlideNo != bot_banner.getCurrentSlide()){
		bot_banner.goToSlide(newSlideNo);
		}
	});*/
}

//04_EC_PR_v0.7.0_product_detail_deal layer popup banner slider
var prdtlay_banner; 
function prdtlaypop_Slider() {
    	prdtlay_banner = $('.prdtlay_slider').bxSlider({
    	infiniteLoop: false,
  		hideControlOnEnd: true
	});
}


//Product Details Page Product Small Product Large Display
function prdst_Big() {
    $('.prdt_sthumb li').mouseenter(function(){
    	var temps = $(this).children('img').attr('src');
    	var tempimg = $(this).parent().parent().children('.prdt_thumb_wrap').children('img');
    	var tempsrc = temps.replace(/^.*\//, '');
    	var tempjpg = tempsrc.substring(tempsrc.length-6, tempsrc.length);
    	var tempname = tempsrc.replace(tempjpg,'');
   		tempimg.attr('src', '../../images/common/'+tempname+'_b.jpg');
   		$('.prdt_sthumb li').removeClass('on');
   		$(this).addClass('on');
   		prd_Big_zoom();
    });
}

//Product image
function prd_Big_zoom(){
	var prd_zoom = $('.zoom_01');
	if(prd_zoom.length) init();
	function init(){
   		$('.zoom_01').elevateZoom({
   		});
   	}
}

//Product Details Page Add - Numerical plus minus
function prdeq_Num() {
	//Add to cart
	$('.form_ui_number .btn_plus').click(function() {
		var n = $('.btn_plus').index(this);
		var num = $(".form_ui_number input:eq("+n+")").val();
		num = $(".form_ui_number input:eq("+n+")").val(num*1+1);
   	});

   	//Number of items added Minus
	$('.form_ui_number .btn_minus').click(function() {
		var n = $('.btn_minus').index(this);
		var num = $(".form_ui_number input:eq("+n+")").val();
		if(num>0){
			num = $(".form_ui_number input:eq("+n+")").val(num*1-1);
		}
   	});
}


//More detail page OTHER SELLERS More - Expand table
function prdtr_More() {
	$('.other_more').click(function() {
		if($('.other_tr').is(':visible')){
			$('.other_tr').hide();
			$(this).children().removeClass('ico_moret').addClass('ico_moreb');
		}else{
			$('.other_tr').show();
			$(this).children().removeClass('ico_moreb').addClass('ico_moret');
		}
   	});
}


//Product Details Page Number of Points & Points
function prdsr_Layer() {
	//ECM_EC_PR_0228 Rating
   	$('.score_star_box').mouseenter(function(){
    	$('.pop_over').show();
    }).mouseleave( function () {
    	$('.pop_over').hide();
    });

    //ECM_EC_PR_0228 point
   	$('.pit_over').mouseenter(function(){
    	$('.popmodal_type.pop_over2').show();
    }).mouseleave( function () {
    	$('.popmodal_type.pop_over2').hide();
    });
}

//Product detail page and cart page When you click on the tab area,
function prd_Tab() {
  $('.tab_type2.htype2 a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 200
        }, 500);
        return false;
      }
    }
  });

  // Shopping cart tab bookmark smooth - EC-OP-0101_Cart–General Delivery Overview
  $('.tab_type2.htcart a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
      		var cartop = $("#header");
      		if(cartop.hasClass("scr")){
      			$('html, body').animate({
		          scrollTop: target.offset().top - 80
		        }, 500);
      		}else{
      			$('html, body').animate({
		          scrollTop: target.offset().top - 200
		        }, 500);
      		}        
        return false;
      }
    }
  });

	if($('.score_star_box').length){
		$('.score_star_box').click(function(){
      		var cartop = $("#header");
      		if(cartop.hasClass("scr")){
      			$('html, body').animate({
		          scrollTop: $('.prdt_review').offset().top - 270
		        }, 500);
      		}else{
      			$('html, body').animate({
		          scrollTop: $('.prdt_review').offset().top - 350
		        }, 500);
      		}        
		})		
	}
}


//Product detail page Left small goods area Product Up and down slide control
function prdst_Arr() {
  $('.btn_stnext').css({ cursor: 'pointer' }).click(function () {
    var ih = $(this).index() == 0 ? -61 : 61; //Px number moving up and down
    var obj = $('.prdt_sthumb');
    obj.animate({ scrollTop:obj.scrollTop() + ih }, 100);
  });

  $('.btn_stprev').css({ cursor: 'pointer' }).click(function () {
    var ih = $(this).index() == 0 ? 61 : -61 //Px number moving up and down
    var obj = $('.prdt_sthumb');
    obj.animate({ scrollTop:obj.scrollTop() + ih }, 100);
  });
}


//Product Details page WISH LIST Heart Red Gray On Off
function prd_Wishlist() {
    $('.prd_info_fav .btn_ico_fav').click(function() {
   		if($(this).hasClass("on")){
   			$(this).removeClass("on");
   		}else{
   			$(this).addClass("on");
   		}
   	});
}


//Social Wish List - MA Heart red gray on and off
function socw_Wishlist() {
	/* Masonry Init */
	window.onload = function(){
		if($('.socw_masonry').length){
			$('.socw_masonry').masonry({
				  columnWidth: 220,
				  gutter: 25,
				  itemSelector: '.socw_grid'
			});
		};
	};

	/* Top List - Add Favorite */
	$('.socw_list .add_fav').click(function(){
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
		} else {
			$(this).addClass('on');
		}
	});

	/* Bottom List - Add Favorite */
	$('.socw_list2 .add_fav').click(function(){
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
		} else {
			$(this).addClass('on');
		}
	});

	/* EC-MA-0114_Customer Layered Pop-up */
	$('.wishlist_sns .add_fav').click(function(){
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
		} else {
			$(this).addClass('on');
		}
	});

	/* EC-MA-0116_Social Wish List Celeb Main */
	/*
	$('.socw_dv1_con .add_fav').click(function(){
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
		} else {
			$(this).addClass('on');
		}
	});
	*/

	/* EC-MA-0114_Customer Layered Pop-up */
	$('.wishlist_view_btn .add_fav').click(function(){
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
		} else {
			$(this).addClass('on');
		}
	});
}


//WISH LIST Heart red gray on and off
function cate_Wishlist() {
   $('.prd_info_fav .prd_btn_fav').click(function() {
   		if($(this).children().hasClass("on")){
   			$(this).children().removeClass("on");
   		}else{
   			$(this).children().addClass("on");
   		}
   	});

   $('.prd_btn_fav02 .btn_ico_fav').click(function() {
   		if($(this).hasClass("on")){
   			$(this).removeClass("on");
   		}else{
   			$(this).addClass("on");
   		}
   	});
}


//See more details about this copy
function cate_Addmore() {
	$(".add_btn").click(function() {
		var addmore = $(this).parent();
		if(addmore.css('height') === '140px'){
			addmore.css('height', 'auto');
		}else{
			addmore.css('height', '140px');
		}
	});
}


//Detailed product
function cate_prdBig() {
	$('ul.prd_itemlist_type1 .prd_itembox').mouseover(function(){
        $(this).parents('.item_unitview').addClass('on');

    }).mouseout( function () {
        $(this).parents('.item_unitview').removeClass('on');

    });

    //Details Mouse over - 04_EC_PR_v0.7.0_product_detail_deal
    $('ul.prd_itemlist_type6 .prd_view_list').mouseover(function(){
        $(this).addClass('on');

    }).mouseout( function () {
        $(this).removeClass('on');

    });
}


//Changing the background when selecting shopping cart option
function cart_Opt() {
	$('.opt_wrap.opt_type1 button').on('click', function() {
		var optcol = $('.opt_wrap.opt_type1 .btn_type_opt1');
		if($(this).hasClass('on')){
			$(this).addClass('on');
		}else{
			optcol.removeClass('on');
			$(this).addClass('on');
		}
	});

	$('.opt_wrap.opt_type2 button').on('click', function() {
		var optcol = $('.opt_wrap.opt_type2 .btn_type_opt2');
		if($(this).hasClass('on')){
			$(this).addClass('on');
		}else{
			optcol.removeClass('on');
			$(this).addClass('on');
		}
	});

	$('.opt_wrap.opt_type3 button').on('click', function() {
		var optcol = $('.opt_wrap.opt_type3 .btn_type_opt1');
		if($(this).hasClass('on')){
			$(this).addClass('on');
		}else{
			optcol.removeClass('on');
			$(this).addClass('on');
		}
	});

	$('.opt_wrap.opt_type4 button').on('click', function() {
		var optcol = $('.opt_wrap.opt_type4 .btn_type_opt1');
		if($(this).hasClass('on')){
			$(this).addClass('on');
		}else{
			optcol.removeClass('on');
			$(this).addClass('on');
		}
	});

	$('.opt_wrap.opt_type5 button').on('click', function() {
		var optcol = $('.opt_wrap.opt_type5 .btn_type_opt1');
		if($(this).hasClass('on')){
			$(this).addClass('on');
		}else{
			optcol.removeClass('on');
			$(this).addClass('on');
		}
	});
	
	$('.opt_wrap.opt_type2 button').on('click', function() {
		if($(this).hasClass('none')){
			$(this).removeClass('on');
		}
	});
}


//star rating - Rating Script
function score_Star() {	
	$(".score_star_ui input[type='radio']").click(function() {
		var stars = $(this).next();
		var stname = $(this).attr('name');
		var stval = $(this).attr('value');

	    if(stars.hasClass('on') == true){
	    	$(".score_star_ui input[name='"+stname+"']").next().removeClass("on");
	    	for(var i=0;i<stval;i++){
	    		$(".score_star_ui input[name='"+stname+"'][value='"+(i+1)+"']").next().addClass("on");
	    	}
	    }else{
	    	for(var i=0;i<stval;i++){
	    		$(".score_star_ui input[name='"+stname+"'][value='"+(i+1)+"']").next().addClass("on");
	    	}
	    }
	});

	//04_EC_PR_v0.7.0_product_detail_deal Rating & Customer Review
	$(".score_star_ui.star_num input[type='radio']").click(function() {
		var stars = $(this).next();
		var stname = $(this).attr('name');
		var stval = $(this).attr('value');
		var stnum = $(this).parent().children('strong');

	    if(stars.hasClass('on') == true){
	    	$(".score_star_ui.star_num input[name='"+stname+"']").next().removeClass("on");
	    	for(var i=0;i<stval;i++){
	    		$(".score_star_ui.star_num input[name='"+stname+"'][value='"+(i+1)+"']").next().addClass("on");
	    		$(stnum).html(""+(i+1)+",0");
	    	}
	    }else{
	    	for(var i=0;i<stval;i++){
	    		$(".score_star_ui.star_num input[name='"+stname+"'][value='"+(i+1)+"']").next().addClass("on");
	    		$(stnum).html(""+(i+1)+",0");
	    	}
	    }
	});

	//FO-ME-Order_Delivery List_popup3(L)
	$(".small_score_star_ui input[type='radio']").click(function() {
		var stars = $(this).next();
		var stname = $(this).attr('name');
		var stval = $(this).attr('value');

	    if(stars.hasClass('on') == true){
	    	$(".small_score_star_ui input[name='"+stname+"']").next().removeClass("on");
	    	for(var i=0;i<stval;i++){
	    		$(".small_score_star_ui input[name='"+stname+"'][value='"+(i+1)+"']").next().addClass("on");
	    	}
	    }else{
	    	for(var i=0;i<stval;i++){
	    		$(".small_score_star_ui input[name='"+stname+"'][value='"+(i+1)+"']").next().addClass("on");
	    	}
	    }
	});
}
  

//FAQ board toggle Question Answer
function faq_Board() {	
	var board_a = $(".board_list .tit_acdn a");
	$(board_a).click(function(){
		if($(this).parent().parent('tr').hasClass('toggle')){
			board_a.parent().parent('tr').removeClass('toggle_on').addClass('toggle');
			$(this).parent().parent('tr').removeClass('toggle').addClass('toggle_on');
			board_a.parent().parent().next().children().removeClass('on');
			$(this).parent().parent().next().children().addClass('on');

		}else{
			$(this).parent().parent('tr').removeClass('toggle_on').addClass('toggle');
			$(this).parent().parent().next().children().removeClass('on');
		}
	});
}


//tab  :::: Common area :::: Scripts used in various tabs
function tab_Style() {
	$(document).on('click.ecmTab', '[data-ecm-function=tab] a', function() {
		var $this = $(this);
		if ($this.attr('href').indexOf('#') == 0 && $($this.attr('href')).length > 0) {
			if (!$this.hasClass('disabled') && !$this.parent().hasClass('disabled')) {
				if ($this.parent().is('li')) {
					$this.parents('[data-ecm-function=tab]').find('li').removeClass('on');
					$this.parent().addClass('on');
				} else {
					$this.parents('[data-ecm-function=tab]').find('a').removeClass('on');
					$this.addClass('on');
				}
				$('.tab_cont').filter(function() { return $(this).data('ecm-tabname') == $this.parents('[data-ecm-function=tab]').data('ecm-tabname') }).addClass('hide');
				$($this.attr('href')).removeClass('hide');
			}
			return false;
		}
	});
}


//table  :::: Common area :::: Table tbody open and fold
function table_Tbody() {
	$(document).on('click', '.fn_tbtn_view', function() {
		var tbody = $('.fn_tbview tbody');
		if(tbody.is(':visible')){
			tbody.hide();
			$(this).removeClass('btn_acc_up');
			$(this).addClass('btn_acc_down');
		}else{
			tbody.show();
			$(this).removeClass('btn_acc_down');
			$(this).addClass('btn_acc_up');
		}
	});
}


//price_opt_cell input checkbox  :::: Common area ::::
function inp_Chkbox() {
	$(".price_opt_cell input[type='checkbox']").click(function() {
	    if ($(this).is(":checked")) {
	      $(this).parent().next('.charge').addClass('on');
	    } else {
	      $(this).parent().next('.charge').removeClass('on');
	    }
	});
}


//input  :::: Common area :::: When checkbox is checked, the background color changes and it is recommended to check it.
function inp_Chkbg() {
	$(".bg_checked input[type='checkbox']").click(function() {
		var bgcheck = $(this).parents('.bg_checked');
	    if ($(this).is(":checked")) {
	      bgcheck.addClass('on');
	    } else {
	      bgcheck.removeClass('on');
	    }
	});

	$(".bg_checked input[type='radio']").click(function() {
		var bgcheck = $(this).parents('.bg_checked');
		var rdname = $(this).attr('name');
	    if ($(this).is(":checked")) {
	      $(".bg_checked input[name='"+rdname+"']").parents('.bg_checked').removeClass('on');
	      bgcheck.addClass('on');
	    } else {
	      bgcheck.removeClass('on');
	    }
	});
}


//Product Details Add Remove - FO_DI_ID_Mall_Bigdeals_detail_case04_WishList
function item_Delete() {
	$(".amount_itemlist_type1 li .item_del").click(function() {
		$(this).parent().parent().parent().parent().remove();
	});
}


//Wish List layerpopup FO_DI_ID_Mall_Bigdeals_detail_case04_WishList
function wish_Popup() {
	var wishlist = $(".wish_pop");
	if(wishlist.css('display') === 'none'){
		wishlist.show();
	}else{
		wishlist.hide();
	}
}

//Check all shopping cart items
function item_Allcheck() {
	var cartbox = $(".cart_order .bg_checked input[type='checkbox']").parents('.bg_checked');
	var cartchk = $(".cart_order .bg_checked input[type='checkbox']");
	cartchk.attr('checked', true);
	cartbox.addClass('on');
}


//layer_popup  :::: Common area :::: Open the layer popup by calling plugin fancybox
function layPopup_fancy(){
	
	//EC-OP-0101_Cart–General Delivery Overview
	$(".link_type1").click(function(){
		$.fancybox($('#FO-OP-MART'));
	});

	//EC-MA-0113_Social Wish List Main
	$(".link_type2").click(function(){
		$.fancybox($('#EC-MA-0114_POP'));
	});

	//EC_PR_v0.7.0_product_detail_EC-PR-0101
	$(".btn_size").click(function(){
		$.fancybox($('#EC-PR-0101_brandsize'));
	});
}

//Write a Review Click the button to enter Rating & Customer Review layer
function prdt_Review(){
	$('.btn_type_review').on('click', function() {
		$('.prdt_review').animate({
         height: '630px'
                    }, 1000);
	});
	$('.review_cancel').on('click', function() {
		$('.prdt_review').animate({
         height: '0px'
                    }, 1000);
	});
}

//Product Rating & Customer Review Attached Images Deleted
function fileimg_Delete(){
	$(document).on('click','.img_find_sthumb .btn_del',function() {
		$(this).parent().parent().remove();
	});
}

function collect_method_control (){
	$('.collect_method_hd01').click(function(){
		$('.collect_method01').show();
		$('.collect_method02').hide();
	});
	$('.collect_method_hd02').click(function(){
		$('.collect_method02').show();
		$('.collect_method01').hide();
	});
}

//Product detail page When size & color is selected
function prdt_SizeColor(){
	//size
	$(document).on('click','.amount_dl .size_box',function() {
		var sbox = $(this);
		if(sbox.hasClass('on')){
			$('.amount_dl .size_box').removeClass('on');
		}else{
			if(!sbox.hasClass('out')){
				$('.amount_dl .size_box').removeClass('on');
				$(sbox).addClass('on');
			}
		}
	});
	//color
	$(document).on('click','.color_box li',function() {
		var cbox = $(this);
		if(cbox.hasClass('on')){
			$('.color_box li').removeClass('on');
		}else{
			if(!cbox.hasClass('out')){
				$('.color_box li').removeClass('on');
				$(cbox).addClass('on');
			}
		}
	});

	$(document).on('click','.color_box2 li',function() {
		var cbox = $(this);
		if(cbox.hasClass('on')){
			$('.color_box2 li').removeClass('on');
		}else{
			if(!cbox.hasClass('out')){
				$('.color_box2 li').removeClass('on');
				$(cbox).addClass('on');
			}
		}
	});
}

//Product Details Page Review
function prdt_Revdetail(){
	$(document).on('click','.board_list .review_tit',function() {
		var revlist = $(this).next('.review_detail');
		if(revlist.css('display') === 'none'){
			revlist.show();
		}else{
			revlist.hide();
		}
	});
}

//Left slide menu :::: Common area :::: Submenu when menu is clicked
function mySubmain_lnb(){
	$(document).on('click','.side_nav > li > a',function() {
		if($(this).next('ul').children('li').length > 0){				//If there is a submenu
			if($(this).next('ul').css('display') == 'none'){
				$(this).next('ul').slideDown(200).parent().siblings().find("ul").slideUp(200);
				$(this).addClass('on');
			}else{
				$(this).next('ul').slideUp(200);
				$(this).removeClass('on');
			}
		}
	});
}


// Left slide menu :::: company menu 
function scroll_menu(){
	$("[data-point]").click(function(){
		var id = $(this).attr("data-point");
		var top = $("#" + id).offset().top-50;
		$("html, body").animate({
			scrollTop : top
		});
	});
}




//timer :::: Common area :::: Countdown timer setting
function flip_countDown(){
	if($('#flipcountdown').length){
		$('#flipcountdown').flipcountdown({  
			size:'md',
			beforeDateTime:'8/10/2017 00:00:01'
		});
	};
}

//thumbnail type02 wislist button link_box Wish List 
function wishlist_btn(){
	$(".right_area > .wist_btn > a").click(function(){
		$(this).toggleClass("on");
	});
}


//sub_category main Left menu control
function category_Left(){	
	//Collapse detail search area
	$(document).on('click', '.filter_dvbox > a' ,function() {
		var Fdvbox = $(this).parent().children('.filter_dvbox_con');
		var Farrow = $(this).parent().children('a');
		if(Fdvbox.css('display') === 'none'){
			Fdvbox.slideDown(200);
			Farrow.removeClass('open');
			Farrow.addClass('close');
		}else{
			Fdvbox.slideUp(200);
			Farrow.removeClass('close');
			Farrow.addClass('open');
		}
	});

	//Area Category Collapse
	$('.category_list > li > ul').hide();
	$('.category_list > li:first-child > ul').show();
	$(document).on('click', '.category_list > li > a' ,function() {
		var Ctlist = $(this).next('ul');
		if(Ctlist.css('display') === 'none'){
			$('.category_list > li > ul').slideUp(200);
			Ctlist.slideDown(200);
		}
	});

}
// error img
/*function img_error(){
	$("img").each(function(index,node){
		var partCss = {"background-color":"#f4f4f4","width":"100%","height":"100%","text-align":"center","vertical-align":"middle","display":"block"};
		$(this).error(function(){
			$(this).parent().css(partCss);
			var lineH = $(this).parent().parent().innerHeight();
			$(this).parent().css({"line-height":lineH + "px"});
			$(this).attr({"src":"../../images/content/circle_noneimg.png"}).css("vertical-align","middle");
		});
	});
};*/

//Cart soldout If the item is out of stock
function cart_Soldout(){
	var cartprd = $('.order_itembox .order_item.soldout');
	if($(cartprd).length){
		$(cartprd).children('.order_item_row').children('.cell_prd_price').children('.prd_price_stotal').text('');
		$(cartprd).children('.order_item_row').children('.cell_prd_price').children('.prd_price').children('.price_qty').children('.price_num').children('.form_ui_number').hide();
		$(cartprd).children('.order_item_row').children('.cell_prd_price').children('.prd_price').children('.price_qty').children('.price_num').children('button').hide();
	}
}

//Order pay_list Select card
function order_Paylist(){
	$(document).on('click',".pay_list li .cont",function() {
		var payli = $(this).children().children("input[type='radio']");
		if (!$(payli).is(":checked")) {
	      $('.pay_list li').removeClass('on');
	      $(payli).parent().parent().parent().addClass('on');
	      $(payli).prop("checked", true);
	    }
	});
}

//Category filter brand btn button control range-slider control
function filter_Box(){
	$(document).on('click',".btnbox_brand button",function() { 
		if(!$(this).hasClass('on')){
			$('.btnbox_brand button').removeClass('on');
			$(this).addClass('on');
		}
	});

	if ($('.range-slider').length > 0) {
		$('.range-slider').jRange({
			from: 0,
			to: 1030,
			step: 1,
			scale: [0,25,50,75,100],
			format: '%s',
			showLabels: true,
			isRange : true
		});
		setTimeout(function(){
			$('.range-slider').jRange('updateRange', '0,1000','0,1000');
		},1000);

		var range_low = $('.price_area .pointer-label.low').text();
		var range_high = $('.price_area .pointer-label.high').text();
		
		$('.filter_dvbox_con .btn_price').click(function() {
			var inp_low = $('.text.txt_range1').val();
			var inp_high = $('.text.txt_range2').val();		
			$('.range-slider').jRange('setValue', inp_low+','+inp_high);
		});
	}
}

//Category menu Left menu control
function cate_Menu(){
	$(".category_area .category_menu .menu > li").mouseover(function() {
		var check = $(this).hasClass("only_box");
		if(!check){
			$(this).children('.sub_lnb_cont').show();
			$(this).parent().children().css('border-right','1px solid #272e31');
			$(this).parent().parent().children('h2').css('border-right','1px solid #272e31');
			$(this).css('border-right','1px solid #fff');
			$(".more_btn a").css('border-right','1px solid #272e31');
		}else{
			$(this).css('border-right','1px solid #272e31');
			$(this).parent().children(".on").css("border-right","1px solid #272e31");
		};
	});
	$(".category_area .category_menu .menu > li").mouseout(function() {
		$(this).children('.sub_lnb_cont').hide();
		$(this).parent().children().attr("style","");
		$(this).parent().parent().children('h2').attr("style","");
			$(".more_btn a").removeAttr("style");
	});
}

//tab  :::: Common area ::::
function md_Tab() {
	$(document).on('click.ecmTab', '.preview_tab[data-ecm-function=tab] a', function() {
		var $this = $(this);
		if ($this.attr('href').indexOf('#') == 0 && $($this.attr('href')).length > 0) {
			if (!$this.hasClass('disabled') && !$this.parent().hasClass('disabled')) {
				if ($(".preview_tab").length == 0){return};
				if ($this.parent().is('li')) {
					var $tab_num = $this.parents('li').index();
					var $arrow_left = 8.33 + ($tab_num*16.66);
					$(".preview_tab").next(".md_preview_area").find(".tab_arrow").css("left", $arrow_left + "%");
				} else {
					var $tab_num = $this.parents('li').index();
					var $arrow_left = 8.33 + ($tab_num*16.66);
					$(".preview_tab").next(".md_preview_area").find(".tab_arrow").css("left", $arrow_left + "%");

				}
			}
			return false;
		}
	});
}

//Checkbox click layerpopup
function layer_Checkbox(el, event){
	var temp = $('#' + el);
	var divTop = event.pageY - 60;
	var divLeft = event.pageX - 154;
	var chk_lay = $(".chk_layer input[type='checkbox']");
	 if (!$(chk_lay).is(":checked")) {
	 	$(temp).css({
	     "top": divTop +"px"
	     ,"left": divLeft +"px"
		 }).show();
	 	if(temp.css('display') === 'block'){
	 		$(temp).delay(5000).fadeOut();
	 	}
	 }else{
	 	$(temp).hide();
	 }
}

//When you click on the link layerpopup toggle
function layer_Toggle(el, event){
	var temp = $('#' + el);
	var divTop = event.pageY - 60; //Top Coordinates
	var divLeft = event.pageX - 154; //Left Coordinates
	$(temp).css({
	     "top": divTop +"px"
	     ,"left": divLeft +"px"
		 }).toggle();
	if(temp.css('display') === 'block'){
	 		$(temp).delay(5000).fadeOut();
	 	}
}
// accordion 1
function acc_fn(){
	var $el_ac01 = $(".accordion_type01");
	if($el_ac01.length) init();
	function init(){
		$el_ac01.find("tbody > tr:odd").hide();
		$el_ac01.find("tbody > tr:even").click(function(){
			if($(this).next().css("display") == "table-row"){
				$(this).next().hide();
			}else{
				$el_ac01.find("tbody > tr:odd").hide();
				$(this).next().show();
			};
		});
	};

};
//Hamburger menu :::: Common area ::::
function publick_hamburger_fn(){
	var $el_ham = $(".hamburger_menu"), $mnm = $(".avenue"), over_check = false;
	if($el_ham.length) /*init()*/;
	function init(){
		$el_ham.find(".hamburger_btn").click(function(){
			var check = $('.allmenus_view').hasClass("ham");
			if(!check ){
				$el_ham.addClass("open");
				$('.allmenus_view').addClass('ham main').find(".allmenus_ctgs_subin").eq(0).show();
				$(".allmenus_ctgs .w1").addClass("on");
				var src = $(".w1 .t1 > img").attr("src").replace(/(.*)(\.[jJpPgG][pPnNiI][gGfF])/g, '$1\_on$2');
				$(".w1 .t1 > img").attr("src",src);
				$(".allmenus_view .allmenus_ctgs li").eq(0).addClass("point");
				$("#header").addClass("open_menu");
				$(".gnb_topmenu").show();
			}else{
				$el_ham.removeClass("open");
				$('.allmenus_view').removeClass('ham main').find(".allmenus_ctgs_subin").eq(0).hide();
				$(".allmenus_ctgs .w1").removeClass("on");
				$(".allmenus_view .allmenus_ctgs li").eq(0).removeClass("point");
				var src = $(".w1 .t1 > img").attr("src").replace(/(.*)(_on)(\.[jJpPgG][pPnNiI][gGfF])/g, '$1$3');
				$(".w1 .t1 > img").attr("src",src);
				$("#header").removeClass("open_menu");
				$(".gnb_topmenu").hide();
			};
			if($(".header_innr.avenue").length){
				var check = $(".gnb_topmenu > ul > li.on").index();
				if(check == 0) $(".allmenus_ctgs").addClass("on");
			};
		});
		if(!$mnm.length){
			$(".allmenus_view").hover(function(){
				over_check = true;
				$el_ham.addClass("open");
				$('.allmenus_view ').removeClass('ham').find(".allmenus_ctgs_subin").attr("style","");
				$(".allmenus_ctgs li").eq(0).removeClass("point");
			},function(){
				$el_ham.removeClass("open");
				$("#header").removeClass("open_menu");
				$(".amburger_menu").removeClass("open");
			});
		}else{
/*
			$(".allmenus_ctgs_subin").mouseenter(function(){
				$(".allmenus_ctgs_subin").attr("style","");
			});
*/
			$(".allmenus_view .allmenus_ctgs").hover(function(e){
				console.dir(e);
				if(over_check && $(".allmenus_ctgs li.on").length){
					$(this).parent().addClass("main");
					$el_ham.addClass("open");
					$(".allmenus_ctgs_subin").attr("style","");
					if($(".scr").length){
						$('.allmenus_view ').removeClass('ham').find(".allmenus_ctgs_subin").attr("style","");
						$(".allmenus_ctgs li").eq(0).removeClass("point");
						$el_ham.removeClass("open");
					};
				}else{
				};
			},function(){
				over_check = true;
				var $this = $(this);
				if($(".scr").length){
					$el_ham.removeClass("open");
					$("#header").removeClass("open_menu");
				}else{
					$el_ham.addClass("open");
					$("#header").removeClass("open_menu");
					$('.allmenus_view ').removeClass('ham').find(".allmenus_ctgs_subin").attr("style","");
					$(".allmenus_ctgs li").eq(0).removeClass("point");
					$(".allmenus_ctgs > li").removeClass("on");
					$el_ham.removeClass("open");
				};
				$(this).parent().removeClass("main ham");
			});
		};  
	};
};
//gnb tab  :::: Common area ::::
function public_tap_fn(){
	var $el_tap = $(".gnb_topmenu ul li");
	if($el_tap.length) init();
	function init(){
		$el_tap.click(function(){
			$(this).addClass("on").siblings().removeClass("on");
		});
		$el_tap.parents(".gnb_topmenu").mouseenter(function(e){
			var num = $(".allmenus_ctgs > li.on").index();
			if(num == -1) num = 1;
			$('.allmenus_ctgs > li').eq(num).find(".allmenus_ctgs_subin").show();
			e.stopPropagation();
		});
	};
};

//category menu - left_category  :::: Common area ::::
function cate_filter_Left(){
	var cate_left = $(".filter_dvbox_con > .left_category > .depth01 a");
	if(cate_left.length) init();
	function init(){
		$(cate_left).click(function(){
			var depths = $(this).parent().children('div');
			if(depths.css('display') === 'none'){
				depths.slideDown();
			}else{
				depths.slideUp();
			}
		});
	}
}

function open_btn(){
	var $el_open = $(".plus_button_wrap");
	if($el_open.length) init();
	function init(){
		$(".hamboth_banner").mouseenter(function(e){
			e.stopPropagation();
		});
		$(".plus_button_wrap.top").hide();
		$(".t1").mouseover(function(){
			var H = $(this).parent().find(".wrap_hidden").innerHeight(), h = $(this).parent().find(".category_list").height();
			if(H > h){
				$(this).parent().find(".plus_button_wrap").hide()
			};
		});
		$(".hamburger_btn").click(function(){
			var H = $(".w1:eq(0)").find(".wrap_hidden").innerHeight(), h = $(".w1:eq(0)").find(".category_list").height();
			if(H > h){
				$(".w1:eq(0)").find(".plus_button_wrap").hide()
			};
		});
		$(".plus_button_wrap.bottom").click(function(e){
			var $move = $(this).parent().find(".category_list");
			if(!$move.is(":animated")){
				var H = $(this).parent().find(".wrap_hidden").height() * -1, h = $(this).parent().find(".wrap_hidden > .category_list").height() * -1, max_num = Math.floor(h / H);
				var po = Math.abs($(this).parent().find(".wrap_hidden > .category_list").css("top").replace(/px/g, '')) * -1;
				var $this = $(this);
				var $frind = $(this).parent().find(".plus_button_wrap.top");
				if(h < po || H == 0){
					var price = po + H;
					$move.stop().animate({"top":price+"px"},1000);
					var p = (Math.abs(H) + Math.abs(price)) * -1;
					$frind.show();
					if(h > p){
						$this.hide();
					};
				};
				e.stopPropagation();
			};
		});
		
		$(".plus_button_wrap.top").click(function(e){
			var $move = $(this).parent().find(".category_list");
			if(!$move.is(":animated")){
				var H = $(this).parent().find(".wrap_hidden").height() * -1, h = $(this).parent().find(".wrap_hidden > .category_list").height() * -1, max_num = Math.floor(h / H);
				var po = Math.abs($(this).parent().find(".wrap_hidden > .category_list").css("top").replace(/px/g, '')) * -1;
				var $this = $(this);
				var $frind = $(this).parent().find(".plus_button_wrap.bottom");
				if(h > po || po == po){
					var price = po - H;
					$move.stop().animate({"top":price+"px"},1000);
					if(price >= 0){
						$this.hide();
						$frind.show();
					};
				};
				e.stopPropagation();
			};
		});
		
		$(".allmenus_ctgs_subin").click(function(e){
			e.stopPropagation();
		});
	};
};

//EC-CS-0108_Live Chat Window btn on&off
function btnlist_Onoff(){
	var btn_onoff = $(".pop_livechat .btn_list li button");
	if(btn_onoff.length) init();
	function init(){
		$(btn_onoff).click(function(){
			if(!$(this).hasClass("on")){
				$(btn_onoff).removeClass("on");
				$(this).addClass("on");
			}
		});
	}
}

//EC-CS-0108_DV_Live Chat Window Screen_current_available_agents
function livecat_Admin(){
	var btn_admin = $(".btn_liveadmin");
	if(btn_admin.length) init();
	function init(){
		

		$(btn_admin).click(function(){
			var winheight = $(document).height(); 
			var dvheight = $('.livechat_pop .pop_cont');

			$(dvheight).css('height', winheight-97);
			$('.livechat_pop').show();
		});
		$('.btn_admin_close').click(function(){
			$('.livechat_pop').hide();
		});
		$('.btn_badmin_close').click(function(){
			$('.livechat_pop').hide();
		});
	}
}

//Mart Rolling
function mart_roll(){
	var $el_mart = $(".mart_rolling > div");
	if($el_mart.length) init();
	function init(){
		$el_mart.bxSlider({
			mode: 'horizontal',
			auto: false,
			pause: 2000
		});
	};
};

// Main Rolling Banner
function main_roll(){
	//Main banner slider - big slider banner
	bigmain_Slider();
	function bigmain_Slider() {
		if($(".main_none").length < 1){
			var main_banner = $('.mainslide_wrap').bxSlider({
				mode: "fade",
				auto: true,
				controls : false,
				speed: 500,
				pause: 3000,
				autoHover: true,
				autoHover2: true,
				pagerCustom: '.slide_wrap'
			});
		};
	}

};

//Search Period Activate search button - EC-CS-0107_MailBox 
function btnset_Onoff(){
	var btnset = $(".srch_set button");
	if(btnset.length) init();
	function init(){
		$(btnset).click(function(){
			if(!$(this).hasClass("on")){
				$(btnset).removeClass("on");
				$(this).addClass("on");
			};
		});
	};
};

// GnB menu on-off processing
function gnbicon_fn(){
	var $el_icon = $(".allmenus_ctgs a.t1");
	if($el_icon.length) init();
	function init(){
		/*
		$el_icon.hover(function(){
			var src = $(this).find("img").attr("src").replace(/(.*)(\.[jJpPgG][pPnNiI][gGfF])/g, '$1\_on$2');
			$(this).find("img").attr("src",src);
		},function(){
			var src = $(this).find("img").attr("src").replace(/(.*)(\_on)(\.[jJpPgG][pPnNiI][gGfF])/g, '$1$3');
			$(this).find("img").attr("src",src);
		});
		*/
	};
};


// GnB new
function newGnb_fn(){
	var $el_gnb = $("#hamburgermenu");
	if($el_gnb.length) init();
	function init(){
		var $list = $(".ham_menu > li"), $wrap = $("#ham_wrap"), $tap = $(".tap_top ul li"), $unit = $("#ham_wrap .tap_unit"), $roll = $(".main_top"), $el_ham = $(".hamburger_menu"), timer  = "";
		$(".tap_unit:eq(0) .ham_menu li a img").ready(function(){
			$(".ham_menu li a img").each(function(index, node){
				$(node).parents(".white").removeClass("white");
			});
		});
		$el_ham.click(function(){
			var $gnb = $("#gnb"), check = $gnb.hasClass("bt_open"), check2 = $el_gnb.hasClass("hover");
			if(!check && !check2){
				var first_num = $(".tap_top  ul li.on").index();
				$unit.addClass("none");
				$unit.eq(first_num).removeClass("none");
				$unit.eq(first_num).find(".ham_menu li:eq(0)").addClass("on");
				$unit.eq(first_num).find(".category_group .con_category:eq(0)").show();
				$gnb.addClass("bt_open");
				$el_gnb.addClass("hover");
//				iconchange_on($unit.eq(first_num).find(".ham_menu li:eq(0)"));
			}else{
				$gnb.removeClass("bt_open");
				$el_gnb.removeClass("hover");
				$(".ham_menu li").removeClass("on");
//				iconchange_off($unit.find(".ham_menu li"));
			};
		});
		$list.mouseover(function(){
			var num = $(this).index(), check = $(this).hasClass("first");
			$el_gnb.addClass("hover");
			$(this).addClass("on").siblings().removeClass("on");
			$(this).parents(".ham_box").find(".category_group .con_category").eq(num).show().siblings().not(".banner_right").hide();
//			iconchange_off($(this));
//			iconchange_on($(this));
			
			if(!check){
				var max_h = $(this).parents(".ham_box").find(".category_group .con_category").eq(num).find(".move_wrap").height(), wrap_h = $(this).parents(".ham_box").find(".category_group .con_category").eq(num).find(".category_lists").height();
				if(max_h > wrap_h){
					$(this).parents(".ham_box").find(".category_group .con_category").eq(num).find(".scroll_button_wrap.bottom").show();
				};
				$(this).addClass("first");
			};

		});
		$wrap.bind("mouseout", function(e){
		}).mouseleave(function(e){
			var ex = e.pageX, ey = e.pageY, wX = $(window).width(), rX = ex - ((wX - $("#container").width()) / 2), conX = $("#container").width(), hamY = $("#ham_wrap").offset().top, maxY = hamY +  $("#ham_wrap").height();
			if((rX < 0 || rX > conX) || (ey < hamY || ey >= maxY)){
				$("#gnb").removeClass("bt_open");
				$el_gnb.removeClass("hover");
				$list.removeClass("on");
//				iconchange_off($list);
			};
		});
		$tap.click(function(){
			var num = $(this).index(), check = $("#ham_wrap .tap_unit").eq(num).find(".ham_menu li.on").length;
			$(this).addClass("on").siblings().removeClass("on");
			$("#ham_wrap .tap_unit").eq(num).removeClass("none").siblings().addClass("none");
			if(check == 0){
				$("#ham_wrap .tap_unit").eq(num).find(".ham_menu li:eq(0)").addClass("on");
//				iconchange_on($("#ham_wrap .tap_unit").eq(num).find(".ham_menu li:eq(0)"));
				$("#ham_wrap .tap_unit").eq(num).find(".category_group .con_category").eq(0).show().siblings().hide();
			};

		});
		$(".scroll_button_wrap.bottom").click(function(e){
			var $move = $(this).parent().find(".move_wrap");
			if(!$move.is(":animated")){
				var H = $(this).parent().height() * -1, h = $(this).parent().find(".move_wrap").height() * -1, max_num = Math.floor(h / H);
				var po = Math.abs($(this).parent().find(".move_wrap").css("top").replace(/px/g, '')) * -1;
				var $this = $(this);
				var $frind = $(this).parent().find(".scroll_button_wrap.top");
				if(h < po || H == 0){
					var price = po + H;
					var moveH = ( $move.innerHeight() - $move.parent().innerHeight() ) * -1;
					if(price <= moveH){
						price = moveH;
					};
					$move.stop().animate({"top":price+"px"},1000);
					var p = (Math.abs(H) + Math.abs(price)) * -1;
					$frind.show();
					if(price == moveH){
						$this.hide();
					};
				};
				e.stopPropagation();
			};
		});
		
		$(".scroll_button_wrap.top").click(function(e){
			var $move = $(this).parent().find(".move_wrap");
			if(!$move.is(":animated")){
				var H = $(this).parent().height() * -1, h = $(this).parent().find(".move_wrap").height() * -1, max_num = Math.floor(h / H);
				var po = Math.abs($(this).parent().find(".move_wrap").css("top").replace(/px/g, '')) * -1;
				var $this = $(this);
				var $frind = $(this).parent().find(".scroll_button_wrap.bottom");
				var moveH = ( $move.innerHeight() - $move.parent().innerHeight() ) * -1;
				var exid = ($move.innerHeight() % $move.parent().innerHeight()) * -1;
				if(h > po || po == po){
					var price = po - H;
					if(po <= moveH){
						price = (moveH - exid);
					};
					$move.stop().animate({"top":price+"px"},1000);
					$frind.show();
					if(price >= 0){
						$this.hide();
					};
				};
				e.stopPropagation();
			};
		});
		$(".category_lists").bind("mousewheel DOMMouseScroll", function(e){
			if($(this).find(".move_wrap").length){
				e.preventDefault()
				var ev = e.originalEvent, delta = 0;
				if(ev.detail){
					delta = ev.detail * -40;
				}else{
					delta = ev.wheelDelta;
				};
				if(delta != -120){
					var $move = $(this).find(".move_wrap");
					if(!$move.is(":animated")){
						var H = $(this).height(), h = $(this).find(".move_wrap").height(), max_num = Math.floor(h / H);
						var po = $(this).find(".move_wrap").css("top").replace(/px/g, '');
						var $this = $(this).find(".scroll_button_wrap.top");
						var $frind = $(this).find(".scroll_button_wrap.bottom");
						var price = (Number(po) + H);
						var moveH = ( $move.innerHeight() - $move.parent().innerHeight() ) * -1;
						var exid = ($move.innerHeight() % $move.parent().innerHeight()) * -1;
						if(po <= moveH){
							price = (moveH - exid);
						};
						$this.addClass("bright");
						setTimeout(function(){
							$this.removeClass("bright");
						},100);
						if(0 > po && price < 1){
							$move.stop().animate({"top":price+"px"},1000);
							$frind.show();
							var p = price + H;
							if(0 < p){
								setTimeout(function(){
									$this.hide();
								},100);
							};
						};
					};
				}else{
					var $move = $(this).find(".move_wrap");
					if(!$move.is(":animated")){
						var H = $(this).height(), h = $(this).find(".move_wrap").height(), max_num = Math.floor(h / H);
						var po = Math.abs($(this).find(".move_wrap").css("top").replace(/px/g, ''));
						var $this = $(this).find(".scroll_button_wrap.bottom");
						var $frind = $(this).find(".scroll_button_wrap.top");
						var price = (po + H) * -1;
						var moveH = ( $move.innerHeight() - $move.parent().innerHeight() ) * -1;
						$this.addClass("bright");
						setTimeout(function(){
							$this.removeClass("bright");
						},100);
						if(h > po && price > (h * -1)){
							if(price <= moveH){
								price = moveH;
							};
							$move.stop().animate({"top":price+"px"},1000);
							var p = price - H;
							$frind.show();
							if(price == moveH){
								setTimeout(function(){
									$this.hide();
								},100);
							};
						};
					};
				};
			};
		});
		function iconchange_on(el){
			var src = el.find("a img").attr("src"), check = "";
			src = src.replace(/_on/g, '');
			src = src.replace(/(.*)(\.[pPgGjJ][nNiIpP][gGfF])/g, '$1_on$2');
			el.find("a img").attr("src",src);
		};
		function iconchange_off(el){
			var $par = el.parent();
			$par.children().each(function(index,node){
				var src = $(node).find("a img").attr("src"), $img = $(node).find("a img"), check = "";
				check = src.match("_on");
				if(check){
					src = src.replace(/(.*)_on(\.[pPgGjJ][nNiIpP][gGfF])/g, '$1$2');
					$img.attr("src",src);
				};
			});
		};

	};
};

function leayePopup_close(){
	//Layer pop-up window closure affects elsewhere
	/*$("type1, .btn_modal_close").click(function(){
		$(this).parent().parent().fadeOut();
	});*/
};


//EC_DI_S3001_01_LiveShop_Tab1 Time countdown
function time_Countdown(){
	var time = $(".countdown");
	if(time) init();
	function init(){

	  function format(v) {
	    return (v.toString().length == 1) ? '0' + v : v;
	  }
	  
	  const now = new Date();
	  
	  var currentDate = Date.now();
	  now.setTime(now.getTime() + 986400000);
	  var endDateString = now.toISOString();
	  var endDateTime = Date.parse(endDateString);
	  var endDate = new Date(endDateTime);
	  
	  /*const $days = $('.days');*/
	  var $hours = $('.hours');
	  var $mins = $('.minutes');
	  var $secs = $('.seconds');
	  
	  setInterval(function() {
	    
	    currentDate = Date.now();
	    if (currentDate < endDate) {
	    
	      var time = endDate - currentDate;
	    
	      var seconds = Math.floor((time / 1000) % 60);
	      var minutes = Math.floor((time / 60000) % 60);
	      var hours = Math.floor((time / 3600000) % 999);
	      /*const days = Math.floor((time / 86400000));*/
	    
	      $secs.text( format(seconds) );
	      $mins.text( format(minutes) );
	      $hours.text( format(hours) );
	      /*$days.text( days);*/
	      
	   }
	    
	  }, 100);
  

	}
}

//Pulsa top band banner image change
function pulsa_Tab() {
	if ($('.pulsa_wrap .t_bx').length) {
		$('.pulsa_tab li a').click(function(){
			var el_num = $(this).parent().index() + 1;
			var el_cls = 'pulsa_ban0' + el_num;
			for (var i = 1; i <= $('.pulsa_tab li').length; i++) {
				var rem_cal = 'pulsa_ban0' + i;
				$('.t_bx').removeClass(rem_cal);
			}
			$('.t_bx').addClass(el_cls);
		})
	}
}


//Pulse input Delete input text
function input_Del() {
	if($('.phone_bx .txt_del').length) {
		$('.phone_bx .txt_del').click(function(){
			$('.phone_bx input').val('');
		})
	}
}


//brandmall_visual banner slider - EC_DI_0105_Brandmall
function brandmall_Slider() {
	if($('.brandmall_slider').length) {
		var cate_banner = $('.brandmall_slider').bxSlider({
	   		pause: 3000,
			autoHover: true,
			auto: true
		});

	    //Resolved clicks on click //
		$(document).on('click','.bx_catebox .bx-prev, .bx_catebox .bx-next',function() {
			cate_banner.stopAuto();
			cate_banner.startAuto();
		});
	}
}

// shopping popup movie player - EC-DI-S3001_ShoppingShow_Tab1
function pop_playr(){
	var speed = 500;
	var movie_pop = $(".shopping_movie .movie .shopping_btn");
	var movie_big = $(".movie_pop");

	movie_pop.click(function(){
		$(this).next().fadeIn(speed);
	});
	movie_big.click(function(){
		$(this).fadeOut(speed);
	});
}

//category lnb More & Close - EC_DI_0201_CategoryLevel_new

function submore_LNB(){
	var sublnb = $('.category_menu ul.menu');
	var morebtn = $('.category_menu .more_btn');
 	var moretxt = $('.category_menu .more_btn a');
	if($(sublnb).length) {
		$(morebtn).click(function(){
			if(!morebtn.hasClass("close")){
				$(this).addClass('close');
				$(moretxt).text('close');
				$(sublnb).css('height', 'inherit');
			}else{
				$(this).removeClass('close');
				$(moretxt).text('more');
				$(sublnb).css('height', '265px');
			}
		});
	}
}

/*function submore_LNB(){
	var sublnb = $('.category_menu ul.menu');
	var morebtn = $('.category_menu .more_btn');
 	var moretxt = $('.category_menu .more_btn a');
	if($(sublnb).length) {
		$(morebtn).click(function(){
			if(morebtn.hasClass("close")){
				$(this).removeClass('close');
				$(moretxt).text('more');
				if($(".category_menu.edit").length > 0){
					$(sublnb).removeAttr("style");
				}else{
					$(sublnb).css('height', 'inherit');
				};
			}else{
				$(this).addClass('close');
				$(moretxt).text('close');
				if($(".category_menu.edit").length > 0){
					$(sublnb).css('height', 'auto');
				}else{
					$(sublnb).css('height', '265px');
				};
			}
		});
	}
} 2017-09-22 스크립트가 달라 주석처리했습니다.*/
var mdpick_banner;
//mdpick slider banner - EC_DI_0201_CategoryLevel_new
function mdpick_Slider() {
   var mdpick_wrap = $('.mdpick_slider'), check = true, first = new Array, obj = new Array, max = new Array, max_width = 1280 - 17;
   if(mdpick_wrap.length){
		mdpick_wrap.each(function(index, node){
			first[index] = true;
			obj[index] = $(node);
			max[index] = obj[index].children().length;
		});
		mdpick_wrap.each(function(index, node){
			roll_fn(index);
		});
		function resize(){
			return $(window).innerWidth();
		};
		function roll_fn(index){
			if(max[index] > 3){
				obj[index].bxSlider({
					minSlides: 3,
					maxSlides: 3,
					slideWidth: 245
				});
				check = false;
			};
		};
   };
}

//4 products banner slider hover - EC_DI_0201_CategoryLevel_new
function prd4hover_Slider() {
   var prd4hover_banner = $('.prd4hover_slider'), check = true, first = new Array, obj = new Array; max_width = 1280 - 17;
   if(prd4hover_banner.length){
		prd4hover_banner.each(function(index, node){
			first[index] = true;
			obj[index] = $(node);
		});
		ex();
		$(window).on("resizeEnd", function (){
			ex();
		});
		function ex(){
			prd4hover_banner.each(function(index, node){
				if(resize() > max_width){
					check = true;
				}else{
					check = false;
				};
				roll_fn(index);
			});
		};
		function resize(){
			return $(window).innerWidth();
		};
		function roll_fn(index){
			if(resize() > max_width && check){
				first_check(index);
				if(obj[index].children().length > 4){
					obj[index].bxSlider({
						minSlides: 4,
						maxSlides: 4,
						moveSlides: 1,
						slideWidth: 300
					});
					check = false;
				}else{
					first[index] = true;
				};
			}else if(resize() <= max_width  && !check){
				first_check(index);
				if(obj[index].children().length > 3){
					obj[index].bxSlider({
						minSlides: 3,
						maxSlides: 3,
						moveSlides: 1,
						slideWidth: 350
					});
					check = true;
				}else{
					first[index] = true;
				};
			};
			/*
			$('.prd_area.type02.category_new .bx-wrapper .bx-pager.bx-default-pager a').hover(function(){
			     obj[index].goToNextSlide();
			     
			}, function(){
				return false;
			});
			*/
		};
		function first_check(index){
			if(first[index]){
				first[index] = false;
			}else{
				obj[index].destroySlider();
			};
		};
		
   };
}

//5 products banner slider hover - EC_DI_0201_CategoryLevel_new
function prd5hover_Slider() {
   var prd5hover_banner = $('.prd5hover_slider'), check = true, first = new Array, obj = new Array, max = new Array, max_width = 1280 - 17;
   if(prd5hover_banner.length){
		prd5hover_banner.each(function(index, node){
			first[index] = true;
			obj[index] = $(node);
			max[index] = obj[index].children().length;
		});
		ex();
		$(window).on("resizeEnd", function (){
			ex();
		});
		function ex(){
			prd5hover_banner.each(function(index, node){
				if(resize() > max_width){
					check = true;
				}else{
					check = false;
				};
				roll_fn(index);
			});
		};
		function resize(){
			return $(window).innerWidth();
		};
		function roll_fn(index){
			if(resize() > max_width && check){
				first_check(index);
				if(max[index] > 5){
					obj[index].bxSlider({
						minSlides: 5,
						maxSlides: 5,
						slideWidth: 238
					});
					check = false;
				}else{
					first[index] = true;
				};
			}else if(resize() <= max_width  && !check){
				first_check(index);
				if(max[index] > 4){
					obj[index].bxSlider({
						minSlides: 4,
						maxSlides: 4,
						slideWidth: 240
					});
					check = true;
				}else{
					first[index] = true;
				};
			};
			/*
			$('.prd_area.type06.category_new .bx-wrapper .bx-pager.bx-default-pager .bx-pager-item a').hover(function(){
		     obj[index].goToNextSlide();		     
			}, function(){
				return false;
			});
			*/
		};
		function first_check(index){
			if(first[index]){
				first[index] = false;
			}else{
				obj[index].destroySlider();
			};
		};
   };
}
// Flag Select
function nation_sel(){
	var $nsel = $(".nationsel_wrap"), $sel_li = $(".sel_nation li"), $checked = $(".checked_box a");
	if($nsel.length) init();
	function init(){
		$nsel.click(function(){
			$(this).toggleClass("open");
		});
		$sel_li.click(function(){
			var html = $(this).find("a").html();
			$checked.html(html);
		});
	};
};
// mart settigns
function mart_setting(){
	var $mart = $(".representative"), $mart_btn1 = $(".repr_open"), $mart_btn2 = $(".btbox_close"), $mart_btn3 = $(".selection_btn"), cl = "";
	if($mart.length && !$mart.hasClass("only")) init();
	function init(){
		$mart_btn1.click(function(){
			var cl = $mart.attr("class");
			if($mart.hasClass("type01")){
			$mart.attr("class","representative").addClass("type02");
			}else if($mart.hasClass("type02")){
			$mart.attr("class","representative").addClass("type01");
			};
		});
		$mart.click(function(){
			var check = $mart.hasClass("type01");
			if(check) $mart.removeClass("type01").addClass("type03").removeAttr("style");
		});
		$mart_btn2.click(function(e){
			if($(window).innerWidth() >= 1360){
				cl = "type02";
				$mart.addClass(cl);
			}else{
				cl = "type01";
				$mart.addClass(cl).css("cursor","pointer");
			};
			$mart.removeClass("type03");
			if(e.stopPropagation()){
				e.stopPropagation();
			}else{
				e.cancleBubble = true;
			};
		});
		$mart_btn3.click(function(){
			$mart.attr("class","representative").addClass("type03");
		});
		$(window).resize(function(){
			var w = $(window).innerWidth();
			if(w >= 1360){
				if($mart.hasClass("type01")){
					$mart.removeClass("type01").addClass("type02").removeAttr("style");
				};
			}else{
				if($mart.hasClass("type02")){
					$mart.removeClass("type02").addClass("type01").css("cursor","pointer");
				};
			};
		});
	};
};

// mart settigns new
function mart_setting_new(){
	$(".right_martmenu .left_button").click(function(){
		var type = $(".right_martmenu").attr("class").replace(/.*(type0\d).*/g, '$1');
		$(".right_martmenu").attr("class","right_martmenu");
		if(type == "type01"){
		$(".right_martmenu").addClass("type02");
		}else if(type == "type02"){
		$(".right_martmenu").addClass("type01");
		};
	});
	$(".rm_btn_group .rm_btn.green").click(function(){
		$(".martpopup_box").show();
	});
	$(".martpopup_box .btbox_close").click(function(){
		$(".martpopup_box").hide();
	});
	$(".btn_gray.icon_set").click(function(){
		$(".martpopup_box").show();
		$("body").css("overflow","hidden");
	});
};

//popup scroll controll
function popup_radio(){
	$(".radio label").click(function(e){
		var num = $(this).parent().index();
		var sT = $(".content_textbox").offset().top + 21;
		var move = $(".content_textbox h4:eq("+num+")").offset().top - sT + $(".content_textbox").scrollTop();
		$(".content_textbox").scrollTop(move);
	});
};


function prevent_contextmenu(){
	 $(window,document).on("contextmenu", function(e) {
		 return false;
	 });
}

// martmenu scroll event
function maratmenu_scroll(){
	var $m = $(".right_martmenu");
	if($m.length) init();
	function init(){
		$(window).scroll(function(){
			if(!$("body").hasClass("top_pop_close")){
				var type = $m.attr("class").replace(/.*(type0\d).*/g, '$1'), st = $(window).scrollTop(), max = 0, tt = 0;
				
				if(type == "type01"){
					max = 100, tt = 90;
					if((max - 10) <= st){
						tt = 10;
						$m.addClass("ev_check");
					}else{
						tt = max - st;
						$m.removeClass("ev_check");
					};
				}else if(type == "type02"){
					max = 140, tt = 90;
					if((max - 10) <= st){
						tt = 10;
					}else{
						tt = max - st;
					};
				};
				$m.css("padding-top",tt);

			};
		});
	};
};

function top_mart(){
	var btn = $(".top_mart_con, .top_close");
	var $wrap = $(".top_mart");
	btn.click(function(){
		$wrap.toggleClass("on");
		$(".top_mart_pop").css("display", "");
	});
	if($(".representative.only.type03").length){
		$(".martpopup_box").click(function(){
			$(this).hide();
			$("body").css("overflow","scroll");
		});
		$(".btbox_close").click(function(){
			$("body").css("overflow","scroll");
		});
		$(".representative.only.type03").click(function(e){
			if(e.stopPropagation()){
				e.stopPropagation();
			}else{
				e.cancelBubble();
			};
		});
	};

};

function brand_con(){
	$(".i_app_android, .i_app_ios, .i_appstore, .i_googleplay").click(function(){
		$.fancybox($('#FO-MP-E0107'));
	});



	$(".more_btn").click(function(){
		$(this).parent().prev().children(".right_box").addClass("on").parent().next().css({
			display: "none"
		});
	});

	$(".selbrands_abcbtns button").click(function(){
		var inx = $(this).index() - 1;
		$(".brand_search_list.normal").children().eq(inx).addClass("on").siblings().removeClass("on");

		console.log(inx)
	});

	$(".selbrands_abcbtns .all").click(function(){
		$(".brand_search_list.normal").children().addClass("on")
	})
};
// publick rolling
function new_rolling(){
	var $pr = $(".main_top .visual_wrap");
	if($pr.length) init();
	function init(){
		mainslide_wrap(0, 4000);
	};
};

function mainslide_wrap(start_num,delay){var $r=$(".visual_wrap"),$m=$(".mainslide_wrap"),$l=$(".slide_wrap ul li"),$g=$(".slide_bar span"),arr=new Array,html,num=start_num,speed=1000,len,timer,d=delay;if($r.length)init();function init(){html=$m.html();arr=html.split("</li>");$m.empty().prepend(arr[num]);list_ac();list_hoverAction();gauge_ac(true);startAuto();wrp_hover();function startAuto(){timer=setInterval(function(){num++;if(num>=(arr.length-1))num=0;addBanner();list_ac();gauge_ac(true)},d)};function stopAuto(){clearInterval(timer)};function list_hoverAction(){$l.hover(function(){stopAuto();num=$(this).index();addBanner();list_ac()})};function addBanner(){$m.append(arr[num]);$m.children(":last").hide().fadeIn(speed);setTimeout(function(){if($m.children().length>2)$m.children(":first").remove()},speed)};function list_ac(){$l.eq(num).addClass("on").siblings().removeClass("on")};function wrp_hover(){$r.hover(function(){stopAuto();gauge_ac(false)},function(){gauge_ac(true);startAuto()})};function gauge_ac(sw){if(sw){$g.css({"width":"0"});$g.stop().animate({"width":"100%"},d)}else{$g.stop().css({"width":"0"})}}}};