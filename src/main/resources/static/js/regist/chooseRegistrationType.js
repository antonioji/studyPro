/**
 * chooseRegistrationType javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var page = pns.PageClass.extend({
		init: function(options) {
			var that = this;

			that._options = {
				title: "회원가입 유형 선택",
				request: {

				}
			};

			that._super(that._options);
		},

		initEventListener: function() {//초기 이벤트 설정
			var that = this;
			that._super();



			$("#btnLpointRegist").on("click", function() {
				alert("준비중입니다.");
			});


			$("#btnMemberRegist").on("click", function(){
				window.location.href =  env.serverContext + "regist/memberRegistForm";//다음화면이동
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


		},

		requestSUCCESS: function(reqID, response) {
			var that = this;


		}
	});

	$.createNamespace(pns, "Page");
	pns.Page[ns] = new page();
})(window, document, jQuery, b2, "chooseRegistrationType");