var createTip = function(ele) {
	var error = document.createElement("div");
	clearTip(ele);

	ele.parent().append(error);
	return error;
};
var clearTip = function(ele) {
	var arr = ele.parent().find(".error");
	for (var i = 0; i < arr.length; i++) {
		arr[i].parentNode.removeChild(arr[i]);
	}
};
var validateSettings = {
	onFocus: {
		state: null,
		container: "_error",
		style: "focus",
		run: function(option) {
			clearTip(option.element);
		}
	},
	isNull: {
		state: 0,
		container: "_error",
		style: "error",
		run: function(option, str) {
			if (str != undefined && str != null) {
				option.element.attr("sta", 0);
				var error = createTip(option.element);
				error.className = validateSettings.isNull.style;
				error.innerHTML = str;
			} else {
				option.element.attr("sta", 2);
			}
		}
	},
	error: {
		state: 1,
		container: "_error",
		style: "error",
		run: function(option, str) {
			option.element.attr("sta", 1);
			var error = createTip(option.element);
			error.className = validateSettings.error.style;
			error.innerHTML = str;
			//option.errorEle.empty();
		}
	},
	succeed: {
		state: 2,
		container: "_succeed",
		style: "succeed",
		run: function(option) {
			//console.log("succeed");
			option.element.attr("sta", 2);
			
		}
	}
};
var validateRules = {
	isNull: function(str) {
		return (str == "" || typeof str != "string");
	},
	isSfzh: function (cardNo) {
        
        var isTrue = false;
        if (!cardNo && 15 != cardNo.length && 18 != cardNo.length) {
            isTrue = false;
        }
        if (15 == cardNo.length) {
            var year = cardNo.substring(6, 8);
            var month = cardNo.substring(8, 10);
            var day = cardNo.substring(10, 12);
            var p = cardNo.substring(14, 15); //性别位
            var birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
            // 对于老身份证中的年龄则不需考虑千年虫问题而使用getYear()方法  
            if (birthday.getYear() != parseFloat(year) || birthday.getMonth() != parseFloat(month) - 1 || birthday.getDate() != parseFloat(day)) {
                isTrue = false;
            } else {
                isTrue = true;
            }
        }
        if (18 == cardNo.length) {
            var year = cardNo.substring(6, 10);
            var month = cardNo.substring(10, 12);
            var day = cardNo.substring(12, 14);
            var p = cardNo.substring(14, 17)
            var birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
            // 这里用getFullYear()获取年份，避免千年虫问题
            if (birthday.getFullYear() != parseFloat(year) || birthday.getMonth() != parseFloat(month) - 1 || birthday.getDate() != parseFloat(day)) {
                isTrue = false;
            }
            var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子  
            var Y = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X 
            // 验证校验位
            var sum = 0; // 声明加权求和变量
            var _cardNo = cardNo.split("");
            if (_cardNo[17].toLowerCase() == 'x') {
                _cardNo[17] = 10; // 将最后位为x的验证码替换为10方便后续操作 
            }
            for (var i = 0; i < 17; i++) {
                sum += Wi[i] * _cardNo[i]; // 加权求和 
            }
            var i = sum % 11; // 得到验证码所位置
            if (_cardNo[17] != Y[i]) {
                isTrue = false;
            } else
                isTrue = true;
        }
        return isTrue;
    },
	
	isMoney: function (str) {
        return new RegExp(/^0?(13|15|18|14|17)[0-9]{9}$/).test(str);
    },
	
};
var validatePrompt = {
	xx_name: {
		onFocus: "请输入姓名",
		succeed: "",
		isNull: "姓名不能为空!",
		error: "姓名过长",
		error2: "姓名不能包含特殊符号",
		class1: "grdd"
	},
	xx_sfzh: {
		onFocus: "请输入身份证号",
		succeed: "",
		isNull: "身份证号不能为空!",
		error: "身份证号不正确",
		class1: "grdd"
	},
	xx_tel:{
		onFocus: "请输入手机号码",
		succeed: "",
		isNull: "手机号码不能为空!",
		error: "手机号码不正确",
		class1: "grdd"
	},
	xx_telphone:{
		onFocus: "请输入联系电话",
		succeed: "",
		//isNull: "联系电话不能为空!",
		error: "联系电话不正确",
		error2:"联系电话过长",
		class1: "grdd"
	},
	xx_referralCode:{
		onFocus: "请输入推荐人手机号",
		succeed: "",
		//isNull: "推荐码不能为空!",
		error: "推荐人手机号不正确",
		error2: "手机号不能和报名人手机号一致",
		class1: "grdd"
	},
	xx_remarks:{
		onFocus: "请输入备注",
		succeed: "",
		//isNull: "",
		error: "备注内容过长",
		class1: "grdd"
	},
	xx_jgz: {
		onFocus: "请输入军官证",
		succeed: "",
		isNull: "军官证不能为空",
		error: "军官证过长",
		class1: "grdd"
	}
};
var validateFunction = {
	xxnameFunc: function(option) {
		var f = validateRules.isNull(option.value);
		if (f) {
			validateSettings.error.run(option, option.prompts.isNull);
			return;
		} else {
			var b = option.value.length > 10;
			if (b) {
				validateSettings.error.run(option, option.prompts.error);
				return;
			}
			var containSpecial = RegExp(/[(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
			if (containSpecial.test(option.value)) {
				validateSettings.error.run(option, option.prompts.error2);
				return;
			}
			validateSettings.succeed.run(option);
		}

	},
	xxSfzhFunc: function(option) {
		var f = validateRules.isNull(option.value);
		if (f) {
			validateSettings.error.run(option, option.prompts.isNull);
			return;
		} else {
			var ff = validateRules.isSfzh(option.value);
			if (!ff) {
				validateSettings.error.run(option, option.prompts.error);
				return;
			} else{
				validateSettings.succeed.run(option);
			}
		}

	},
	xxTelphoneFunc: function(option) {
		if (option.value.length>20) {
			validateSettings.error.run(option, option.prompts.error2);
			return;
		} else{
			validateSettings.succeed.run(option);
		}
	},
	xxTelFunc: function(option) {
		var f = validateRules.isNull(option.value);
		if (f) {
			validateSettings.error.run(option, option.prompts.isNull);
			return;
		} else {
			var ff = validateRules.isMoney(option.value);
			if (!ff) {
				validateSettings.error.run(option, option.prompts.error);
				return;
			} else{
				validateSettings.succeed.run(option);
			}
		}

	},
	xxReferralCodeFunc:function(option){
//		if (option.value.length>20) {
//			validateSettings.error.run(option, option.prompts.error2);
//			return;
//		} else{
//			validateSettings.succeed.run(option);
//		}
		var f = validateRules.isNull(option.value);
		if(f){
			validateSettings.succeed.run(option);
		}
		else{
			var b = validateRules.isMoney(option.value);
				if (!b) {
					validateSettings.error.run(option, option.prompts.error);
					return;
				} else{
					if($('#textTel').val().trim()==option.value.trim()){
					validateSettings.error.run(option, option.prompts.error2);
					}
					else{
						validateSettings.succeed.run(option);	
					}
				}
		}
	},
	xxRemarksFunc:function(option){
		if (option.value.length > 80) {
			validateSettings.error.run(option, option.prompts.error);
			return;
		} else{
			validateSettings.succeed.run(option);
		}
	},
	xxJgzFunc:function(option){
		var f = validateRules.isNull(option.value);
		if (f) {
			validateSettings.error.run(option, option.prompts.isNull);
			return;
		} 
		else {
			if (option.value.length > 30) {
				validateSettings.error.run(option, option.prompts.error);
				return;
			} else{
				validateSettings.succeed.run(option);
			}
		}
	},
	FORM_submit: function(elements) {
		var f = true;
		for (var i = 0; i < elements.length; i++) {
			if ($(elements[i]).attr("sta") == 2) {
				f = true;
			} else {
				f = false;
				break;
			}
		}

		return f;
	}
};;
(function($) {
	$.fn.xqValidate = function(option, callback, def, iscallback) {
		var ele = $(this);
		var type = ele.attr("type");
		if (def == true) {
			var str = ele.val();
			var tag = ele.attr("sta");
			if (iscallback) {
				callback({
					prompts: option,
					element: ele,
					value: str,
					errorEle: _error,
					succeedEle: _succeed
				});
			} else {
				if (str == "" || str == "-1") {
					validateSettings.isNull.run({
							prompts: option,
							element: ele
						},
						option.isNull);
				} else if (tag == 1 || tag == 2) {
					return;
				} else {
					callback({
						prompts: option,
						element: ele,
						value: str
					});
				}
			}
		} else {
			if (typeof def == "string") {
				ele.val(def);
			}
			if (type == "checkbox" || type == "radio") {
				if (ele.attr("checked") == true) {
					ele.attr("sta", validateSettings.succeed.state);
				}
			}
			switch (type) {
				case "number":
				case "text":
				case "password":
					ele.unbind("focus").bind("focus",
						function() {
							var str = ele.val();
							validateSettings.onFocus.run({
								prompts: option,
								element: ele,
								value: str
							});
						}).unbind("blur").bind("blur",
						function() {
							var str = ele.val();
							callback({
								prompts: option,
								element: ele,
								value: str
							});

						});
					break;
			}
		}
	}
})(Zepto);