/**
 * loginForm javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var page = pns.PageClass.extend({
		init: function(options) {
			var that = this;
			that._dayCount = 0,
			that._options = {
				title: "계정 찾기",
				request: {
					sendCertificationBySms : {
						url : env.serverContext + "regist/sendCertificationBySms",
						method: "POST",
						async: true,
						reqData: {
							custNm:$("#custNm").val(),
							mccNoCd  : $("#mccNoCd").val(),
							custCellTxNo : $("#cellPhone").val(),//cellPhone의 앞 3~4자리
							custCellSprtlyNo : $("#cellPhone").val(),//cellPhone의 뒤 4자리
							athntMediaTypeCd : $("#athntMediaTypeCd").val(),
							athntPurpsDvsCd : $("#athntPurpsDvsCd").val()
						}
						
					},checkCertificationBySms : {
						url : env.serverContext + "regist/checkCertificationBySms",
						method: "POST",
						async: true,
						reqData: {
							custNm:$("#custNm").val(),
							mccNoCd  : $("#mccNoCd").val(),
							custCellTxNo : $("#cellPhone").val(),//cellPhone의 앞 3~4자리
							custCellSprtlyNo : $("#cellPhone").val(),//cellPhone의 뒤 4자리
							athntMediaTypeCd : $("#athntMediaTypeCd").val(),
							athntPurpsDvsCd : $("#athntPurpsDvsCd").val(),
							athntMediaTgtVal : $("#athntMediaTgtVal").val(),
							ocpnAthntSn : $("#ocpnAthntSn").val()
						}
						
					}
				}
			};

			that._super(that._options);


		},

		initEventListener: function() {//초기 이벤트 설정
			var that = this;
			that._super();
			
			$("#sendSMS").click(function(){
				if(b2.Page.findMemberId._dayCount < 11){
					$("#athntMediaTgtVal").addClass("ignore");
					if($("#findIdForm").valid()){
						var cellPhone = $("#cellPhone").val();
				    	var custCellSprtlyNo = cellPhone.substring((cellPhone.length - 4),cellPhone.length);
				    	var custCellTxNo = cellPhone.substring(0,(cellPhone.length - 4));
						that.requestDataSettings("sendCertificationBySms", {
				    		custNm:$("#custNm").val(),
							mccNoCd  : $("#mccNoCd").val(),
							custCellTxNo : custCellTxNo,//cellPhone의 앞 3~4자리
							custCellSprtlyNo : custCellSprtlyNo,//cellPhone의 뒤 4자리
							athntMediaTypeCd : $("#athntMediaTypeCd").val(),
							athntPurpsDvsCd : $("#athntPurpsDvsCd").val()
						});
						that.sendRequest("sendCertificationBySms");
					}
				}else{
					$("#findIdForm").valid();
					$("#athntMediaTgtVal-error").html("일 인증번호 발송 횟수가 초과되었습니다. 내일 다시 시도해주세요.");
					$("#athntMediaTgtVal-error").show();
					
				}
		    	return false;
			});
			
			$("#reSendSMS").click(function(){
				if(b2.Page.findMemberId._dayCount < 11){
					$("#athntMediaTgtVal").addClass("ignore");
					if($("#findIdForm").valid()){
						var cellPhone = $("#cellPhone").val();
				    	var custCellSprtlyNo = cellPhone.substring((cellPhone.length - 4),cellPhone.length);
				    	var custCellTxNo = cellPhone.substring(0,(cellPhone.length - 4));
						that.requestDataSettings("sendCertificationBySms", {
				    		custNm:$("#custNm").val(),
							mccNoCd  : $("#mccNoCd").val(),
							custCellTxNo : custCellTxNo,//cellPhone의 앞 3~4자리
							custCellSprtlyNo : custCellSprtlyNo,//cellPhone의 뒤 4자리
							athntMediaTypeCd : $("#athntMediaTypeCd").val(),
							athntPurpsDvsCd : $("#athntPurpsDvsCd").val()
						});
						that.sendRequest("sendCertificationBySms");
					}
				}else{
					$("#findIdForm").valid();
					$("#athntMediaTgtVal-error").html("일 인증번호 발송 횟수가 초과되었습니다. 내일 다시 시도해주세요.");
					$("#athntMediaTgtVal-error").show();
					
				}
		    	return false;
			});
			
			
			$("#findIdForm").submit(function(){
				$("#athntMediaTgtVal").removeClass("ignore");
				if($("#findIdForm").valid()){
					var cellPhone = $("#cellPhone").val();
			    	var custCellSprtlyNo = cellPhone.substring((cellPhone.length - 4),cellPhone.length);
			    	var custCellTxNo = cellPhone.substring(0,(cellPhone.length - 4));
					that.requestDataSettings("checkCertificationBySms", {
			    		custNm:$("#custNm").val(),
						mccNoCd  : $("#mccNoCd").val(),
						custCellTxNo : custCellTxNo,//cellPhone의 앞 3~4자리
						custCellSprtlyNo : custCellSprtlyNo,//cellPhone의 뒤 4자리
						athntMediaTypeCd : $("#athntMediaTypeCd").val(),
						athntPurpsDvsCd : $("#athntPurpsDvsCd").val(),
						athntMediaTgtVal : $("#athntMediaTgtVal").val(),
						ocpnAthntSn : $("#ocpnAthntSn").val()
					});
					that.sendRequest("checkCertificationBySms");
					
				}
				return false;
			});
		},

		pageBeforeShow: function() {
			var that = this;
			that._super();
			$(".numeric").numeric();   //이렇게 하면 영문은 입력안되고 숫자만 입력된다(단, 한글도 입력된다는거)
	        $(".numeric").css("ime-mode", "disabled");  //요렇게 하면 한글도 잡아준다

			that.initValidate();
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
			if(reqID === "sendCertificationBySms") {
				console.log(response);
				that._dayCount = response.dayCount;
				if(that._dayCount < 11){
					$("#sendSMS").hide();
					$("#reSendSMS").show();
					$("#athntMediaTgtVal").removeClass("ignore");
					$("#findIdForm").valid()
					$("#athntMediaTgtVal-error").html("인증번호를 발송하였습니다.");
					$("#athntMediaTgtVal-error").show();
					$("#ocpnAthntSn").val(response.ocpnAthntSn);
					$("#custNm").attr("readonly", true);
					$("#mccNoCd").attr("readonly", true);
					$("#cellPhone").attr("readonly", true);
				}else{
					$("#athntMediaTgtVal").removeClass("ignore");
					$("#findIdForm").valid()
					$("#athntMediaTgtVal-error").html("일 인증번호 발송 횟수가 초과되었습니다. 내일 다시 시도해주세요.");
					$("#athntMediaTgtVal-error").show();
				}
			}else if(reqID === "checkCertificationBySms"){
				window.location.href =  env.serverContext +	"login/checkPhoneCertification";
			}
		},
		
		requestERROR : function(reqID, response){
			var that = this;
			if(reqID === "sendCertificationBySms") {
				$("#athntMediaTgtVal").removeClass("ignore");
				$("#findIdForm").valid()
				$("#athntMediaTgtVal-error").html("인증번호 발송에 실패하였습니다. 휴대폰 번호를 확인해주세요.");
				$("#athntMediaTgtVal-error").show();
			}else if(reqID === "checkCertificationBySms"){
				$("#athntMediaTgtVal").removeClass("ignore");
				$("#findIdForm").valid()
				$("#athntMediaTgtVal-error").html(response.devMessage);
				$("#athntMediaTgtVal-error").show();
			}
		},
		
		initValidate: function() {
			var that = this,
			$findIdForm = $("#findIdForm"),
			validate;

			var defaultValidateOptions = {
				errorClass: "error",
				errorElement: "p",
				errorPlacement: function(error, element) {
					error.addClass("snote");
					error.insertAfter(element);
				},
				submitHandler: function(form) {
					form.submit();
				},
				ignore: ".ignore"

			};

			$.validator.addMethod("pattern", function(value, element) {
				return (this.optional(element) || new RegExp(element.pattern).test(value));
			}, "Invalid input entered.");
	
			
			validate = $findIdForm.validate($.extend(true, {}, defaultValidateOptions, {
				errorPlacement: function(error, element) {
					error.addClass("snote");
					error.insertAfter(element);
				},
				rules: {
					custNm: {
						required: true,
						minlength : 2
					},
					cellPhone : {
						required: true,
						minlength : 7 ,
						number : true
					},
					athntMediaTgtVal : {
						required: true,
						number : true
					}
				},
				messages:  {
					custNm: {
						required: "이름을 입력해 주세요.",
						minlength : "두자 이상 입력해 주세요."
						
					},
					cellPhone : {
						required: "휴대폰번호를 입력해주세요.",
						minlength : "최소 7자 이상 입력해주세요." ,
						number : "숫자만 입력 가능합니다."
					},
					athntMediaTgtVal : {
						required: "인증번호 입력을 입력해주세요.",
						number : "숫자만 입력 가능합니다."
					}
				},
				submitHandler: function(form) {
	
				}, 
				onfocusout: function(element) {
		            this.element(element);
		        }
			}));
			$findIdForm.data("validate", validate);
		}
	});

	$.createNamespace(pns, "Page");
	pns.Page[ns] = new page();
})(window, document, jQuery, b2, "findMemberId");