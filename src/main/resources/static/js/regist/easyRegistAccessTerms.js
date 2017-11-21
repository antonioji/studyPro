/**
 * easyRegistAccessTerms javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var page = pns.PageClass.extend({
		init: function(options) {
			var that = this;

			that._options = {
				title: "간편 가입 계정 생성 화면",
				request: {

				}
			};

			that._super(that._options);
		},

		initEventListener: function() {//초기 이벤트 설정
			var that = this;
			that._super();

			$("#refuseToCollectInfo").click(function(){
				var result = confirm("개인정보 수집 및 이용 동의에 거부하시겠습니까?");
				if(result){
					window.location.href =  env.serverContext+"loginForm";
				}else{
					return false;
				}
			});

			$("#btnAgree").click(function(){
					if($("#info_chk1").is(":checked")){
						window.location.href =  env.serverContext + "regist/memberRegistForm";
					}else{
						alert("만 14세 이상 확인이 필요합니다.");
						return false;
					}

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
})(window, document, jQuery, b2, "easyRegistAccessTerms");