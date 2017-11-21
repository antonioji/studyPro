/**
 * memberchangePwdForm javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var page = pns.PageClass.extend({
		init: function(options) {
			var that = this;

			that._options = {
				title: "비밀번호 재설정",
				request: {
					changePwdByCustEmailAddr : {
						url : env.serverContext + "login/changePwdByCustEmailAddr",
						method: "POST",
						async: true,
						reqData: {
							custEmailAddr: $("#custEmailAddr").val(),
							mbrLoginPwd : $("#mbrLoginPwd").val()
						}
						
					}
				}
			};
			that._super(that._options);
		},

		initEventListener: function() {//초기 이벤트 설정
			var that = this;
			that._super();
		    
		    $("#changePwdForm").submit(function(){
		    	if($("#changePwdForm").valid()){
			    	that.requestDataSettings("changePwdByCustEmailAddr", {
						custEmailAddr: $("#custEmailAddr").val(),
						mbrLoginPwd : $("#mbrLoginPwd").val()
					});
					that.sendRequest("changePwdByCustEmailAddr");
		    	}
		    	return false;
		    });
			
		},

		pageBeforeShow: function() {
			var that = this;
			that._super();
			that.initValidate();


		},

		onChangeURI: function(pageData) {
			var that = this;
			that._super();
		},

		pageShow: function(pageData) {
			var that = this;
			that._super();
			b2.common.Util.setSelectBoxByType("bdYear" , "yyyy");//년 selectbox set
			b2.common.Util.setSelectBoxByType("bdMonth" , "mm");//월selectbox set
			b2.common.Util.setSelectBoxByType("bdDate" , "dd");//일  selectbox set
		},
		
		requestSUCCESS: function(reqID, response) {
			var that = this;
			if(reqID === "changePwdByCustEmailAddr") {
				console.log(response);
				if(response.result === "Y"){
					alert("비밀번호 변경에 성공하였습니다.\n다시 로그인하여 안전하게 쇼핑하세요.");
					window.location.href =  env.serverContext +	"login/form";
				}
			}
			
		}
		
		,initValidate: function() {
			var that = this,
				$changePwdForm = $("form[name=changePwdForm]"),
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
				}
			};

			$.validator.addMethod("pattern", function(value, element) {
				return (this.optional(element) || new RegExp(element.pattern).test(value));
			}, "Invalid input entered.");

			
			$.validator.addMethod("passwordReg01", function(value) {
			   return /^(?=.*[A-Za-z])(?=.*?[0-9])(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/.test(value);
			});
			
			$.validator.addMethod("passwordReg02", function(value) {
				var regEx02 = /(\w)\1{3,}/;
			   return  regEx02.test(value) == true ? false : true;
			});
			
			$.validator.addMethod("passwordReg03", function(value) {
				var regEx = /[&<>"']/;
			   return regEx.test(value) == true ? false : true;
			});
			
			$.validator.addMethod("passwordReg04", function(value) {
				var result = false;
				if($("#custEmailAddr").val() !== ""){
					var tempArr = $("#custEmailAddr").val().split("@");
					var emailID = tempArr[0];
					if(emailID === value){
						result = true;
					}
				}
			   return result;
			});

			validate = $changePwdForm.validate($.extend(true, {}, defaultValidateOptions, {
				errorPlacement: function(error, element) {
					 error.addClass("snote"); 
					 if (element.attr("name") == "mbrLoginPwd"  || element.attr("name") == "mbrLoginPwdValid"  ){
						 error.insertAfter("#mbrLoginPwdValid"); 
					 }else{
						 error.insertAfter(element); 
					 }
				},
				groups : {
					password : "mbrLoginPwd mbrLoginPwdValid"
				},
				rules: {
					mbrLoginPwd: {
						required: true,
						minlength : 8 , 
						passwordReg01 : true,
						passwordReg02 : true, 
						passwordReg03 : true,
						passwordReg04 : false,
						equalTo : "#mbrLoginPwdValid"
					},
					mbrLoginPwdValid : {
						required: true,
						minlength : 8 ,
						equalTo : "#mbrLoginPwd"
					}
					
				},
				messages:  {
					mbrLoginPwd: {
						required: "비밀번호를 입력해 주세요.",
						minlength : "최소 8자 이상 입력해 주세요.",
						passwordReg01 : "영문,숫자,특수문자 조합 8자 이상~ 15자 이내로 입력해 주세요.",
						passwordReg02 : "연속된 숫자, 문자(4개 이상)는 제한 합니다.", 
						passwordReg03 : `특수문자에 & , < , > , " , ' 는 사용할수 없습니다.`,
						passwordReg04 : "이메일과 다른 문자를 사용해주세요.",
						equalTo : "설정하신 비밀번호와 다릅니다."
					},
					mbrLoginPwdValid : {
						required: "비밀번호 재입력을 입력해 주세요.",
						minlength : "최소 8자 이상 입력해 주세요.",
						equalTo : "설정하신 비밀번호와 다릅니다."
					}
				},
				submitHandler: function(form) {
				}, 
				onfocusout: function(element) {
					this.element(element);
		            if(element.id === "mbrLoginPwd" && $("#mbrLoginPwdValid").val() === "" && $(element).val() !== "" &&  $(element).attr("class") !== "error"){
		            	$("#password-error").html("사용 가능한 비밀번호입니다. 설정하신 비밀번호를 한번 더 입력해주세요.").addClass("snote");
		            }
		        },
		        onkeyup : function(element) {
		        	if(element.id === "mbrLoginPwdValid" && $(element).val() === ""){
		        		return false;
		        	}
		        	this.element(element);
		        	
		        },
		        success : function(label){
		        }
			}));
			$changePwdForm.data("validate", validate);
		}
	});

	$.createNamespace(pns, "Page");
	pns.Page[ns] = new page();
})(window, document, jQuery, b2, "changePwd");