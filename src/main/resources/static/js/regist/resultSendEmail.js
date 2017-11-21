/**
 * easyRegistAccessTerms javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var page = pns.PageClass.extend({
		init: function(options) {
			var that = this;

			that._options = {
				title: "간편가입계정 인증",
				request: {
					reSendEmailCertification : {
						url : env.serverContext + "regist/reSendEmailCertification",
						method: "POST",
						async: true,
						reqData: {
							ocpnAthntSn:$("#ocpnAthntSn").val()
						}
						
					}
				}
			};

			that._super(that._options);
		},

		initEventListener: function() {//초기 이벤트 설정
			var that = this;
			that._super();
			$("#btnResend").click(function(){
				that.requestDataSettings("reSendEmailCertification", {
					ocpnAthntSn:$("#ocpnAthntSn").val()
				});
				that.sendRequest("reSendEmailCertification");
				return false;
			});
		},

		pageBeforeShow: function() {
			var that = this;
			
			var $custEmailAddr = $("#custEmailAddr").val();
			var $athntTmntDttm = $("#athntTmntDttm").val();
			//$mbMbrOcpnAthnt.custEmailAddr
			console.log($custEmailAddr);
			var tempArr = $custEmailAddr.split("@");
			var emailId = tempArr[0];
			var emailIDLen = emailId.length;
			var maskEmailId = emailId.substring(0 , 3);
			for(var i = 3 ; i < emailIDLen ; i++){
					maskEmailId += "*";
			}
			$("#custEmailAddrSpan").html(maskEmailId+"@"+tempArr[1]);
			//$mbMbrOcpnAthnt.athntTmntDttm
			console.log($athntTmntDttm);
			$("#athntTmntDttmSpan").html($athntTmntDttm.substring(0,$athntTmntDttm.length -5));
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
			if(reqID === "reSendEmailCertification") {
				$("#ocpnAthntSn").val(response.ocpnAthntSn);
				alert("인증 메일이 재 발송 되었습니다.");
			}
		}
	});

	$.createNamespace(pns, "Page");
	pns.Page[ns] = new page();
})(window, document, jQuery, b2, "resultSendEmail");