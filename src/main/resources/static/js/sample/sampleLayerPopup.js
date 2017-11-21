/**
 * Account Managetment - linked account regist Layer Popup javascript
 */
(function(w, d, $, pns, ns) {
"use strict";

	var layerPopup = pns.LayerPopupClass.extend({
		init: function(options) {
			var that = this;
			that._super(options);

			that._settings = {
				//title: "Account Managetment - linked account regist",
				request: {
					registLinkedAccount: {
						url: CONSTANTS.baseUrl + "api/me/myaccount/sendAuthEmailForAccountLinking",
						method: "POST",
						async: true,
						reqData: {
							emailAddress: ""
						}
					}
				}
			};
		},

		initEventListener: function() {
			var that = this;
			that._super();

			that.$container.on("click" + that.eventID, ".js_btnCancel", function() {
				that.closeLayer();
			});
		},

		layerShow: function(pageData) {
			var that = this;
			that._super();

			that.initValidate();
		},

		closeLayer: function(isNotBack) {
			var that = this;

			that.$container.find("#linkedAddAccountForm").data("validate").resetForm();

			
			
			
			
			that._super(isNotBack);
		},

		initValidate: function() {
			var that = this,
				$form = $("#linkedAddAccountForm"),
				validate;

			var defaultValidateOptions = {
				debug: true,
				onkeyup: false,
				onfocusout: false,
				errorClass: "error",
				errorElement: "p",
				errorPlacement: function(error, element) {
					error.addClass("snote");
					error.insertAfter(element);
				},
				submitHandler: function(form) {
					pns.common.Util.dimmed.show();
					form.submit();
				}
			};

			validate = $form.validate($.extend(true, {}, defaultValidateOptions, {
				rules: {
					emailAddress: {
						required: true,
						email: true,
						validateEmail: true,
						remote: {
							url: CONSTANTS.baseUrl + "api/me/myaccount/checkLinkedAccount",
							type: "get",
							dataType: 'json',
							cache: false,
							data: {
								emailAddress: function() {
									return $("#linkedAddAccountForm #emailAddress").val();
								}
							},
							dataFilter: function(response) {
								if(!response) {
									return false;
								}
								response = JSON.parse(response);

								if(response.code === 200) {
									// 異붽� 媛���.
									return true;
								} else if(response.code === 300) {
									// �대� 異붽��섏뼱 �덉쓬.
									return false;
								} else if(response.code === 400) {
									// �대떦 �대찓�� 怨꾩젙 �ъ슜�먭� �놁쓬.
									return false;
								} else if(response.code === 500) {
									// 蹂몄씤怨꾩젙�� 異붽� �� �� �놁쓬.
									return false;
								}
								return false;
							},
							complete: function(response) {
								//
							}
						}
					}
				},
				messages:  {
					emailAddress: {
						required: MESSAGES.format("me.js.mypage.accountmanagement.validation.email"),
						email: MESSAGES.format("me.js.mypage.accountmanagement.validation.remote.email"),
						remote: MESSAGES.format("me.js.mypage.accountmanagement.validation.remote.email"),
						validateEmail: MESSAGES.format("me.js.mypage.accountmanagement.validation.remote.email")
					}
				},
				submitHandler: function(form) {
					var emailAddress = $(form).find("#emailAddress").val();

					that.requestDataSettings("registLinkedAccount", {
						emailAddress: emailAddress
					});
					that.sendRequest("registLinkedAccount", function(response) {
						if(response.code === 200) {
							that.closeLayer();
							setTimeout(function() {
								that.parent.linkedAccountAddResultLayerPopup.openLayer({
									parent: that,
									param: $.param({
										uiType: "success",
										emailAddress: response.data.emailAddress
									})
								});
							}, 300);
						} else if(response.code === 300) {
							that.parent.linkedAccountAddResultLayerPopup.openLayer({
								parent: that,
								param: $.param({
									uiType: "fail",
									emailAddress: $("#linkedAddAccountForm #emailAddress").val()
								})
							});
						} else {
							w.alert("linked account add fail!!!");
						}

					});

					return false;
				}
			}));
			$form.data("validate", validate);
		}
	});

	$.createNamespace(pns, "LayerPopup");
	pns.LayerPopup[ns] = new layerPopup({
		layerName: ns,
        layerSelector: "#layerpopup_sampleLayerPopup", // layerPopup
        layerUrl: CONSTANTS.baseUrl + "me/layerpopup/accountManagement.linkedAccountAddLayerPopup.do", //濡쒕뱶 �� layerPopup 二쇱냼
        uiSelector: ".layerpopup_ui", // html 濡쒕뱶 �� 媛��� �� �곸뿭 container
        addContainer: "body", // layerPopup�� append �� container
	});
})(window, document, jQuery, b2, "sampleLayerPopup");