/**
 * common utility script
 *
 * defined function
 * - console.log, info, warn, error
 * - namesapce
 * - realgrid
 */

var console = window.console || {
	log : function() {
	},
	info : function() {
	},
	warn : function() {
	},
	error : function() {
	}
};

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


$.namespace("b2.common.Util");
b2.common.Util = {
	winOpen: function(options) {
		  var form = document.createElement("form"),
		  	  csrfToken = $("[name=_csrf]").eq(0).val(), //$("[name=csrf-token]").attr("content"),
		  	  input = null;

		  form.action = options.url;
		  form.method = options.method;
		  form.target = options.target || "_self";

		  var formAppendChild = function(data) {
		      input = document.createElement("textarea");
		      input.name = data.key;
		      input.value = data.value;
		      form.appendChild(input);
		  };

		  formAppendChild({
			  key: "_csrf",
			  value: csrfToken
		  });

		  if (options.data) {
		    for (var key in options.data) {
		      formAppendChild({
		    	  key: key,
		    	  value: typeof options.data[key] === "object" ? JSON.stringify(options.data[key]) : options.data[key]
		      });
		    }
		  }

		  form.style.display = 'none';
		  document.body.appendChild(form);
		  form.submit();

		  setTimeout(function() {
			  $(form).remove();
		  }, 800);
	},
	winNewOpen: function(options) {
		var form = document.createElement("form"),
			csrfToken = $("[name=_csrf]").eq(0).attr("value"), //$("[name=csrf-token]").attr("content"),
			input = null,
			popupWindow = null;

		form.action = options.url;
		form.method = options.method;

		if(options.targetwinname) {
			form.target = options.targetwinname;
		} else {
			form.target = options.target || "_self";
		}

		var formAppendChild = function(data) {
			input = document.createElement("textarea");
			input.name = data.key;
			input.value = data.value;
			form.appendChild(input);
		};

		formAppendChild(window.pageEnv.csrf);

		if (options.data) {
			for (var key in options.data) {
				formAppendChild({
					key: key,
					value: typeof options.data[key] === "object" ? JSON.stringify(options.data[key]) : options.data[key]
				});
			}
		}

		form.style.display = 'none';
		document.body.appendChild(form);

		if(options.targetwinname) {
			popupWindow = window.open("about:blank", options.targetwinname, options.windowoptions || 'width=620,height=690');
		}

		form.submit();

		setTimeout(function() {
			popupWindow = popupWindow || {};
			popupWindow.callBack = options.callBack || function() {};
			$(form).remove();
		}, 800);

		return popupWindow;
	},
	dimmed : {
		selector: ".dimmed",
		$dimmed: $(".dimmed"),
		show: function() {
			var that = this;
			that.$dimmed = that.$dimmed.length > 0 ? that.$dimmed : $(that.selector);

			that.$dimmed.stop().fadeTo(500, 0.35);
		},
		hide: function() {
			var that = this;
			that.$dimmed = that.$dimmed.length > 0 ? that.$dimmed : $(that.selector);

			that.$dimmed.stop().fadeTo(500, 0, function() {
				$(this).hide();
			});
		}
	},
	
	/**
	 * element id 와 type (yyyy , mm ,dd) 을 받아서 이에 셋팅을 해주는 util  
	 * */
	setSelectBoxByType : function(id , type){
		if(id === undefined || type === undefined) return false;
		if(type === "yyyy"){// 년도 현 시점부터 110년전까지
			var dt = new Date();
			var year = dt.getFullYear();
			var pastEnd = year - 111;
			for(var i = year ; i >  pastEnd ; i--){
				$("#"+id).append("<option value='"+i+"'>"+i+"</option>");
			}
		}else if(type === "mm"){//1 ~ 12
			for(var i = 1 ; i <  13 ; i++){
				if(i < 10){
					$("#"+id).append("<option value='0"+i+"'>"+i+"</option>");
				}else{
					$("#"+id).append("<option value='"+i+"'>"+i+"</option>");
				}
			}
		}else if(type === "dd"){//1 ~ 31
			for(var i = 1 ; i <  32 ; i++){
				if(i < 10){
					$("#"+id).append("<option value='0"+i+"'>"+i+"</option>");
				}else{
					$("#"+id).append("<option value='"+i+"'>"+i+"</option>");
				}
			}
		}
		
		
	}
};



/**
 * @fileOverview
 * @author Hongki, Kim
 * @version 0.1
 * @description 
 *   URI 처리를 위한 파일
 */

(function (w, $, ns) {
// Whole-script strict mode syntax
"use strict";

var log = w.console.log;

/**
 * URI 처리를 위한 함수들
 * @namespace b2.common.Util.URI
 */
var URI = {
    /**
     * URI를 파싱하여 리턴 한다.
     * @name b2.common.Util.URI#parseURI
     * @function
     * @param  {string} url URL 정보 없으면 현재 URL이 적용됨.
     * @return {object} 파싱된 URL Object
     *  <pre>
     *    .href       전체 URL ( http://localhost/test#page/num?item=1&num=2 )
     *    .hrefNoHash 해쉬를 제외한 URL 정보 ( http://localhost/test )
     *    .hash       해쉬 URL 만 출력된다 ( page/num )
     *    .data       파싱된 데이터 json ( { item: 1, num: 2 } )
     *  </pre>
     */
    parseURI: function( url ) {
        var URIInfo = {
            urlParseRE: /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
            getLocation: function( url ) {
                var uri = url ? this.parseUrl( url ) : location,
                    hash = this.parseUrl( url || location.href ).hash;
                hash = hash === "#" ? "" : hash;
                return uri.protocol + "//" + uri.host + uri.pathname + uri.search + hash;
            },
            parseUrl: function( url ) {
                if ( $.type( url ) === "object" ) {
                    return url;
                }
                var matches = this.urlParseRE.exec( url || "" ) || [];
                return {
                    protocol:     matches[  4 ] || "",
                    host:         matches[ 10 ] || "",
                    pathname:     matches[ 13 ] || "",
                    search:       matches[ 16 ] || "",
                    hash:         matches[ 17 ] || ""
                };
            },
            cleanHash: function( hash ) {
                return hash.replace( /\?.*$/, "" ).replace( "&ui-state=dialog", "" ).replace( /^#/, "" );
            }
        };

        var uri = { href: url || document.location.href };
        var parserURI = URIInfo.parseUrl( uri.href );
        var location_hash = parserURI.hash.replace("#", "") || "";
        if ( location_hash.length === 0 && parserURI.search.length > 0 ) {
            location_hash = parserURI.search;
        }
        var indexSplitHash = location_hash.indexOf("?");

        uri.hrefNoHash = parserURI.hrefNoHash;

        if ( indexSplitHash >= 0 ) {
            uri.hash = location_hash.substr(0, indexSplitHash).toLowerCase();
            var hashes = location_hash.slice(indexSplitHash + 1).split("&");
            var jsonData = {};
            for(var i = 0; i < hashes.length; i++) {
                var hash = hashes[i].split("=");
                if ( hash.length == 2 ) {
                    var value = decodeURIComponent( hash[1] );
                    value = value === "true" ? true : value;
                    value = value === "false" ? false : value;
                    jsonData[ hash[0] ] = value;
                }
            }
            uri.data = jsonData;
        } else {
            uri.hash = location_hash ? location_hash.toLowerCase() : "";
            uri.data = {};
        }
        return uri;
    },
    /**
     * URI 파싱한 오브젝트를 URI String으로 바꿔 리턴 한다.
     * @name b2.common.Util.URI#convertURIString
     * @function
     * @param {string} URI parseURI로 파싱한 데이터
     * @param {boolean} not_hashonly true이면 전체 URL 정보, 아니면 hash URL만 적용. Default는 false.
     * @return {string} 바뀐 String 정보. 없으면 null 리턴.
     */
    convertURIString: function( uriObj, not_hashonly ) {
        if ( uriObj && uriObj.hrefNoHash ) {
            var indexHash = uriObj.hrefNoHash.indexOf("?");
            var hrefNoHash = uriObj.hrefNoHash;
            if ( indexHash >= 0 ) {
                hrefNoHash = uriObj.hrefNoHash.substr(0, indexHash);
            }

            var strURI = hrefNoHash + "#" + uriObj.hash;
            if ( !not_hashonly ) {
                strURI = "#" + uriObj.hash;
            }

            var dataStr = this.dataToURI( uriObj.data );
            if ( dataStr.length > 0 ) {
                strURI += "?" + dataStr;
            }
            return strURI;
        }
        return null;
    },
    /**
     * uri string에서 data를 적용하여 URI string을 리턴한다.
     * @function
     * @name b2.common.Util.URI#convertURI
     * @param  {string} uri - URI 정보
     * @param  {object} json - data json 정보
     * @return {string} 변환된 URI 정보
     */
    convertURI: function( uri, json ) {
        var parseURI = this.parseURI( uri );
        var strURI = "#" + parseURI.hash;
        var dataStr = this.dataToURI( json );
        if ( dataStr.length > 0 ) {
            strURI += "?" + dataStr;
        }
        return strURI;
    },
    /**
     * json data 정보를 URI parameter string으로 바꿔 리턴.
     * @name b2.common.Util.URI#dataToURI
     * @function
     * @param  {object} json data json 정보
     * @return {string} URI Parameter 로 바꿔 string 으로 리턴.
     */
    dataToURI: function( json ) {
        var uri = "";
        if ( typeof(json) == "object" && Object.keys(json).length > 0 ) {
            // json data를 parameter로 변경 적용.
            for ( var i in json ) {
                // false 가 있어 undefined 체크해야 함.
                if ( typeof(json[i]) != "undefined" ) {
                    var str = i + "=" + encodeURIComponent( json[i] );
                    uri += str + "&";
                }
            }
            uri = uri.substr(0, uri.length -1);
        }
        return uri;
    },
    /**
     * parameter문자를 json data로 바꿔 리턴
     * @name b2.common.Util.URI#paramToData
     * @function
     * @param {string} uriParam - uri parameter string 정보
     * @retrun
     */
    paramToData: function( uriParam ) {
        uriParam = uriParam || "";

        var hashes = uriParam.split("&"),
           jsonData = {}, i = 0,
           leng = hashes.length,
           hash, value;

        for(; i < leng; i++) {
            hash = hashes[i].split("=");
            if ( hash.length === 2 ) {
                value = decodeURIComponent( hash[1] );
                value = value === "true" ? true : value;
                value = value === "false" ? false : value;
                jsonData[ hash[0] ] = jsonData[ hash[0] ] ? jsonData[ hash[0] ] + "," + value : value;
            }
        }

        return jsonData;
    }
};

if (ns) {
    ns.URI = URI;
} else {
    w.URI = URI;
}

})(this, jQuery, b2.common.Util);


/**
 * Front form validate message processing function
 */
(function(w, $, ns) {
	"use strict";

	var formValidate = {
		getRandomID: function () {
	         var timeStamp = new Date().getTime(),
	            randomStr = (Math.floor(Math.random() * timeStamp)).toString();

	         return randomStr;
        },

		createSnote: function($input, $container) {
			var that = this,
				$snote = ($container || $input).next(".snote.error"),
				isSnote = $snote.length > 0,
				id = $input.attr("id"),
				snoteClass = "";

			$container = $container || $input;

			if(!id) {
				id = that.getRandomID();
				$input.attr("id", id);
			}

			snoteClass = "snote_" + id;
			if(!isSnote) {
				$container.after('<p class="snote error ' + snoteClass + '" style="display:none;"></p>');
				$snote = $container.next("." + snoteClass);
			} else {
				$snote.addClass('snote_' + id);
			}

			return $snote;
		}
	};

	$.fn.validateMessage = function(visible, message, $container) {
		var $input = $(this),
			$snote = formValidate.createSnote($input, $container);

		if(message) {
			$snote.html(message);
		}

		$input.toggleClass("error", visible);
		if(visible) {
			$snote.show();
		} else {
			$snote.hide();
		}
	};
	
	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};

	$.fn.custSerialize = function() {
	    var obj = {},
	    	that = this,
	        paramStr = "",
	        seriallizeObj = that.serializeObject();

	    $.each(seriallizeObj, function(key, value) {
	        obj[key] = value;
	    });
	    paramStr = b2.common.Util.URI.dataToURI(obj);

	    return paramStr;
	};

	$.validator.addMethod("validatePassword", function(value) {
	   return /^(?=.*\D)(?=.*\d).{10,16}$/.test(value);
	});
	
	$.validator.addMethod("validateEmail", function(value) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(value);
	});

})(window, jQuery);

String.prototype.addZero = function(digit) {
	var i = 0, length = this.length,addStr = "";

	digit = length === 1 ? 2 : length;

	digit = digit || length;
	digit = digit < length ? length : digit;

	for(;i < digit; i++) {
		addStr += "0";
	}

	return (addStr + this).substr(digit * -1, digit);
};

Number.prototype.addZero = function(digit) {
	return String(this).addZero(digit);
};

Date.prototype.timeToFormat = function(timePieces) {
	var hours = this.getHours().toString().addZero(),
		minutes = this.getMinutes().toString().addZero(),
		seconds = this.getSeconds().toString().addZero(),
		time;

	timePieces = timePieces === undefined ? ":" : timePieces;

	time = hours + timePieces + minutes;

	return time;
};

Date.prototype.dateToFormat = function(reverse, datePieces) {
	var year = this.getFullYear(),
		month = (this.getMonth() + 1).toString().addZero(),
		day = this.getDate().toString().addZero(),
		date;

	datePieces = datePieces === undefined ? "/" : datePieces;

	if(reverse === true) {
		date = day + datePieces + month + datePieces + year;
	} else {
		date = year + datePieces + month + datePieces + day;
	}
	return date;
};

Date.prototype.dateTimeToFormat = function(reverse, datePieces, timePieces) {
	var year = this.getFullYear(),
		month = (this.getMonth() + 1).toString().addZero(),
		day = this.getDate().toString().addZero(),
		hours = this.getHours().toString().addZero(),
		minutes = this.getMinutes().toString().addZero(),
		seconds = this.getSeconds().toString().addZero(),
		date;

	datePieces = datePieces === undefined ? "/" : datePieces;
	timePieces = timePieces === undefined ? ":" : timePieces;

	if(reverse === true) {
		date = day + datePieces + month + datePieces + year + " " + hours + timePieces + minutes + timePieces + seconds;
	} else {
		date = year + datePieces + month + datePieces + day + " " + hours + timePieces + minutes + timePieces + seconds;
	}


	return date;
};

$.fn.display = function(isShow) {
	var $el = $(this);

	if(isShow) {
		$el.show();
	} else {
		$el.hide();
	}
};
