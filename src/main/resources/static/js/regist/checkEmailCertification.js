/**
 * easyRegistAccessTerms javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var page = pns.PageClass.extend({
		init: function(options) {
			var that = this;

			that._options = {
				title: "이메일 점유인증 체크 화면",
				request: {///regist/registMemberInfo
					registMemberInfo : {
						url : env.serverContext + "regist/registMemberInfo",
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
			$("#btnContinuedToRegister").click(function(){//계정 생성 
				that.requestDataSettings("registMemberInfo", {
					ocpnAthntSn:$("#ocpnAthntSn").val()
				});
				that.sendRequest("registMemberInfo");
				//window.location.href =  env.serverContext + "regist/member";//다음화면이동
			});

			$("#btnConfrim").click(function(){//
				window.location.href =  env.serverContext + "login/form";//휴대폰 인증화면?
			});

			$("#btnReregist").click(function(){//
				window.location.href =  env.serverContext + "regist/memberRegistForm";//
			});

			$("#btnGoLogin").click(function(){//
				window.location.href =  env.serverContext + "login/form";
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
			if(reqID === "registMemberInfo") {
				window.location.href =  env.serverContext + "regist/memberRegistFinished";
			}

		}
	});

	$.createNamespace(pns, "Page");
	pns.Page[ns] = new page();
})(window, document, jQuery, b2, "checkEmailCertification");