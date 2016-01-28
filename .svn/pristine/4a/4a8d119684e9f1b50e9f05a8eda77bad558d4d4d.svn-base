
define([],function(){
	//区分客户端系统
	var ClientType='';
	var identifyingStr = navigator.userAgent.toLowerCase()
	if (identifyingStr.indexOf('ios_xuechebu') != -1) {
		ClientType = 'ios';
	} 
	else if(identifyingStr.indexOf('android_xuechebu') != -1){
		ClientType = 'an';
	}
	else{
		ClientType = '';
	}
	
	var getJSONPCache = function (url, data, callback) {
        data = $.extend({ "ISJSONP": "true", "os": ClientType }, data);  //"os": "appweb" 
        url = url + "?callback=?";
        $.ajaxJSONP({
            url: url,
            data: data,
            //jsonpCallback: "asd(data)",
            success: callback,
            error:function(xhr,type){
            	
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
    	this.result = function (data,callback, failedcallback) {
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
    String.prototype.format = function(args) {
        var result = this;
        if (arguments.length > 0) {    
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if(args[key]!=undefined){
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
    　　　　　　　　　　　　var reg= new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    }
    String.prototype.convert = function(result,callback) {
        if (result == null || result == undefined || result == "1901-01-01" || result == "0001-01-01") {
            return callback ==undefined? "" : callback;
        }
        else {
            return result;
        }
        return result;
    }
    function createClose(content,width,height){
        var mask=document.createElement("div"),body=document.getElementById("body"),close=document.createElement("div");
        mask.className="mask";
        mask.innerHTML=content;
        mask.style.width=width;
        mask.style.height=height;
        mask.style.top = document.body.scrollTop+"px";
        close.className="close";
        close.innerHTML="x";
        mask.appendChild(close);
        body.appendChild(mask);
        $(".close").on("touchstart",function(){
            this.parentNode.style.display="none";
        });
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
    
    
	return  {
		getJSONPCache:function(url,data,callback){
			getJSONPCache(url,data,callback)
		},
		getJSONCache:function(url, data, callback){
			getJSONCache(url, data, callback)
		},
		result:function(data,callback, failedcallback){
			(new Check()).result(data,callback, failedcallback);
		},
        getUrlRequest:function(){
            return GetUrlRequest();
        },
        createClose: function (content,width,height) {
            createClose(content,width,height);
        },
        goBack:goBack
	};
});
