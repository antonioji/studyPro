/**
 * memberRegistForm javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var page = pns.PageClass.extend({
		init: function(options) {
			var that = this;

			that._options = {
				title: "간편 가입 계정 생성 화면",
				request: {
					sendEmailCertification : {
						url : env.serverContext + "regist/sendEmailCertification",
						method: "GET",
						async: true,
						reqData: {
							custNm:$("#custNm").val(),
							custEmailAddr: $("#custEmailAddr").val(),
							mbrLoginPwd : $("#mbrLoginPwd").val(),
							mccNoCd  : $("#mccNoCd").val(),
							custCellTxNo : $("#cellPhone").val(),//cellPhone의 앞 3~4자리
							custCellSprtlyNo : $("#cellPhone").val(),//cellPhone의 뒤 4자리
							siteAgreeYn : $("#siteAgreeYn").val(), //checkbox의 값
							piAgreeEstlYn : $("#piAgreeEstlYn").val(),//checkbox의 값
							piAgreeYn : $("#piAgreeYn").val(),//checkbox의 값
							emailAgreeYn :  $("#emailAgreeYn").val(),//checkbox의 값
							smsAgreeYn :  $("#smsAgreeYn").val(),//checkbox의 값
							birth : $("#bdYear").val()+$("#bdMonth").val()+$("#bdDate").val(),
							gender : $("[name=gender]:checked").val()//radio 선택
						}
						
					}
				}
			};
			that._super(that._options);
		},

		initEventListener: function() {//초기 이벤트 설정
			var that = this;
			that._super();
			
		    var UserCustomerList = $("div.n_provision");

		    UserCustomerList.find("dl > dt").click(function(){
		        var ThisView = $(this).parent();
		        if(ThisView.hasClass("on")){
		            ThisView.removeClass("on");
		        } else {
		            ThisView.addClass("on").siblings().removeClass("on");
		        }
		        return false;
		    })
		    
		    $("#btnAllprovision").click(function(){//이용약관 전체보기
		    	var This = $(this);
		        if(This.hasClass("off")){
		            This.removeClass("off");
		            $("div.n_provision").find("dl").addClass("on");
		        } else {
		            This.addClass("off");
		            $("div.n_provision").find("dl").removeClass("on");
		        }
		        return false;
		    });
		    
		    
		    $("#registForm").submit(function(){
		    	if( $("#registForm").valid()){
			    	var cellPhone = $("#cellPhone").val();
			    	var custCellSprtlyNo = cellPhone.substring((cellPhone.length - 4),cellPhone.length);
			    	var custCellTxNo = cellPhone.substring(0,(cellPhone.length - 4));
			    	var siteAgreeYn = "N";
			    	var piAgreeEstlYn = "N";
			    	var piAgreeYn = "N";
			    	var emailAgreeYn = "N";
			    	var smsAgreeYn = "N";
			    	if($("#siteAgreeYn").is(":checked")){
			    		siteAgreeYn = "Y";
			    	}
			    	if($("#piAgreeEstlYn").is(":checked")){
			    		piAgreeEstlYn = "Y";
			    	}
			    	if($("#piAgreeYn").is(":checked")){
			    		piAgreeYn = "Y";
			    	}
			    	if($("#emailAgreeYn").is(":checked")){
			    		emailAgreeYn = "Y";
			    	}
			    	if($("#smsAgreeYn").is(":checked")){
			    		smsAgreeYn = "Y";
			    	}
			    	
			    	that.requestDataSettings("sendEmailCertification", {
			    		custNm:$("#custNm").val(),
						custEmailAddr: $("#custEmailAddr").val(),
						mbrLoginPwd : $("#mbrLoginPwd").val(),
						mccNoCd  : $("#mccNoCd").val(),
						custCellTxNo : custCellTxNo,//cellPhone의 앞 3~4자리
						custCellSprtlyNo : custCellSprtlyNo,//cellPhone의 뒤 4자리
						siteAgreeYn : siteAgreeYn, //checkbox의 값
						piAgreeEstlYn : piAgreeEstlYn,//checkbox의 값
						piAgreeYn : piAgreeYn,//checkbox의 값
						emailAgreeYn :  emailAgreeYn,//checkbox의 값
						smsAgreeYn :  smsAgreeYn,//checkbox의 값
						birth : $("#bdYear").val()+$("#bdMonth").val()+$("#bdDate").val(),
						gender : $("[name=gender]:checked").val()//radio 선택
					});
					that.sendRequest("sendEmailCertification");
		    	}
		    	return false;
		    });
			
		},

		pageBeforeShow: function() {
			var that = this;
			that._super();
			that.initValidate();
			$(".numeric").numeric();   //이렇게 하면 영문은 입력안되고 숫자만 입력된다(단, 한글도 입력된다는거)
	        $(".numeric").css("ime-mode", "disabled");  //요렇게 하면 한글도 잡아준다


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
			if(reqID === "sendEmailCertification") {
				console.log(response);
				window.location.href =  env.serverContext + "regist/resultSendEmail";//다음화면이동
			}
			
		}
		
		,initValidate: function() {
			var that = this,
				$registForm = $("form[name=registForm]"),
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

			$.validator.addMethod("custNmReg", function(value) {
				var hangleEx =/^[가-힣\s]/;
			   return hangleEx.test(value) ;
			});
			
			$.validator.addMethod("spaceCheck", function (value, element) {
				return $(element).val().indexOf(" ") == -1 ? true : false;
		  	});
			
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

			validate = $registForm.validate($.extend(true, {}, defaultValidateOptions, {
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
					custNm: {
						required: true,
						minlength : 2,
						custNmReg : true,
						spaceCheck : true
					},
					custEmailAddr: {
						required: true,
						email: true,
						validateEmail: true,
						remote: {//email중복체크
							url: env.serverContext + "regist/checkDupl",
							type: "GET",
							dataType: 'json',
							cache: false,
							data: {
								custEmailAddr: function() {
									return $("form[name=registForm] #custEmailAddr").val();
								},
								_csrf: function() {
									return  $("meta[name='_csrf']").attr("content");
								}
							},
							dataFilter: function(response) {
								if(!response) {
									return false;
								}
								response = JSON.parse(response);
								if(response.successYn === "Y") {
									if(response.result ==="Y"){
										return false;//중복 있음
									}else{
										return true;//중복 없음
									}
								} else {
										return false; //server error
								}
								return false;
							},
							complete: function(response) {
								//
							}
						}
					},
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
						minlength : 8 
					},
					cellPhone : {
						required: true,
						minlength : 7 ,
						number : true
					},
					isYouth : {
						required: true
						
					},
					siteAgreeYn : {
						required: true
						
					},
					piAgreeEstlYn : {
						required: true
						
					}
					
				},
				messages:  {
					custNm: {
						required: "이름을 입력해 주세요.",
						minlength : "두자 이상 입력해 주세요.",
						custNmReg : "한글만 입력 가능합니다.",
						spaceCheck : "공백은 입력할 수 없습니다."
						
					},
					custEmailAddr: {
						required: "이메일을 입력해 주세요.",
						email: "유효하지 않은 E-Mail주소입니다.",
						validateEmail: "유효하지 않은 E-Mail주소입니다.",
						remote: "이미 사용중인 아이디입니다."
					},
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
						minlength : "최소 8자 이상 입력해 주세요."
					},
					cellPhone : {
						required: "휴대폰번호를 입력해주세요.",
						minlength : "최소 7자 이상 입력해주세요." ,
						number : "숫자만 입력 가능합니다."
					},
					isYouth : {
						required: "만 14세 이상 확인은 필수 항목입니다."
						
					},
					siteAgreeYn : {
						required: "이용약관은 필수 항목입니다."
						
					},
					piAgreeEstlYn : {
						required: "개인정보 수집및 이용에 대한 동의(필수)는 필수 항목입니다."
						
					}
				},
				submitHandler: function(form) {
				}, 
				onfocusout: function(element) {
					this.element(element);
		            if(element.id === "mbrLoginPwd" && $("#mbrLoginPwdValid").val() === "" && $(element).val() !== ""){
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
		        	if(label.prev()[0] == null) return;
		        	var elementLabelID = label.prev()[0].id;
		        	var elementID = elementLabelID.replace("-error","");
		        	var element = '#' + elementID;
		            if (elementID== "custEmailAddr") { 
		                label.html("사용 가능한 아이디입니다.").addClass("snote");
		                $(element).addClass('valid');
		            }else if( elementID== "mbrLoginPwdValid"){
		            	 $("#mbrLoginPwd").addClass('valid');
		            	 $("#mbrLoginPwd").removeClass('error');
		            }
		        }
			}));
			$registForm.data("validate", validate);
		}
	});

	$.createNamespace(pns, "Page");
	pns.Page[ns] = new page();
})(window, document, jQuery, b2, "memberRegistForm");