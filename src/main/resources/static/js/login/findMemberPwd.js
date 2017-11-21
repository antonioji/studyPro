/**
 * loginForm javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var page = pns.PageClass.extend({
		init: function(options) {
			var that = this;
			that._options = {
				title: "비밀번호 찾기",
				request: {
					findPwdByEmailAddr : {
						url : env.serverContext + "login/findPwdByEmailAddr",
						method: "POST",
						async: true,
						reqData: {
							custEmailAddr : $("#custEmailAddr").val(),
							custNm:$("#custNm").val(),
							mccNoCd  : $("#mccNoCd").val(),
							custCellTxNo : $("#cellPhone").val(),//cellPhone의 앞 3~4자리
							custCellSprtlyNo : $("#cellPhone").val()//cellPhone의 뒤 4자리
						}
						
					},
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
			
			$("#findPwdForm").submit(function(){
				if($("#findPwdForm").valid()){
					var cellPhone = $("#cellPhone").val();
			    	var custCellSprtlyNo = cellPhone.substring((cellPhone.length - 4),cellPhone.length);
			    	var custCellTxNo = cellPhone.substring(0,(cellPhone.length - 4));
					that.requestDataSettings("findPwdByEmailAddr", {
						custEmailAddr : $("#custEmailAddr").val(),
						custNm:$("#custNm").val(),
						mccNoCd  : $("#mccNoCd").val(),
						custCellTxNo : custCellTxNo,//cellPhone의 앞 3~4자리
						custCellSprtlyNo : custCellSprtlyNo//cellPhone의 뒤 4자리
					});
					that.sendRequest("findPwdByEmailAddr");
					
				}
				return false;
			});
			
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
			if(reqID === "findPwdByEmailAddr") {
				console.log(response);
				if(response.certificationScsCd === "B"){
					$("#alertDiv").show();
					$("#alertLi").html("입력한 정보로 가입한 회원을 찾을수 없습니다.<br/>정보를 확인해주세요.");
				}else{
					$("#ocpnAthntSn").val(response.ocpnAthntSn);
					$("#alertDiv").hide();
					$("#alertEmailSendDiv").show();
					
					var $custEmailAddr = response.custEmailAddr ;
					var $athntTmntDttm = response.athntTmntDttm ;
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
					$("#athntTmntDttmSpan").html($athntTmntDttm.substring(0,$athntTmntDttm.length -6));
					
				}
				
			}else if(reqID === "reSendEmailCertification") {
				$("#ocpnAthntSn").val(response.ocpnAthntSn);
				var $athntTmntDttm = response.athntTmntDttm ;
				console.log($athntTmntDttm);
				$("#athntTmntDttmSpan").html($athntTmntDttm.substring(0,$athntTmntDttm.length -6));
				alert("인증 메일이 재 발송 되었습니다.");
			}
		},
		
		requestERROR : function(reqID, response){
			var that = this;
			if(reqID === "findPwdByEmailAddr") {
				
			}
		},
		
		initValidate: function() {
			var that = this,
			$findPwdForm = $("#findPwdForm"),
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
	
			$.validator.addMethod("custNmReg", function(value) {
				var hangleEx =/^[가-힣\s]/;
			   return hangleEx.test(value) ;
			});
			
			$.validator.addMethod("spaceCheck", function (value, element) {
				return $(element).val().indexOf(" ") == -1 ? true : false;
		  	});
			
			validate = $findPwdForm.validate($.extend(true, {}, defaultValidateOptions, {
				errorPlacement: function(error, element) {
					error.addClass("snote");
					error.insertAfter(element);
				},
				rules: {
					custEmailAddr: {
						required: true,
						email: true,
						validateEmail: true
					},
					custNm: {
						required: true,
						minlength : 2,
						custNmReg : true,
						spaceCheck : true
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
					custEmailAddr: {
						required: "이메일을 입력해 주세요.",
						email: "유효하지 않은 E-Mail주소입니다.",
						validateEmail: "유효하지 않은 E-Mail주소입니다."
					},
					custNm: {
						required: "이름을 입력해 주세요.",
						minlength : "두자 이상 입력해 주세요.",
						custNmReg : "한글만 입력 가능합니다.",
						spaceCheck : "공백은 입력할 수 없습니다."
						
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
			$findPwdForm.data("validate", validate);
		}
	});

	$.createNamespace(pns, "Page");
	pns.Page[ns] = new page();
})(window, document, jQuery, b2, "findMemberPwd");