define([], function () {
    //区分客户端系统
    var ClientType = '';
    var identifyingStr = navigator.userAgent.toLowerCase()
    if (identifyingStr.indexOf('ios_xuechebu') != -1) {
        ClientType = 'ios';
    }
    else if (identifyingStr.indexOf('android_xuechebu') != -1) {
        ClientType = 'android';
    }
    else {
        ClientType = '';
    }

    var getJSONPCache = function (url, data, callback, errorcallback) {
        data = $.extend({"ISJSONP": "true", "os": ClientType}, data);  //"os": "appweb"
        url = url + "?callback=?";
        $.ajaxJSONP({
            url: url,
            data: data,
            //jsonpCallback: "asd(data)",
            success: callback,
            error: function (xhr, type) {
                errorcallback != undefined ? errorcallback() : "";
            }
        });
    };
    var getJSONCache = function (url, data, callback) {
        $.ajax({
            url: url,
            dataType: 'json',
            type: "get",
            data: data,
            success: callback
        });
    };

    function Check() {
        this.result = function (data, callback, failedcallback) {
            if (!data) {
                return;
            }
            if (data.code == undefined)
                data = eval("(" + data + ")");
            if (data.code == 0) {
                return callback(data);
            }
            else if (data.code == 101) {
                // window.open('login.html', '_self'); //您未经授权访问

            }
            else if (data.code == 102) {
                //window.open('login.html', '_self'); //您没有登录

            }
            else if (data.code == 103) {
                // window.open('login.html', '_self'); //您没有相关功能权限

            }
            else {
                var msg = (data.message && data.message.length) ? data.message : '发生未知错误！';
                //alert(msg);
                alert(msg)
                // alert(msg);
                if (failedcallback) {
                    failedcallback(data);
                }
                return false;
            }
        };
    };
    //获取url中的参数 没有则返回空
    function GetUrlRequest() {

        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        } else {
            return null;
        }
        return theRequest;
    }

    //字符串  扩展
    String.prototype.format = function (args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if (args[key] != undefined) {
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                    　　　　　　　　　　　　var reg = new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    }
    String.prototype.convert = function (result, callback) {
        if (result == null || result == undefined || result == "1901-01-01" || result == "0001-01-01") {
            return callback == undefined ? "" : callback;
        }
        else {
            return result;
        }
        return result;
    }


    function createClose(content, btnTitle, width, height, func) {
        $('.mask').remove();
        var mask = document.createElement("div"), body = document.getElementById("body"), prompt = document.createElement("div"), determine = document.createElement("div"), innertext = document.createElement("p");
        mask.className = "mask";
        mask.style.width = width;
        mask.style.height = height;
        mask.style.top = document.body.scrollTop + "px";
        prompt.className = "prompt";
        mask.appendChild(prompt);
        body.appendChild(mask);
        innertext.innerHTML = content;
        prompt.appendChild(innertext);
        determine.className = "determine";
        determine.innerHTML = btnTitle;

        if (btnTitle == "") {
            determine.style.background = '#FAFAFA';
        }

        prompt.appendChild(determine);

        determine.onclick = function () {
            if (func == null) {
                $('.mask').remove();
            }
            else {
                func();
            }
        };

    }

    function createConfirm(content, width, height, okFunc, cancelFunc) {
        $('.mask').remove();
        var mask = document.createElement("div"), body = document.getElementById("body"), prompt = document.createElement("div"), determine = document.createElement("div"), innertext = document.createElement("p");
        mask.className = "mask";
        mask.style.width = width;
        mask.style.height = height;
        mask.style.top = document.body.scrollTop + "px";
        prompt.className = "prompt";
        mask.appendChild(prompt);
        body.appendChild(mask);
        innertext.innerHTML = content;
        prompt.appendChild(innertext);
        determine.className = "determine";
        determine.innerHTML = "下载";
        prompt.appendChild(determine);

        var d = $('.determine')[0];
        d.parentNode.firstChild.style.padding = "0 1rem";
        var cancel = document.createElement("div"), Determine = document.createElement("div"), Img = document.createElement("img");
        d.appendChild(cancel);
        d.appendChild(Determine);
        Img.src = "images/01.png";
        prompt.appendChild(Img);
        cancel.innerHTML = "返回";
        cancel.className = "cancel";
        Determine.innerHTML = "确认";
        Determine.className = "Determine";
        with (Img.style) {
            width = "165px";
            height = "156px";
            position = "absolute";
            top = "-156px";
            left = "2rem";
        }
        with (d.style) {
            width = "80%";
            position = "relative";
            cursor = "auto";
            background = "none";
        }
        cancel.onclick = function () {
            if (cancelFunc == null) {
                mask.style.display = "none";
            }
            else {
                cancelFunc();
            }

        }
        Determine.onclick = function () {
            if (okFunc == null) {
                mask.style.display = "none";
            }
            else {
                okFunc();
            }
        }
    }

    function createAlert(data) {
    	$('.mask').remove();
    	
        data.oBottom = data.oBottom || -30 + "%";
        var oMask = document.createElement("div"),
            oBody = document.getElementsByTagName("body")[0],
            alert = document.createElement("div"),
            options = document.createElement("div"),
            op = document.createElement("p"),
            oReturn = document.createElement("div"),
            queding = document.createElement("div");
        if (data.oReturn == null || data.oReturn == undefined) {
            queding.style.width = "100%";
            oReturn.style.display = "none";
        }
        oMask.className = "mask";
        alert.className = "alert";
        alert.style.bottom=data.oBottom;
        options.className = "options";
        oReturn.innerHTML = data.oReturn;
        oReturn.className = "return";
        queding.innerHTML = "确定";
        queding.className = "queding";
        op.innerHTML = data.content;
        options.appendChild(op);
        options.appendChild(queding);
        options.appendChild(oReturn);
        alert.appendChild(options);
        oMask.appendChild(alert);
        oBody.appendChild(oMask);
        
        window.addEventListener('scroll',function(){
        	oMask.style.top = document.body.scrollTop + "px";
        })
        
        return obj = {
            oReturn: oReturn,
            queding: queding
        }
        
        

    }

    //返回上一页 如果上一页不存在，则返回指定页面 
    function goBack(backUrl) {
        if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
            if (history.length > 0) {
                window.history.go(-1);
            } else {
                window.location = backUrl;
            }
        } else {
            if (navigator.userAgent.indexOf('Firefox') >= 0 ||
                navigator.userAgent.indexOf('Opera') >= 0 ||
                navigator.userAgent.indexOf('Safari') >= 0 ||
                navigator.userAgent.indexOf('Chrome') >= 0 ||
                navigator.userAgent.indexOf('WebKit') >= 0) {

                if (window.history.length > 1) {
                    window.history.go(-1);
                } else {
                    window.location = backUrl;
                }
            } else {
                window.history.go(-1);
            }
        }
    }

    var GetUrlRequest = function () {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        } else {
            return null;
        }
        return theRequest;
    }

    var formatSeconds = function (value) {
        var theTime = parseInt(value);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }
        var result = "" + parseInt(theTime) + "秒";
        if (theTime1 > 0) {
            result = "" + parseInt(theTime1) + "分" + result;
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + "小时" + result;
        }
        return result;
    }

//var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";  
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1); 
	var base64decode = function(str){
		var c1, c2, c3, c4;  
	    var i, len, out;  
	    len = str.length;  
	    i = 0;  
	    out = "";  
	    while (i < len) {  
	        /* c1 */  
	        do {  
	            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
	        }  
	        while (i < len && c1 == -1);  
	        if (c1 == -1)   
	            break;  
	        /* c2 */  
	        do {  
	            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
	        }  
	        while (i < len && c2 == -1);  
	        if (c2 == -1)   
	            break;  
	        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));  
	        /* c3 */  
	        do {  
	            c3 = str.charCodeAt(i++) & 0xff;  
	            if (c3 == 61)   
	                return out;  
	            c3 = base64DecodeChars[c3];  
	        }  
	        while (i < len && c3 == -1);  
	        if (c3 == -1)   
	            break;  
	        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));  
	        /* c4 */  
	        do {  
	            c4 = str.charCodeAt(i++) & 0xff;  
	            if (c4 == 61)   
	                return out;  
	            c4 = base64DecodeChars[c4];  
	        }  
	        while (i < len && c4 == -1);  
	        if (c4 == -1)   
	            break;  
	        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);  
	    }  
	    return out;  
	}

    return {
        getJSONPCache: function (url, data, callback) {
            getJSONPCache(url, data, callback)
        },
        getJSONCache: function (url, data, callback) {
            getJSONCache(url, data, callback)
        },
        result: function (data, callback, failedcallback) {
            (new Check()).result(data, callback, failedcallback);
        },
        getUrlRequest: function () {
            return GetUrlRequest();
        },
        createAlert: function (content, width, height) {
            return createAlert(content, width, height);
        },
        createClose: createClose,
        goBack: goBack,
        createConfirm: createConfirm,
        GetUrlRequest: GetUrlRequest,
        formatSeconds: formatSeconds,
        base64decode:base64decode
    };
});
