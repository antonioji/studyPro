/**
 * easyRegistAccessTerms javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var page = pns.PageClass.extend({
		init: function(options) {
			var that = this;

			that._options = {
				title: "계정찾기",
				request: {///regist/registMemberInfo
					registMemberInfo : {
						
					}
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
			if($("#certificationScsCd").val() === "A"){
				var $custEmailAddr = $("#custEmailAddr").val();
				var $custNm = $("#custNm").val();
				
				var tempArr = $custEmailAddr.split("@");
				var emailId = tempArr[0];
				var emailIDLen = emailId.length;
				var maskEmailId = emailId.substring(0 , 3);
				for(var i = 3 ; i < emailIDLen ; i++){
						maskEmailId += "*";
				}
				$("#custEmailAddrSpan").html(maskEmailId+"@"+tempArr[1]);
				
				var maskCustNm = $custNm.substring(0,1);
				var custNmLen = $custNm.length;
				for(var i = 1 ; i < custNmLen ; i ++){
					maskCustNm += "*";
				}
				$("#custNmSpan").html(maskCustNm);
			}
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
})(window, document, jQuery, b2, "checkPhoneCertification");