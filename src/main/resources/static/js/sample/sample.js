/**
 * loginForm javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var page = pns.PageClass.extend({
		init: function(options) {
			var that = this;

			that._options = {
				title: "샘플 화면",
				request: {
					aaaa: {
						url: CONSTANTS.baseUrl + "api/me/myaccount/getSimpleLoginAccountList",
						method: "POST",
						async: true,
						reqData: {
							aaa: "fdsfsd",
							bbbb: "gfsdagsd"
						}
					},
					bbbb: {
						url: CONSTANTS.baseUrl + "api/me/myaccount/getLinkedAccountList",
						method: "POST",
						async: true,
						reqData: {
						}
					}
				}
			};

			that._super(that._options);
		},

		initEventListener: function() {//초기 이벤트 설정
			var that = this;
			that._super();
			
			//layer popup open
			$("#aaa").click(function(){
				that.linkedAccountAddLayerPopup.openLayer({
					parent: that,
					param: ""
				});
			});
			
			
		},

		pageBeforeShow: function() {
			var that = this;
		},

		onChangeURI: function(pageData) {
			var that = this;
			that._super();
		},

		pageShow: function(pageData) {
			var that = this;
			that._super();

			that.requestDataSettings("aaaa", {
				aaa: pageData.data.aaa
			});
			that.sendRequest("aaaa", function(response) {
				alert(JSON.stringify(response));
			});
			
			//layer popup 사용시 init
			that.initLinkedAccountAddLayerPopup();
		},

		requestSUCCESS: function(reqID, response) {
			var that = this;

			if(reqID === "aaaa") {
				if(response.succeeded === true) {
					alert(JSON.stringify(response));
				}
			} else if(reqID === "bbbb") {
				if(response.succeeded === true) {
					alert(JSON.stringify(response));
				}
			}
		},
		//layerpopup sample
		initLinkedAccountAddLayerPopup: function() {
			var that = this,
				layerPageID = "linkedAccountAddLayerPopup",
				layerPageUrl = CONSTANTS.baseUrl + "static-root/js/me/mypage/accountManagement.linkedAccountAddLayerPopup.js";

			if(!that[layerPageID]) {
				$.getScript(layerPageUrl).done(function() {
					that[layerPageID] = pns.LayerPopup[layerPageID];
				});
			}
		}
	});

	$.createNamespace(pns, "Page");
	pns.Page[ns] = new page();
})(window, document, jQuery, b2, "sample");