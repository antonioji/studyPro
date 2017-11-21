/*
 * b2 common framework
 */


/**
 * common create namespace
 */
$.namespace = function() {
	var a = arguments, o = null, i, j, d;
	for (i = 0; i < a.length; i = i + 1) {
		d = a[i].split(".");
		o = window;
		for (j = 0; j < d.length; j = j + 1) {
			o[d[j]] = o[d[j]] || {};
			o = o[d[j]];
		}
	}

	return o;
};

/**
 * common create namespace
 */
$.createNamespace = function ( ns, ns_string ) {
    var parts = ns_string.split("."),
        parent = ns,
        i;
    if (parts[0] === "b2" || parts[0] === "lotteindo") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i++) {
        //create a property if it doesnt exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};


/**
 * b2 common layerPopup Class
 */
(function(w, d, $, ns) {
    "use strict";

    var layerPopup = Class.extend({
        init: function(options) {
            var that = this;

            var defaultOptions = {
            	layername: "",
                layerSelector: "", // layerPopup
                layerUrl: "", //로드 할 layerPopup 주소
                uiSelector: "body", // html 로드 후 가져 올 영역 container
                addContainer: "body", // layerPopup을 append 할 container
                retFunc: function(actionType, retData) {}
            };
            that._options = $.extend(true, defaultOptions, options);

            var _settings = {
                requestData : {
                }
            };
            that._settings = $.extend(true, _settings, that._settings);

            that.$w = $(window);
            that.$d = $(document);
            //w.console.log("common layer init!!!");
        },
        //Element ID를 만든다. 랜덤string
        getRandomID : function () {
            var timeStamp = new Date().getTime(),
               randomStr = (Math.floor(Math.random() * timeStamp)).toString();

            return randomStr;
        },
        // 레이어팝업 Container 생성
        createContainer: function(callBack) {
            var that = this;

            if( !that.$container || !that.$container.length ) {
                that.containerID = "js_popupLayer" + that.getRandomID();
                that.$container = $(that._options.addContainer).append("<div class='js_layerPopup' id='" + that.containerID + "'></div>").find("#" + that.containerID);
                that.eventID = "." + that.containerID;
            }

            if(!that.$layer || !that.$layer.length) {
            	that.$layer = that.$container.find(that._options.layerSelector);
            }

            callBack();

            return that.$container;
        },
        // 생성된 레이어팝업 Container에 레이어팝업 html 로드하여 append
        popupLayerUILoad: function(getUrl, select, callBack) {
            var that = this,
               getSelect = select ? getUrl + " " + select : getUrl + " body";

            if( !that.$container || !that.$container.length || !that.$container.children().length ) {
                that.$container.load(getSelect, function(resData, status, xhr) {
                    //window.console.log(resData);
                    callBack(false);
                });
            } else {
                callBack(true);
            }

            that.layerBeforeShow.call(that);

            return that.$container;
        },
        // 이벤트 리스너 추가.
        initEventListener: function() {
        	var that = this;
            //w.console.log("common layer initEventListener!!!");

        	that.$container.on("click" + that.eventID, ".btn_modal_close", function() {
        		that.closeLayer();
        	});
        },
        // 이벤트 리스너 해제
        destroyEvent: function() {
            var that = this;

            that.$container.off(that.eventID);
            that.$w.off(that.eventID);
            that.$d.off(that.eventID);
        },
        // layer 생성시 발생하는 callBack 함수
        layerBeforeShow: function() {
            var that = this;

            //w.console.log("common layer before show!!!");
        },
        // layer 열었을 때 발생하는 callBack 함수
        layerShow: function(pageData) {
            var that = this;
            //w.console.log("common layer show!!!");

            that.initEventListener();

            // 레이어 오픈시 부모레이어 사이즈를 body 사이즈 만큼 줄여서
            // 부모레이어가 스크롤 되지 않게 처리
            that.parentPosTop = $(window).scrollTop();
            $("#container").css({
                "max-height": $("body").outerHeight() + "px",
                "overflow": "hidden"
            });
        },
        // layer 닫았을 때 발생하는 callBack 함수
        layerHide: function() {
            var that = this;

            that.destroyEvent();
            //w.console.log("common layer hide!!!");
        },
        // ui layer 열기
        openLayer: function(optObj) {
            var that = this,
            	layerPageID = that._options.layerName;

           if( w.location.href.indexOf(layerPageID) < 0 ) {
               that.scrollTop = $(window).scrollTop();
               if( w.location.href.indexOf("#layer=") < 0 ) {
                   w.history.pushState(null, null, w.location.href + "#layer=" + layerPageID);
               } else {
                   w.history.pushState(null, null, w.location.href + "_" + layerPageID);
               }
           }

            $("body").css({
            	"pointer-events": "none", // 레이어 오픈 요청시 웹문서 전체 이벤트를 막는다
            	"overflow": "auto"
            });

            optObj = typeof optObj == "string" ? {parent: w, param: optObj} : optObj;
            optObj = optObj || {parent: w, param: ""};
            that.parent = optObj.parent || w;

            that.createContainer(function() {
                that.popupLayerUILoad(that._options.layerUrl, that._options.uiSelector, function(isLoaded) {
                    that.layerShow.call(that, ns.common.Util.URI.parseURI("?" + optObj.param), isLoaded);
                    $(that._options.layerSelector).css("position", "fixed").show();

                    $("body").css({
                    	"pointer-events": "auto", // 레이어 오픈 완료시 웹문서 전체 이벤트를 허용한다.
                    	"overflow": "hidden"
                    });
                    ns.common.Util.dimmed.show();
                });            	
            });
        },
        // ui layer 닫기
        closeLayer: function(isNotBack) {
            var that = this;
            //w.console.log("common closeLayer");

            $("#container").css({
                "max-height": "",
                "overflow": ""
            });

            if(w.location.href.indexOf("#layer=") < 0) {
	            $("body").css({
	            	"pointer-events": "auto", // 레이어 오픈 완료시 웹문서 전체 이벤트를 허용한다.
	            	"overflow": ""
	            });
            }

            $(window).scrollTop(that.parentPosTop);
            $(that._options.layerSelector).css("position", "").hide();
            that.layerHide.call(that);

            if( w.location.href.indexOf("#layer=") < 0 ) {
            	ns.common.Util.dimmed.hide();
            } else {
            	ns.common.Util.dimmed.show();
            }

            if(!isNotBack) {
                w.history.back();
            }
        },

        requestSettings: function(reqID, requestObj) {
        	var that = this;
        	var request = that._settings.request[reqID];

        	requestObj = requestObj || {};
        	$.extend(request, requestObj);
        },

        requestDataSettings: function(reqID, reqData) {
        	var that = this;
        	$.extend(that._settings.request[reqID].reqData, reqData);
        },

        sendRequest: function(reqID, callBack) {
        	var that = this,
        		requestObj = that._settings.request[reqID];

        	if(!requestObj) {
        		return;
        	}

        	callBack = typeof callBack === "function" ? callBack : function() {};

        	requestObj.async = typeof requestObj.async === "undefined" ? true : requestObj.async;

        	that.request = that.request || {};
        	that.request[reqID] = ns.common.Ajax.sendJSONRequest(
    			requestObj.method,
				requestObj.url,
				requestObj.reqData,
				function(response) {
    				callBack.call(that, response);
    				that.requestSUCCESS.call(that, reqID, response);
				},
				requestObj.async
			);
        },

        requestSUCCESS: function(reqID, resData) {
        	var that = this;
        },

        requestERROR: function(reqID, resData) {
        	var that = this;
        }
    });

    ns.LayerPopupClass = layerPopup;

})(window, document, jQuery, b2);


/**
 * b2 common Page Class
 */
(function(w, d, $, ns) {
    "use strict";

    var page = Class.extend({
        init: function(options) {
            var that = this;

            options = options || {};
            var _defaultOptions = {
				title: "",
				request: {
				}
            };
            that._options = $.extend(true, _defaultOptions, options);

            if(that._options.title) {
            	d.title = that._options.title;
            }

            that.pageSelector = "#container";
            that.eventID = ".defaultEventID";

            that.$w = $(window);
            that.$d = $(document);
            that.$page = $(that.pageSelector);

            that.destroyEvent();

            that.$d.ready( function(e) {
                if( w.history.state ) {
                    that.isBack = w.history.state.isBack ? true : false;
                } else {
                    that.isBack = false;
                }

                that.pageBeforeShow.call(that, ns.common.Util.URI.parseURI(w.location.href), that.isBack);
            });

            that.$w.off("load" + that.eventID).on("load" + that.eventID, function(e) {
                that.initEventListener.call(that);
            	that.pageShow.call(that, ns.common.Util.URI.parseURI(w.location.href), that.isBack);
            });

            that.$w.on("popstate" + that.eventID + " hashchange" + that.eventID, function(e) {
                var isBack = e.type === "popstate" && that.isBack;

                var href = w.location.href;
                ns.LayerPopup = ns.LayerPopup || {}; 
                $.each(ns.LayerPopup, function(key) {
                   if( href.indexOf(key) === -1 ) {
                	   var layerPopup = this;

                       $(window).scrollTop(this.scrollTop);
                       if(layerPopup.$container && layerPopup.$container.is(":visible")) {
                    	   layerPopup.closeLayer(true);
                       }
                   }
                });

                if( href.indexOf("#layer=") < 0 ) {
                	ns.common.Util.dimmed.hide();
                } else {
                	ns.common.Util.dimmed.show();
                }

                that.onChangeURI.call(that, ns.common.Util.URI.parseURI(w.location.href), isBack);
            });
        },

        initEventListener: function() {
            var that = this;

            that.$page = $(that.pageSelector);

            window.onunload = function() {
                that.pageBeforeHide.call(that);
                that.pageHide.call(that);
                that.destroyEvent.call(that);
            };

            that.$w.on("resize" + that.eventID, function(){
                that.pageResize.call(that);
            });
        },

        destroyEvent: function() {
            var that = this;

            that.$page.off(that.eventID);
            that.$w.off(that.eventID);
            that.$d.off(that.eventID);
        },

        pageBeforeShow: function() {
            var that = this;
        },

        pageShow: function(pageData, isBack) {
            var that = this;
        },

        onChangeURI: function(info, isBack) {
            var that = this;
        },

        pageBeforeHide: function() {
        	var that = this;
        },

        pageHide: function() {
        	var that = this;
        },

        pageResize: function(callBack) {
            var that = this;
        },

        requestSettings: function(reqID, requestObj) {
        	var that = this;
        	var request = that._options.request[reqID];

        	requestObj = requestObj || {};
        	$.extend(request, requestObj);
        },

        requestDataSettings: function(reqID, reqData) {
        	var that = this;
        	$.extend(that._options.request[reqID].reqData, reqData);
        },

        sendRequest: function(reqID, callBack) {
        	var that = this,
        		requestObj = that._options.request[reqID];

        	if(!requestObj) {
        		return;
        	}

        	callBack = typeof callBack === "function" ? callBack : function() {};

        	requestObj.async = typeof requestObj.async === "undefined" ? true : requestObj.async;

        	that.request = that.request || {};
        	that.request[reqID] = ns.common.Ajax.sendJSONRequest(
    			requestObj.method,
				requestObj.url,
				requestObj.reqData,
				function(response) {
    				callBack.call(that, response);
    				if(response.successYn === "N"){
    					that.requestERROR.call(that, reqID, response);
    				}else{
    					that.requestSUCCESS.call(that, reqID, response);
    				}
				},
				requestObj.async
			);
        },

        requestSUCCESS: function(reqID, resData) {
        	var that = this;
        },

        requestERROR: function(reqID, resData) {
        	var that = this;
        }
    });

    ns.PageClass = page;

})(window, document, jQuery, b2);

(function(w, $, ns) {
	$(window).off(".common").on("hashchange.common popstate.common", function() {
        var href = w.location.href;

        if( href.indexOf("#layer=") < 0 ) {
        	ns.common.Util.dimmed.hide();
        } else {
        	ns.common.Util.dimmed.show();
        }
	});
})(window, jQuery, b2);



/**
 * @fileOverview
 * @author Hongki Kim <redflaghk@sys4u.co.kr>
 * @version 0.1
 */

(function(w, s, ns) {
    "use strict";

    var tmplMng = function() {
        var that = this;

        that.init();
    };

    $.extend(tmplMng.prototype, {
        constructor : tmplMng,

        init : function() {
            var that = this;

            that.tmplWrapCreat();
        },

        tmplWrapCreat : function() {
            var that = this;

            that.$tmplWrap = that.$tmplWrap && that.$tmplWrap.length > 0 ?  that.$tmplWrap : $('<div class="tmplWrap"></div>').appendTo('body');
            s.Tmpl = s.Tmpl || {};
        },

        tmpl2Data : function() {
            var that = this,
                $template = $('[type^="text/x-jquery-tmpl"]:not(".tmplWrap > *")'),
                $Tmpl = $('.Tmpl');

            that.tmplWrapCreat();

            s.Tmpl = s.Tmpl || {};
            $.each($template, function() {
                var $this = $(this),
                    key = $this.attr('id'),
                    value = $this.text();

                if( !s.Tmpl[ key ] ) {
                    s.Tmpl[ key ] = $.template(null, value);
                }
            });

            if( that.$tmplWrap.length > 0 ) {
                that.$tmplWrap.append($template.detach());
                if( $Tmpl.length > 0 ) $Tmpl.remove();
            }
        },

        removeTmplDom : function( id ) {
            var key = id.replace("#", "");

            if( !s.Tmpl[ key ] ) {
                s.Tmpl[ key ] = $.template(null, $(id).text());
            }
            $(id).remove();
        },

        getTemplate : function( id ) {
            var that = this,
                key = id.replace("#", ""),
                tmplText = $(id).text() || $(id).html();

            s.Tmpl[ key ] = s.Tmpl[ key ] || $.template(null, tmplText);

            that.removeTmplDom( id );
            return s.Tmpl[ key ];
        },

        makeHtml : function( id, data ) {
            var that = this,
                template = that.getTemplate(id);
            return $.tmpl(template, data);
        }
    });

    s[ns] = new tmplMng();

})(window, b2, "tmplManager");


/**
 * @fileOverview
 * @author Hongki Kim <redflaghk@sys4u.co.kr>
 * @version 0.1
 */
 (function (w, $, ns) {
    "use strict";
    /**
     * View의 기본이 되는 클래스이며, UI 구성을 위해 jQuery Template를 사용한다.
     * View는 반드시 하나의 TAG로 묶여야 한다.
     * @class View의 기본이 되는 클래스이다.
     * @constructor
     * @name UIFW.View
     * @param {object} params -
     */
    var BaseView = Class.extend({
        init : function (params) {
        	var that = this;

            that.params = $.extend(true, {
                //Template ID - '#'을 포함해야 한다.
                id : "",
                //View가 append될 위치의 selector (기본값 'body')
                container : "body",
                //Template를 기준으로 View를 생성할때 들어갈 Data (생략 가능)
                data : {
                    id : ""
                }
            }, params);

            that.$view = null;
            that.$container = null;
            that.template = that.getTemplate(that.params.id);

            that._createView();
        },

        //View를 템플릿 기준으로 생성한다.
        _createView : function () {
            var that = this,
                params = this.params,
            	functionName = "append",
            	position = "last",
            	view, viewID;

            //일단 Random 아이디 생성 후 data에 추가
            if (!params.data.id) {
                params.data.id = that.getRandomID();
            }
            view = $.tmpl(that.template, params.data);

            //Append or Prepend
            if (params.prepend && params.prepend === true) {
                functionName = "prepend";
                position = "first";
            }
            that.$container = params.container instanceof jQuery ?  params.container : $(params.container);
            that.$view = that.$container
                             [functionName](view)
                             .children()
                             [position]();    //View가 반드시 하나의 Tag로 묶여있어야 한다.

            //실제 아이디가 있는지 Check
            viewID = that.$view.attr("id");
            if (viewID && viewID !== params.data.id) {
               params.data.id = viewID;
            }

            //console.log("view create",this.$container);
            that.lazyload(that.$container);
        },

        //Element ID를 만든다. 랜덤
        getRandomID : function () {
            var timeStamp = new Date().getTime();
            var randomStr = (Math.floor(Math.random() * timeStamp)).toString();

            return randomStr;
        },

        /**
         * Template를 가져온다.
         * @memberOf UIFW.View.BaseView.prototype
         * @param {string} id - template 아이디
         * @returns {template} - template
         */
        getTemplate : function (id) {
            return ns.tmplManager.getTemplate(id);
        },

        /**
         * Template을 이용하여 Html을 만든다.
         * @memberOf UIFW.View.BaseView.prototype
         * @param {string} templateID - template 엘리멘트 아이디명
         * @param {object} data - template와 바인딩 할 ViewModel 데어터(json or array json).
         */
        makeHtml : function (templateID, data) {
            var template = this.getTemplate(templateID);
            return $.tmpl(template, data);
        },

        /**
         *
         */
        update : function (data) {
        	var that = this,
            	viewID = that.$view.attr("id") || data.id || that.getRandomID(),
            	tmplItem = that.$view.tmplItem();

        	if(typeof tmplItem.update !== "function") {
        		that.remove();
        		that.add(data);
        		return;
        	}

            that.$container.find(":first").attr("id", viewID);

            if (viewID && typeof tmplItem.data === "object" && typeof data === "object") {
                tmplItem.data = data;
                data.id = viewID;
                tmplItem.update();
                that.$view = that.$container.find("#"+viewID);

                setTimeout(function() {
                	$(window).trigger("resize");
                }, 1500);

               that.lazyload(that.$container);

            } else {
                throw new Error("Can not update!!!!");
            }
        },

        show : function () {
            this.$view.show();
        },

        hide : function () {
            this.$view.hide();
        },

        /**
         * html을 View에 prepend한다.
         * @memberOf UIFW.View.BaseView.prototype
         * @param {string} html - html 내용
         */
        prepend : function (html) {
            this.$view.prepend(html);
        },

        /**
         * html을 View에 append한다.
         * @memberOf UIFW.View.BaseView.prototype
         * @param {string} html - html 내용
         */
        append : function (html) {
            this.$view.append(html);
        },

        add : function(data) {
        	if(!data) return;

            var that = this,
        	    html = $.tmpl(that.template, data);

            that.$container.append(html);
            setTimeout(function() {
            	$(window).trigger("resize");
            }, 1500);

            that.lazyload(that.$container);

        },

        lazyload : function(container) {
        	return;
            var tmpEventName = Date.now().toString(36);
    	    var eventId = "scroll.lazyload" + tmpEventName + " scrollupdate.lazyload" + tmpEventName;

    	    container.find("img[data-original]").off(eventId);
    	    container.find("img[data-original]").lazyload({
    	    	container: container.attr("data-list-type") === "horizontal" ? container : undefined,
    			event: eventId,
    	        appear : function (elements_left, settings) {
    	        }
    	    });
        },

        /**
         * View를 삭제한다.
         * @memberOf UIFW.View.BaseView.prototype
         */
        remove : function () {
            this.$container.empty();
            //this.$view.remove();
        }
    });

    ns.View = ns.View || {};
    ns.View.BaseView = BaseView;
 })(window, jQuery, b2);


 /**
  * @fileOverview
  * @author Hongki Kim <xxxx@xxxx.xxx>
  * @version 0.1
  */
  (function (w, $, s, ns) {
     "use strict";
     var Parent = ns ? ns.BaseView : w.BaseView;
     /**
      * UIFW PagingView를 구성하는 Class이며 UIFW.View.BaseView를 확장하여 만들어졌다.
      * @class UIFW PagingView를 구성하는 Class
      * @constructor
      * @name UIFW.View.PagingView
      */
     var PagingView = Parent.extend({
         //params.id, params.container, params.ui, params.usePaging, params.onShowMore(function) 에 따라 PagingView 표현 방식이 달라짐.
         init : function (params) {
             var that = this,
                 options = params || {},
                 data = {
                 	id : options.id || null
                 };

             if(options.type == "pagination") {
             	$.extend(true, data, that.getPaginationData(options.pageNum, options.total, options.pageSize, options.pageSkipSize));
             } else {
             	$.extend(true, data, {
                     total: options.total || 0,
                     current: options.current || 0
             	});
             }

             var tmplId = options.tmplId ? options.tmplId : options.type == "pagination" ? "#Tmpl_paginationTemplate" : "#Tmpl_moreTemplate";
             that._super({
                 id : tmplId,
                 container : options.container || "body",
                 data : data
             });
             that._initialize(options);
             that._initEvent();
         },

         _initialize : function (options) {
             var that = this;

             that.pagingType = options.type;
             that.container = options.container;
             that.onPaging = options.onPaging;
             that.pageSkipSize = options.pageSkipSize || 5;
             that.autoMore = options.autoMore;

             that.eventID = ".pagingView" + that.$view.attr("id");
             that.$container = that.$view.parents(that.container);

             that.updatePaging(options);
         },

         _initEvent : function () {
             var that = this;

             if(that.pagingType == "more") {
             	that.$container.off(that.eventID).on("click" + that.eventID, "#js_paging, .js_btn_more", function(event) {
             		var $paging = $(this),
                     	tmplItem = $(this).tmplItem(),
                     	tmplItemData = tmplItem.data;

                     if(that.$container.data("isLoading")) {
                     	return false;
                     }

                     //if (!tmplItemData.loading) {
                         tmplItemData.pageNum = tmplItemData.pageNum || 1;
                         ++tmplItemData.pageNum;
                         tmplItemData.type = that.pagingType;

                     	//현재 더보기 중이 아닌 경우에만 더보기를 시도한다.
                         that.showMoreLoading();
                         that.$container.data("isLoading", true);
                         if (that.onPaging && typeof that.onPaging == "function") {
                             //더보기 Callback 전달
                         	that.$container.data("isLoading", true);
                         	that.updatePaging(tmplItemData);
                         	that.onPaging.call(this, tmplItemData);
                         }
                     //}
                     return false;
                 });

             	that.hitBottomAdd();
             } else if(that.pagingType == "pagination") {
             	that.$container.off(that.eventID).on("click" + that.eventID, "a", function(event) {
             		var $el = $(this);

             		if($el.hasClass("js_viewAll")) {
             			return true;
             		}

             		var pageCnt = $el.attr("data-page-cnt"),
                         tmplItemData = $el.tmplItem().data,
                         lastPageNum = Math.ceil(tmplItemData.total / tmplItemData.pageSize),
                         prevPageNum = tmplItemData.pageNum - 1,
                         nextPageNum = tmplItemData.pageNum + 1,
                         paginationInfo;

                     if($el.hasClass("page-first")) {
                         tmplItemData.pageNum = 1;
                     }
                     else if($el.hasClass("page-last")) {
                         tmplItemData.pageNum = lastPageNum;
                     }
                     else if($el.hasClass("page-prev")) {
                     	tmplItemData.pageNum = prevPageNum;
                     }
                     else if($el.hasClass("page-next")) {
                     	tmplItemData.pageNum = nextPageNum;
                     } else if(pageCnt) {
                         tmplItemData.pageNum = parseInt(pageCnt, 10);
                     }

                     paginationInfo = {
                     	type		 : that.pagingType,
                         pageNum      : tmplItemData.pageNum,
                         total        : tmplItemData.total,
                         pageSize     : tmplItemData.pageSize,
                         pageSkipSize : tmplItemData.pageSkipSize
                     };

                     if (that.onPaging && typeof that.onPaging == "function") {
                         //paging Callback 전달
                     	that.updatePaging(paginationInfo);
                         that.onPaging.call(this, paginationInfo);
                     }

                     return false;
                 });
             }
         },

         hitBottomOff: function() {
         	var that = this;

         	if(that.hitBottom) {
         		that.hitBottom.off();
         	}
         },

         hitBottomAdd: function() {
         	var that = this;

         	if(that.pagingType !== "more" || !that.autoMore ) {
         		if(that.hitBottom) {
         			that.hitBottom.off();
         		}
         		return;
         	}

         	if(!that.hitBottom) {
         		that.hitBottom = new s.HitBottom();
             	that.hitBottom.add(".hitbottom", function() {
             		if( !that.$container.data("isLoading") ) {
                 		that.$container.find("#js_paging").trigger("click");
             		}
             	}, 10);
         	}
         	that.hitBottom.on();
         },

         getPaginationData: function(pageNo, totalCnt, pageSize, pageSkipSize) {
             return (function(pageNum, totalCnt, pageSize, pageSkipSize) {
                 var i = 1,
                     pageGroup = pageNum - (pageNum % pageSkipSize || pageSkipSize),
                     paginationObj,
                     pageCnt,
                     pageTotalCnt = Math.ceil(totalCnt / pageSize);

                 paginationObj = {
                     pageGroup: pageGroup,
                     pageNum: pageNum,
                     total: totalCnt,
                     pageSize: pageSize,
                     pageSkipSize: pageSkipSize,
                     hideFirstBtn: pageNum <= 1,
                     hideLastBtn: pageNum >= pageTotalCnt,
                     hidePrevBtn: pageNum <= 1,
                     hideNextBtn: pageNum >= pageTotalCnt,
                     pageObj: []
                 };

                 for(; i <= pageSkipSize; i++) {
                     pageCnt = pageGroup + i;
                     if( pageCnt <= pageTotalCnt ) {
                         paginationObj.pageObj.push({
                             pageCnt: pageCnt,
                             active: pageCnt == pageNum
                         });
                     }
                 }
                 return paginationObj;
             })(pageNo, totalCnt, pageSize, pageSkipSize);
         },

         //더보기 버튼을 로딩 중 버튼으로 변경
         showMoreLoading : function () {
             var that = this,
             	$more = that.$container ? that.$container.find("nav") : that.$view.find("#js_paging"),
             	tmplItem = $more.tmplItem();

             tmplItem.data.loading = true;
             tmplItem.data.title = "loading";
             delete tmplItem.data.current;
             delete tmplItem.data.total;
             //tmplItem.update();
         },

         updatePaging: function(data) {
             var that = this,
             	pagingData = data;

             if( !data ) {
         		data = { type: "pagination", pageNum: 0, total: 0, pageSize: 0, pageSkipSize: 0, current: 0 };
         	}
             that.paginType = data.type || "pagination";

             if( that.pagingType == "pagination" ) {
             	$.extend(true, data, {
             		total: !data.total ? 0 : data.total,
             		pageSize: data.pageSize || 10,
             		pageSkipSize: data.pageSkipSize || 10
             	});
             	pagingData = that.getPaginationData(data.pageNum, data.total, data.pageSize, data.pageSkipSize);
             } else {
             	pagingData = {
             		type: "more",
         			total: data.total,
         			current: data.current,
         			pageNum: data.pageNum
             	};
             }
             that.pagingData = pagingData;
             that.update(pagingData);
         },

         hideMore : function () {
             var that = this;
             that.$view.hide();
         },

         update : function (data) {
             var that = this;
             that._super(data);

             //that._initEvent();
         },

         remove: function() {
         	var that = this;
         	that._super();

         	if(that.hitBottom) {
         		that.hitBottom.off();
         		delete that.hitBottom;
         	}
         }
     });

     if (ns) {
         ns.PagingView = PagingView;
     } else {
         w.PagingView = PagingView;
     }
 })(window, jQuery, b2, b2.View);


(function(w, $, pns, ns) {
	var that = ns;

	that.initPagingView = function(data) {
		var that = this,
            viewName = "PagingView",
            currentCnt, pageDataObject;

         if( !data ) {
             return;
         }

         viewName = data.name + viewName;
         pageDataObject = {
        	 type: data.type,
        	 pageSize: data.pageSize,
             pageSkipSize: data.pageSkipSize,
             pageNum: data.pageIdx || 1,
             total: data.totalCnt || null,
             current: $(data.container).find(">*").length || null
         };

         if(!that[viewName]) {
             that[viewName] = new pns.View.PagingView($.extend(true, {
                 type: data.type,
                 autoMore: data.type === "more" && data.autoMore === true ? true : false,
                 container: data.container,
                 onPaging: function(pagingData) {
                	 data.onPaging.call(that, pagingData);
                	 //alert(pagingData.pageNum);
                 }
             }, pageDataObject));
         } else {
             that[viewName].updatePaging(pageDataObject);
         }

         return that[viewName];
	};
})(window, jQuery, b2, b2.View);

/**
 * @fileOverview
 * @author Hongki Kim <redflaghk@sys4u.co.kr>
 * @version 0.1
 */
 (function (w, $, ns) {
    "use strict";
    /**
     * Storage Cache를 수행한다.
     * @class Storage Cache를 수행하기 위한 클래스이다.
     * @constructor 
     * @name b2.Storage
     * @param {object} options - 옵션 json
     */
    var Cache = Class.extend({
        storage: w.localStorage,

        init: function(options) {
            var that = this;

            that.storage = (function() {
                return w.localStorage;
            })();

            that._options = {
                //Cache 기본 prefix key 값 (Transaction Cache의 약어)
                prefixKey : "ILSHP_STORAGE_",
                //만료 시간 (단위 : Milliseconds)
                expireTime : 10 * 60 * 1000     //기본값은 10분
            };
            $.extend(true, that._options, options);
        },

        /**
         * 캐시된 값을 key값으로 부터 가져온다. <br>
         * 만료된 캐시인 경우 null 이나 undefined를 반환한다.
         * @memberOf b2.Storage
         * @param {string} key - 캐시된 값을 가져오기 위한 key 값
         * @returns {*}
         */
        get : function (key) {
            var that = this,
                item = $.parseJSON(that.storage.getItem(that._options.prefixKey + key)),
                isExpired = function(savedTime, expireTime) {
                    return (($.now() - savedTime) >= expireTime);               
                },
                tempItem = [];

            if (item) {
                $.each(item, function() {
                    if( !isExpired(this.savedTime, that._options.expireTime) ) {
                        tempItem.push(this.cachedData);
                    }
                });

                if( tempItem.length ) {
                    return tempItem;
                } else {
                    return null;
                }
            }
        },
        /**
         * 캐시에 저장한다.
         * @memberOf b2.Storage
         * @param {string} key - 캐시된 값을 가져오기 위한 key 값
         * @param {*} value - 캐시에 저장할 값
         */
        set : function (key, value) {
            var that = this,
                cachedInfo = $.parseJSON(that.storage.getItem(that._options.prefixKey + key)) || [],
                savedTime = $.now(),
                getItemObj = function(itemData) {
                    return {
                        savedTime : savedTime,
                        cachedData : itemData
                    };
                },
                tempItem = [];
 
            value = $.isArray(value) ? value : [value];
            // cached된 Data 중 입력받은 data와 중복되지 않은 cached data만 tempItem 에 push
            var cachedItem; 
            $.each(cachedInfo, function() {
                var isRedundancy = false; // 중복 여부

                cachedItem = this.cachedData;
                $.each(value, function() {
                    var inputItem = this;

                    if( JSON.stringify(cachedItem) == JSON.stringify(inputItem) ) {
                        isRedundancy = true;
                    }
                });
                if(!isRedundancy) {
                    tempItem.push(this);
                }
            });

            $.each(value, function() {
                tempItem.push(getItemObj(this));
            });

            that.storage.setItem(that._options.prefixKey + key, JSON.stringify(tempItem));
        },
        removeItem: function(key, itemKey, itemValue) {
            var that = this,
                item, index = -1,
                cachedInfo = $.parseJSON(that.storage.getItem(that._options.prefixKey + key)) || [];

            $.each(cachedInfo, function(idx) {
                item = this;
                if( item.cachedData[itemKey] == itemValue) {
                    item.savedTime = 0;
                }
            });
            that.storage.setItem(that._options.prefixKey + key, JSON.stringify(cachedInfo));
        },
        remove: function(key) {
            var that =  this;
            that.storage.removeItem(that._options.prefixKey + key);
        }
    });

    if (ns) {
        ns.Storage = Cache;
    } else {
        w.Storage = Cache;
    }
})(window, jQuery, b2);
 
 
 /**
  * @fileOverview
  * @author Hongki Kim
  * @version 0.1
  */

 (function (w, $, ns) {
     "use strict";

     /**
      * 정해진 만료 시간에 따라 캐시를 관리한다.
      * @namespace b2.Stroage
      */
     var Cache = {
         //localStorage, sessionStorage 중 선택하여 사용 (둘 중 하나로 고정하여 사용하는 것을 권장함.)
         storage : w.localStorage,

         options : {
             //Cache 기본 prefix key 값 (indo lotte shoping strogage의 약어)
             prefixKey : "ILSHP_STG_",
             //만료 시간 (단위 : Milliseconds)
             expireTime : 10 * 60 * 1000     //기본값은 10분
         },
         /**
          * 캐시된 값을 key값으로 부터 가져온다. <br>
          * 만료된 캐시인 경우 null 이나 undefined를 반환한다.
          * @memberOf b2.Storage
          * @param {string} key - 캐시된 값을 가져오기 위한 key 값
          * @returns {*}
          */
         get : function (key) {
             var item = $.parseJSON(this.storage.getItem(this.options.prefixKey + key));
             if (item) {
                 var isExpired = (($.now() - item.savedTime) >= this.options.expireTime);
                 if ( isExpired ) {
                     this.storage.removeItem(this.options.prefixKey + key);
                     return null;
                 } else {
                     return item.cachedData; 
                 }   
             }
         },

         /**
          * 캐시에 저장한다.
          * @memberOf b2.Storage
          * @param {string} key - 캐시된 값을 가져오기 위한 key 값
          * @param {*} value - 캐시에 저장할 값
          */
         set : function (key, value) {
             var item = {
                 savedTime : $.now(),
                 cachedData : value
             };
             this.storage.setItem(this.options.prefixKey + key, JSON.stringify(item));
         },

         /**
          * 캐시된 값을 삭제한다.
          * @memberOf b2.Storage
          * @param {string} key - 캐시된 값을 삭제 위한 key 값
          */
         remove : function (key) {
             this.storage.removeItem(this.options.prefixKey + key);
         },

         /**
          * 캐시된 값을 모두 삭제한다.
          * @memberOf b2.Storage
          */
         removeAll : function () {
             var key;
             if (this.isEmpty() === false) {
                 for (key in this.storage.storageObj()) {
                     if ( key.indexOf(this.options.prefixKey) > -1 ) {
                         this.storage.removeItem(key);
                     }
                 }
             }
         },

         /**
          * 캐시된 값이 존재하는지 여부를 확인한다.
          * @memberOf b2.Storage
          * @returns true or false
          */
         isEmpty : function () {
         	if( typeof this.storage.getLength !== "undefined" ) {
         		return this.storage.getLength() <= 0;
         	} else {
         		return true;
         	}
         }
     };

     if (ns) {
         ns.Cash = Cache;
     } else {
         w.Cash = Cache;
     }
 })(window, jQuery, b2);