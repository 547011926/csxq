 define(["core"],function(core){
 	function getCookie(Name) {
        var search = Name + "=";
        if (document.cookie.length > 0) { // if there are any cookies
            offset = document.cookie.indexOf(search);
            if (offset != -1) { // if cookie exists
                offset += search.length;
                end = document.cookie.indexOf(";", offset);
                if (end == -1)
                    end = document.cookie.length;

                return unescape(document.cookie.substring(offset, end));
            }
        }
        return null;

    }
    function getCookieByUrlDecode(Name) {
        var search = Name + "=";
        if (document.cookie.length > 0) { // if there are any cookies
            offset = document.cookie.indexOf(search);
            if (offset != -1) { // if cookie exists
                offset += search.length;
                end = document.cookie.indexOf(";", offset);
                if (end == -1)
                    end = document.cookie.length;

                return decodeURIComponent(document.cookie.substring(offset, end)); //对应encodeURIComponent或asp.net HttpUtility.UrlEncode加密的解密            
            }
        }
        return null;
    }
	var checklogin = function () {
        if (getCookie("Webapi_LoginOn") == null
            || getCookie("Webapi_LoginOn_client") == null) {
            return false;
        }else{
            return true;
        }
    };
    var getuserinfo= function () {
        //不能使用
        var qs = core.getUrlRequest();
        var list = "";
        if (!checklogin()) {
        		alert("没有登录");            
            return false;
        } else {
            var data = getCookieByUrlDecode("Webapi_LoginOn_client");
            if (data == null || data == undefined) {
                alert("没有登录"); 
                return false;
            }
            list = eval("(" + data + ")");
            return list;
        }
    };
	var sign = function(username,password){
        alert("用户名："+username+",密码："+password);
        alert("已成功调用sign方法");
        var url = "http://jptest2.xuechebu.com/User/Login?callback=?";
        core.getJSONCache(url, {username:username,password:password}, function (data) {
            //alert(getCookie("Webapi_LoginOn_client"));
        });
        return true;
	};
	var signout= function(){	
	};
	return {
		getCookie : function(name){
			return getCookie(name);
		},
		getCookieByUrlDecode : function(name){
			return getCookieByUrlDecode(name)
		},
		checklogin:function(){
			return checklogin();
		},
		getuserinfo:function(){
			return getuserinfo();
		}
	};
 });
    
