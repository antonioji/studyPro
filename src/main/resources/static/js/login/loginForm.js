/**
 * loginForm javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var page = pns.PageClass.extend({
		init: function(options) {
			var that = this;
			that._options = {
				title: "로그인 화면",
				request: {

				}
			};

			that._super(that._options);


		},

		initEventListener: function() {//초기 이벤트 설정
			var that = this;
			that._super();

			$(".menu a").on("click", function() {
				var tabId = $(this).attr("href").replace("#", "");
				$(this).parent().addClass("on").siblings("li").removeClass("on");
				if(tabId === "tab1"){
					$("#tab1").show();
					$("#tab2").hide();
					$("#chooseMemberTypeUl").show();
				}else{
					$("#tab1").hide();
					$("#tab2").show();
					$("#chooseMemberTypeUl").hide();
				}
			});

			$("[name=memLogin]").on("click" , function(){
				var that = $(this);
				if(that.val() === "Lpoint"){//lpoint
					$("#memberTypeText").html("L.POINT 통합 회원은 한 아이디로 롯데 전 계열사를 이용 가능합니다.");
					$("#mbrLoginId").attr("placeholder" , "아이디 또는 이메일 아이디");
					$("#mbrLoginId").attr("title" , "아이디 또는 이메일 아이디");
					$("#Lbsave").html("아이디 저장");
					$("#getId").html("아이디 찾기");
					$("#registMember").html("회원가입");
					$("#otherLoginIl").show();

				}else{//간편 가입
					$("#memberTypeText").html("간편가입 계정은 롯데닷컴, 엘 롯데 등 일부 사이트만 이용 할 수 있습니다.");
					$("#mbrLoginId").attr("placeholder" , "이메일 아이디");
					$("#mbrLoginId").attr("title" , "이메일 아이디");
					$("#Lbsave").html("계정 저장");
					$("#getId").html("계정 찾기");
					$("#registMember").html("계정 생성");
					$("#otherLoginIl").hide();
				}
			});

			$(".btn_login").on("click", function(){
				var that = this,
					$loginForm = $("#loginForm"),
					$mbrLoginIdSave = $loginForm.find("#mbrLoginIdSave").prop("checked"),
					$mbrLoginId = $loginForm.find("#mbrLoginId");
				if($mbrLoginIdSave) {
					w.localStorage.setItem("mbrLoginIdSave", $mbrLoginId.val());
				}
				$("#loginForm").submit();

				return false;
			});

		},

		getMbrLoginId : function() {
			var that = this,
				$loginForm = $("#loginForm"),
				$mbrLoginIdSave = $loginForm.find("#mbrLoginIdSave"),
				$mbrLoginId = $loginForm.find("#mbrLoginId"),
				mbrLoginIdSaveValue = w.localStorage.getItem("mbrLoginIdSave");

			$mbrLoginId.val(mbrLoginIdSaveValue || "");
			$mbrLoginIdSave.prop("checked", !!mbrLoginIdSaveValue);
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

			that.getMbrLoginId();
		},
		requestSUCCESS: function(reqID, response) {
			var that = this;
		},
		
		initValidate: function() {
			var that = this,
			$loginForm = $("#loginForm"),
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


		validate = $loginForm.validate($.extend(true, {}, defaultValidateOptions, {
			errorPlacement: function(error, element) {
				error.addClass("snote");
				error.insertAfter(element);
			},
			rules: {
				mbrLoginId: {
					required: true,
					email: true,
					validateEmail: true,
					
				},
				mbrLoginPwd: {
					required: true

				}
			},
			messages:  {
				
				mbrLoginId: {
					required: "이메일을 입력해 주세요.",
					email: "유효하지 않은 E-Mail주소입니다.",
					validateEmail: "유효하지 않은 E-Mail주소입니다."
				},
				mbrLoginPwd: {
					required: "비밀번호를 입력해 주세요.",
				}
			},
			submitHandler: function(form) {
				form.submit();
			}, 
			onfocusout: function(element) {
	            this.element(element);
	        }
		}));
		$loginForm.data("validate", validate);
	}
	});

	$.createNamespace(pns, "Page");
	pns.Page[ns] = new page();
})(window, document, jQuery, b2, "login");