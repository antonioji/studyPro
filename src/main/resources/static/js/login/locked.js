/**
 * locked javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var page = pns.PageClass.extend({
		init: function(options) {
			var that = this;

			that._options = {
				title: "로그인 실패",
				request: {

				}
			};

			that._super(that._options);
		},

		initEventListener: function() {//초기 이벤트 설정
			var that = this;
			that._super();
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


		},

		requestSUCCESS: function(reqID, response) {
			var that = this;
		}
	});

	$.createNamespace(pns, "Page");
	pns.Page[ns] = new page();
})(window, document, jQuery, b2, "locked");